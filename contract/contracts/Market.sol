// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract Market is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private itemCounter;
    CountersUpgradeable.Counter private traceBuyerCounter;

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
    
    address payable private _ownerAccount;
    
    uint public mmvalue;

    uint private _feePercent;
    
    uint private _refreshBidTime;
    
    uint private _expireBidTime;

     /** Struct */
        struct Items{
            uint itemId;
            uint tokenId;
            uint price;
            uint expire_at;
            uint currentBidPrice;
            uint bidderValue;
            uint created_at;
            address payable seller;
            address payable bidder;
            bool isSold;
            bool isActive;
            bool auctionStart;
            bool isBlock;
            IERC1155Upgradeable nft;
        }

        struct TraceBuyers{
            uint itemId;
            uint created_at;
            address seller;
            bool isOriginalSeller;
        }

        struct Bidders{
            uint itemId;
            uint bidPrice;
            uint created_at;
            address bidder;
        }

        Bidders[] private bidders;
        mapping(uint => TraceBuyers) private traceBuyers;
        mapping(uint => Items) private items;
    /** End struct */

    // Events
        event listItemToMarketEvent(uint indexed itemId, uint tokenId, uint created_at, address indexed seller, IERC1155Upgradeable indexed nft);
       
        event updateListNftEvent(uint indexed itemId, uint tokenId, address indexed seller, IERC1155Upgradeable indexed nft);

        event setTokenIdEvent(uint tokenId);

        event updateItemEvent(uint indexed itemId, uint tokenId, uint price, address indexed seller, IERC1155Upgradeable indexed nft);

        event deleteItemEvent(uint indexed itemId, uint tokenId, address indexed seller, IERC1155Upgradeable indexed nft);

        event payTobidderEvent(uint indexed itemId, uint indexed tokenId, address prevSeller, address seller, uint price, IERC1155Upgradeable indexed nft);

        event blockNftEvent(uint itemId, uint tokenId);

        event auctionEvent(
            address bidder, 
            address prevBidder, 
            uint currentBidPrice, 
            uint prevCurrentBidPrice,
            uint bidderValue,
            uint prevBidderValue,
            uint expire_at,
            IERC1155Upgradeable indexed nft
        );

        event transactionEvent(address addr, uint amount);
    // End Events

    // Modifier
        modifier validateMarketItem(uint _itemId, uint _price){
            uint value = msg.value;
            Items memory item = items[_itemId];
            require(_itemId > 0 && _itemId <= itemCounter.current(), "Market: ItemId does not exist");
            require(_price > 0, "Market: The price must be greater than zero");
            require(item.isBlock == false, "Market: This item is blocked");
            _;
        }

    // End modifier

    function initialize(uint initialFeePercent, uint initialExpireBidTime, uint initialRefreshBidTime) initializer public {
        __Ownable_init();
        _feePercent = initialFeePercent;
        _expireBidTime = initialExpireBidTime;
        _refreshBidTime = initialRefreshBidTime;
        _ownerAccount = payable(msg.sender);
    }

    function getFeepercent() public view onlyOwner returns (uint){
        return _feePercent;
    }


    function getRefreshBidTime() public view onlyOwner returns (uint){
        return _refreshBidTime;
    }

    function getExpireBidTime() public view onlyOwner returns (uint){
        return _expireBidTime;
    }

    function getOwnerAccount() public view onlyOwner returns (address){
        return _ownerAccount;
    }
  
    function getItem(uint _itemId) public view returns (Items memory){
        Items memory item = items[_itemId];
        return item;
    }

    function getItemByAddress(address addr) public view onlyOwner returns (Items[] memory){
        uint currentItemCount = itemCounter.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < currentItemCount; i++) {
            if (items[i + 1].seller == addr) {
                itemCount += 1;
            }
        }

        Items[] memory _items = new Items[](itemCount);
        for (uint i = 0; i < currentItemCount; i++) {
            if (items[i + 1].seller == addr) {
                _items[currentIndex] = items[i+1];
                currentIndex += 1;
            }
        }
        return _items;

    }

    function getAllItems() public view onlyOwner returns (Items[] memory){
        uint currentItem = itemCounter.current();
        Items[] memory _items = new Items[](currentItem);
        for(uint i = 0; i < currentItem; i++){
            _items[i] = items[i+1];
        }
        return _items;
    }

    function getBalance(address _addr) external view onlyOwner returns(uint){
        return _addr.balance;
    }

    function getTotalPrice(uint amount) public view returns(uint){
        return amount - ((amount / 1000) * _feePercent );
    }
    

    // List the item in the market

    function listItemToMarket(IERC1155Upgradeable nft, uint _tokenId, uint _price) external payable nonReentrant{
        require(_tokenId > 0, "Market: Token ID must be greater than zero");
        require(_price > 0, "Market: The price must be greater than zero");
        require((nft.balanceOf(msg.sender, _tokenId) == 1), "Market: This tokenId does not belong to this address or does not exist");
        
        itemCounter.increment();
        uint currentItem = itemCounter.current();
        uint created_at = block.timestamp;
        items[currentItem] = Items(
            currentItem, // ItemId
            _tokenId, // tokenId
            _price, // price
            0, // expire_at
            0, // currentBidPrice
            0, //bidderValue
            created_at, // created_at
            payable(msg.sender), // seller
            payable(address(0)), // bidder
            false, // isSold
            true, // isActive
            false, // auctionStart
            false, // isBlock
            nft // IERC1155Upgradeable nft
        );
        
        emit listItemToMarketEvent(currentItem, _tokenId, created_at, msg.sender, nft);
        nft.safeTransferFrom(msg.sender, _ownerAccount, _tokenId, 1, "");
    } 

    // Price update and transfer of NFT to the market
    function updateListItemToMarket(uint _itemId, uint _price) external payable nonReentrant validateMarketItem(_itemId, _price){
        Items storage item = items[_itemId];
        require(msg.sender == item.seller, "Market: This ItemId does not belong to you");
        require((item.auctionStart == false && item.expire_at <= 0), "Market: This item already in auction");
        require(item.isSold == true, "Market: This item has already been listed");
        require((item.nft.balanceOf(msg.sender, item.tokenId) == 1), "Market: This tokenId does not belong to this address or does not exist");

        item.price = _price;
        item.isSold = false;
        item.isActive = true;
        emit updateListNftEvent(_itemId, item.tokenId, msg.sender, item.nft);
        item.nft.safeTransferFrom(msg.sender, _ownerAccount, item.tokenId, 1, "");
    }

    // Item price update
    function updateItem(uint _itemId, uint _price) external payable nonReentrant validateMarketItem(_itemId, _price){
        Items storage item = items[_itemId];
        require(msg.sender == item.seller, "Market: This ItemId does not belong to you");
        require((item.auctionStart == false && item.expire_at == 0), "Market: This item already in auction");

        item.price = _price;
        item.isActive = true;
        item.isSold = false;
        emit updateItemEvent(_itemId, item.tokenId, _price, msg.sender, item.nft);
    }

     // Delete Item
    function deleteItem(uint _itemId) external payable nonReentrant{
        Items storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCounter.current(), "Market: ItemId does not exist");
        require(item.isBlock == false, "Market: This item is blocked");
        require(msg.sender == item.seller, "Market: This ItemId does not belong to you");
        require((item.auctionStart == false && item.expire_at == 0), "Market: This item already in auction");

        emit deleteItemEvent(_itemId, item.tokenId, msg.sender, item.nft);
        item.nft.safeTransferFrom(_ownerAccount, item.seller, item.tokenId, 1, "");
        delete items[_itemId];
    }

    // Start of the auction
    function auction(uint _itemId, uint _price) external payable nonReentrant validateMarketItem(_itemId, _price){

        uint msgValue = msg.value;
        Items storage item = items[_itemId];
        if(item.auctionStart == false){
            item.auctionStart = true;
            item.expire_at = _expireBidTime + block.timestamp;
        }

        require(msgValue > item.currentBidPrice, "Market: Your inventory is insufficient");
        require(_price > item.currentBidPrice, "Market: The bid price must be higher than the price of the previous bidder");
        require((item.expire_at > block.timestamp && item.isActive == true && item.isSold == false), "Market: This auction has ended");
        require(msg.sender != item.seller, "Market: You can't send offer to yourself");

        Items memory prevBidItem = item;

        item.currentBidPrice = _price;
        item.bidderValue = msgValue;
        item.bidder = payable(msg.sender);

        bidders.push(Bidders(
            _itemId, 
            item.currentBidPrice, // bidPrice
            block.timestamp, // created_at
            item.bidder
        ));

        uint freshBidTime = _refreshBidTime + block.timestamp;
        if(item.expire_at <= freshBidTime){
            item.expire_at = freshBidTime;
        }else{
            item.expire_at = _expireBidTime + block.timestamp;
        }
        emit auctionEvent(
            item.bidder, 
            prevBidItem.bidder, 
            item.currentBidPrice, 
            prevBidItem.currentBidPrice,
            item.bidderValue,
            prevBidItem.bidderValue,
            item.expire_at,
            item.nft
        );

        // sent bidder value to contract
        transaction(_ownerAccount);
        
    }

    // Transferring money to the NFT owner and transferring the NFT to the new buyer
    function payTobidder(uint _itemId) external payable onlyOwner nonReentrant{
        require(msg.value > 0, "Market: The price must be greater than zero");
        require(_itemId > 0 && _itemId <= itemCounter.current(), "Market: ItemId does not exist");
        Items storage item = items[_itemId];
        require(item.isBlock == false, "Market: This item is blocked");
        require(item.expire_at < block.timestamp, "Market: This item is under auction");
        require((item.isSold == false && item.auctionStart == true), "Market: This item does not have access to this task");

        uint totalPrice = getTotalPrice(item.bidderValue);
        require(totalPrice == msg.value, "Market: The total price is wrong");

       

        address prevSeller = item.seller;
        item.price = item.bidderValue;
        item.expire_at = 0;
        item.currentBidPrice = 0;
        item.bidderValue = 0;
        item.created_at = 0;
        item.seller = payable(item.bidder);
        item.bidder = payable(address(0));
        item.isSold = true;
        item.isActive = false;
        item.auctionStart = false;

        addTraceBuyer(item, prevSeller);

        emit payTobidderEvent(item.itemId, item.tokenId, prevSeller, item.seller, item.price, item.nft);
        item.nft.safeTransferFrom(_ownerAccount, item.seller, item.tokenId, 1, "");

        transaction(prevSeller);
    }

    // Follow up buyers
    function addTraceBuyer(Items memory _item, address prevSeller) private{
        TraceBuyers storage traceBuyer = traceBuyers[_item.itemId];
        traceBuyerCounter.increment();
        uint currentTraceBuyerCounter = traceBuyerCounter.current();
        if(traceBuyer.itemId == 0){
            traceBuyers[currentTraceBuyerCounter]=TraceBuyers(_item.itemId, block.timestamp, prevSeller, true);
        }
        traceBuyers[currentTraceBuyerCounter]=TraceBuyers(_item.itemId, block.timestamp, _item.seller, false);
    }

    function isBlock(uint _itemId) public view returns(bool){
        Items memory item = items[_itemId];
        return item.isBlock;
    }

    function blockItem(uint _itemId) public payable onlyOwner{
        Items storage item = items[_itemId];
        item.isBlock = true;
        emit blockNftEvent(_itemId, item.tokenId);
    }

    function unBlockItem(uint _itemId) public payable onlyOwner(){
        Items storage item = items[_itemId];
        item.isBlock = false;
        emit blockNftEvent(_itemId, item.tokenId);
    }

    // Transfer money to wallet
    function transaction(address _address) public payable{
        emit transactionEvent(_address, msg.value);
        (bool success,) = _address.call{value: msg.value}("");
        require(success, "Market: Faild transaction");
    }

}










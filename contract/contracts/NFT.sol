// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

/// @custom:security-contact armiaevil@gmail.com
contract NFT is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
    
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCount;
   
    address private _MarketAddress;
    string private _baseURI;

    struct NFTs{
        uint id;
        uint created_at;
        address addr;
    }

    mapping(uint => NFTs) private nfts;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }


    function initialize(address initialMarketAddress, string memory _uri) initializer public {
        __ERC1155_init(_uri);
        __Ownable_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();
        _baseURI = _uri;
        _MarketAddress = initialMarketAddress;
    }

    // Log Events

     event mintNftEvent(uint tokenId);

    //

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function uri(uint256 _tokenId) override public view returns (string memory) {
         return string(abi.encodePacked( _baseURI, StringsUpgradeable.toString(_tokenId), ".json" ));
    }

    function getNft(uint _tokenId) public view onlyOwner returns (NFTs memory){
        NFTs memory nft = nfts[_tokenId];
        return nft;
    }

    function getAllNfts() public view onlyOwner returns (NFTs[] memory){
        uint currentTokenIdCount = _tokenIdCount.current();
        NFTs[] memory _nfts = new NFTs[](currentTokenIdCount);
        for(uint i = 0; i < currentTokenIdCount; i++){
            _nfts[i] = nfts[i+1];
        }
        return _nfts;
    }

    function mint() public payable{
        _tokenIdCount.increment();
        uint currentTokenId = _tokenIdCount.current();
        nfts[currentTokenId] = NFTs(
            currentTokenId,
            block.timestamp,
            msg.sender
        );
        setApprovalForAll(_MarketAddress, true);
        _setURI(StringsUpgradeable.toString(currentTokenId));
        _mint(msg.sender, currentTokenId, 1, "");
        emit mintNftEvent(currentTokenId);
    }


    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}

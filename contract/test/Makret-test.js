require('dotenv').config();

const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const { EXPIRE_BID_TIME, REFRESH_BID_TIME, FEE_PERCENT, SECOND, NFT_URI }  = process.env;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const timeOut = 70000;

describe ("Market Contract", function(){
  this.timeout(timeOut);
  let myToken;

  const tokenIdZero = 0;
  const tokenIdOne = 1;
  const tokenIdTwo = 2;
  const tokenIdThree = 3;
  const tokenIdFour = 4;
  const tokenIdFive = 5;

  const itemZero = 0;
  const itemOne = 1;
  const itemTwo = 2;
  const itemThree = 3;
  const itemFour = 4;
  const itemFive = 5;

  const oneEth = toWei(1);
  const twoEth = toWei(2);
  const threeEth = toWei(3);
  const fourEth = toWei(4);
  const fiveEth = toWei(5);
  const sexEth = toWei(6);

  let zeroAddress = "0x0000000000000000000000000000000000000000";

  let market, nft, owner, sellerOne, sellerTwo, sellerThree, bidderOne, bidderTwo, bidderThree, bidderFour, otherBidder;
  let market2, nft2, owner_2, sellerOne_2, sellerTwo_2, sellerThree_2, bidderOne_2, bidderTwo_2, bidderThree_2, bidderFour_2, otherBidder_2;

  before(async function(){
    const Market = await ethers.getContractFactory("Market");
    market = await upgrades.deployProxy(Market, [FEE_PERCENT, EXPIRE_BID_TIME, REFRESH_BID_TIME], { initializer:'initialize' });
    [owner, sellerOne, sellerTwo, sellerThree, bidderOne, bidderTwo, bidderThree, bidderFour, ...otherBidder] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await upgrades.deployProxy(NFT, [market.address, NFT_URI], { initializer:'initialize' });

    ////////////////// Market and nft 2 ////////////////////
    const Market2 = await ethers.getContractFactory("Market");
    market2 = await upgrades.deployProxy(Market2, [FEE_PERCENT, 3, 3], { initializer:'initialize' });
    [owner_2, sellerOne_2, sellerTwo_2, sellerThree_2, bidderOne_2, bidderTwo_2, bidderThree_2, bidderFour_2, ...otherBidder_2] = await ethers.getSigners();

    const NFT2 = await ethers.getContractFactory("NFT");
    nft2 = await upgrades.deployProxy(NFT2, [market2.address, NFT_URI], { initializer:'initialize' });

  })

  it("check if initialize parapmeters is ok", async function(){
    let feePercent = await market.connect(owner).getFeepercent();
    let expireBidTime = await market.connect(owner).getExpireBidTime();
    let refreshBidTime = await market.connect(owner).getRefreshBidTime();
    assert.equal(feePercent, FEE_PERCENT);
    assert.equal(expireBidTime, EXPIRE_BID_TIME);
    assert.equal(refreshBidTime, REFRESH_BID_TIME);
    console.log(sellerOne.address, owner.address, market.address, nft.address)
  })

  it("mint token", async function(){
    let result = await nft.connect(sellerOne).mint();
    let wait = await result.wait();
    myToken = wait.events[2].args.tokenId;
    assert.equal(await nft.balanceOf(sellerOne.address, tokenIdOne), 1);
    assert.equal(await nft.uri(tokenIdOne), NFT_URI+`${tokenIdOne}.json`);
    assert.equal(myToken, tokenIdOne);

  })

  describe("List item to market", function(){
    let tokenId;
    it("mint token", async function(){
      let result = await nft.connect(sellerOne).mint();
      let wait = await result.wait();
      tokenId = myToken = parseInt(wait.events[2].args.tokenId);
    })


    it("List item to market ` successfully `", async function(){
      let insertResult = await market.connect(sellerOne).listItemToMarket(nft.address, tokenId, oneEth);

      let wait = await insertResult.wait();
      const args = wait.events[0].args;
      const item = await market.getItem(itemOne);
      // assert for item
      assert.equal(item.tokenId, tokenId);
      assert.equal(item.price, parseInt(oneEth));
      assert.equal(item.expire_at, 0);
      assert.equal(item.currentBidPrice, 0);
      assert.equal(item.bidderValue, 0);
      assert.equal(parseInt(item.created_at), parseInt(args.created_at));
      assert.equal(item.seller, sellerOne.address);
      assert.equal(item.bidder, zeroAddress);
      assert.equal(item.auctionStart, false);
      assert.equal(item.isActive, true);
      assert.equal(item.isSold, false);
      assert.equal(item.isBlock, false);
      assert.equal(item.nft, nft.address);

      // assert for event
      assert.equal(parseInt(args.tokenId), tokenId);
      assert.equal(args.seller, sellerOne.address);
      assert.equal(args.nft, nft.address);
    })
    it("Faild: faild for ` Token ID must be greater than zero `", async function(){
      await expect(market.connect(sellerOne).listItemToMarket(nft.address, tokenIdZero, 0)).to.be.revertedWith("Market: Token ID must be greater than zero");
    })
    it("Faild: faild for ` The price must be greater than zero `", async function(){
      await expect(market.connect(sellerOne).listItemToMarket(nft.address, tokenId, 0)).to.be.revertedWith("Market: The price must be greater than zero");
    })

    it("Faild: faild for ` tokenId does not belong to this address `", async function(){
      await expect(market.connect(sellerOne).listItemToMarket(nft.address, 55, oneEth)).to.be.revertedWith("Market: This tokenId does not belong to this address or does not exist");
      
    })
  })

  describe("Block and unBlock item in market", function(){
    it("Block nft ` successfully `", async function(){
      let result = await market.connect(owner).blockItem(itemOne);
      let wait = await result.wait();
      const args = wait.events[0].args;
      const item = await market.getItem(itemOne)
      assert.equal(item.isBlock, true);
      assert.equal(args.itemId, itemOne);
      assert.equal(args.tokenId, myToken);
    })

    it("UnBlock nft ` successfully `", async function(){
      let result = await market.connect(owner).unBlockItem(itemOne);
      let wait = await result.wait();
      const args = wait.events[0].args;
      const _item = await market.getItem(itemOne);
      assert.equal(_item.isBlock, false);
      assert.equal(args.itemId, itemOne);
      assert.equal(args.tokenId, myToken);
    })
  })

  describe("Update item in market", function(){
    it("Update item ` successfully `", async function(){
      let updateItem = await market.connect(sellerOne).updateItem(itemOne, twoEth);
      let wait = await updateItem.wait();
      const args = wait.events[0].args;
      const item = await market.getItem(itemOne);
      // assert for item
      assert.equal(item.price, parseInt(twoEth));
      assert.equal(item.isActive, true);
      assert.equal(item.isSold, false);

      // assert for event log
      assert.equal(args.itemId, itemOne);
      assert.equal(args.price, parseInt(twoEth));
      assert.equal(args.tokenId, myToken);
      assert.equal(args.seller, sellerOne.address);
    })

    it("Faild: faild for ` ItemId does not exist `", async function(){
      await expect(market.connect(sellerOne).updateItem(itemZero, 0)).to.be.revertedWith("Market: ItemId does not exist");
    })

    it("Faild: faild for ` The price must be greater than zero `", async function(){
      await expect(market.connect(sellerOne).updateItem(itemOne, 0)).to.be.revertedWith("Market: The price must be greater than zero");
    })

    it("Faild: faild for ` This item is blocked `", async function(){
      await market.connect(owner).blockItem(itemOne);
      await expect(market.connect(bidderOne).updateItem(itemOne, twoEth)).to.be.revertedWith("Market: This item is blocked");
      await market.connect(owner).unBlockItem(itemOne);
    })

    it("Faild: faild for ` This ItemId does not belong to you `", async function(){
      await expect(market.connect(bidderOne).updateItem(itemOne, twoEth)).to.be.revertedWith("Market: This ItemId does not belong to you");
    })

    it("Faild: faild for ` This ItemId does not belong to you `", async function(){
      await expect(market.connect(bidderOne).updateItem(itemOne, twoEth)).to.be.revertedWith("Market: This ItemId does not belong to you");
    })

    // for test faild ` This item already in auction ` chekck descripb auction

  })

  describe("auction", function(){
    it("first auction successfully", async function(){
      let price = threeEth;
      let result = await market.connect(bidderOne).auction(itemOne, price, {value:price});
      let wait = await result.wait()
      const auctionArgs = wait.events[0].args;
      // assert for item
      let item = await market.getItem(itemOne);
      assert.equal(item.bidder, bidderOne.address);
      assert.equal(parseInt(item.currentBidPrice), parseInt(price));
      assert.equal(parseInt(item.bidderValue), parseInt(price));

      // assert for event auction
      assert.equal(parseInt(auctionArgs.expire_at), parseInt(item.expire_at));
      assert.equal(auctionArgs.bidder, bidderOne.address);
      assert.equal(auctionArgs.prevBidder, zeroAddress);
      assert.equal(parseInt(auctionArgs.currentBidPrice), parseInt(price));
      assert.equal(parseInt(auctionArgs.prevCurrentBidPrice), 0);
      assert.equal(parseInt(auctionArgs.bidderValue), parseInt(price));
      assert.equal(parseInt(auctionArgs.prevBidderValue), 0);

      // assert for event transaction
      const args = wait.events[1].args;
      assert.equal(args.addr, owner.address);
      assert.equal(parseInt(args.amount), parseInt(price));

    })


    it("second auction successfully", async function(){
      let price = fourEth;
      let result = await market.connect(bidderTwo).auction(itemOne, price, {value:price});
      let wait = await result.wait()
      const auctionArgs = wait.events[0].args;
      // assert for item
      let item = await market.getItem(itemOne);
      assert.equal(item.bidder, bidderTwo.address);
      assert.equal(parseInt(item.currentBidPrice), parseInt(price));
      assert.equal(parseInt(item.bidderValue), parseInt(price));

      // assert for event
      assert.equal(parseInt(auctionArgs.expire_at), parseInt(item.expire_at));
      assert.equal(auctionArgs.bidder, bidderTwo.address);
      assert.equal(auctionArgs.prevBidder, bidderOne.address);
      assert.equal(parseInt(auctionArgs.currentBidPrice), parseInt(price));
      assert.equal(parseInt(auctionArgs.prevCurrentBidPrice), threeEth);
      assert.equal(parseInt(auctionArgs.bidderValue), parseInt(price));
      assert.equal(parseInt(auctionArgs.prevBidderValue), threeEth);

      // assert for event transaction
      const args = wait.events[1].args;
      assert.equal(args.addr, owner.address);
      assert.equal(parseInt(args.amount), parseInt(price));

      // sent back value to prev bidder
      let transactionToPrev = await market.connect(owner).transaction(bidderOne.address, {value:auctionArgs.prevBidderValue});
      let transactionToPrevWait = await transactionToPrev.wait();
      const transactionToPrevArgs = transactionToPrevWait.events[0].args;
      assert.equal(parseInt(transactionToPrevArgs.amount), parseInt(auctionArgs.prevBidderValue));
      assert.equal(transactionToPrevArgs.addr, bidderOne.address);
     
    })

    // This is for updateItem
    it("Faild: faild for ` This item already in auction `", async function(){
      await expect(market.connect(sellerOne).updateItem(itemOne, twoEth)).to.be.revertedWith("Market: This item already in auction");
    })


    it("Faild: faild for ` ItemId does not exist `", async function(){
      await expect(market.connect(bidderOne).auction(itemZero, fiveEth, {value:oneEth})).to.be.revertedWith("Market: ItemId does not exist");
    })

    it("Faild: faild for ` The price must be greater than zero `", async function(){
      await expect(market.connect(bidderOne).auction(itemOne, 0, {value:oneEth})).to.be.revertedWith("Market: The price must be greater than zero");
    })

    it("Faild: faild for ` This item is blocked `", async function(){
      await market.connect(owner).blockItem(itemOne);
      await expect(market.connect(bidderOne).auction(itemOne, fiveEth, {value:oneEth})).to.be.revertedWith("Market: This item is blocked");
      await market.connect(owner).unBlockItem(itemOne);
    })

    it("Faild: faild for ` The bid price must be higher than the price of the previous bidder `", async function(){
      await expect(market.connect(bidderOne).auction(itemOne, oneEth, {value:fiveEth})).to.be.revertedWith("Market: The bid price must be higher than the price of the previous bidder");
    })

    // Faild test for expire at check the describe payToBuery

    it("Faild: faild for ` You can't send offer to yourself `", async function(){
      await expect(market.connect(sellerOne).auction(itemOne, fiveEth, {value:fiveEth})).to.be.revertedWith("Market: You can't send offer to yourself");
    })

    it("Faild: faild for ` Your inventory is insufficient `", async function(){
      await expect(market.connect(bidderOne).auction(itemOne, oneEth, {value:oneEth})).to.be.revertedWith("Market: Your inventory is insufficient");
    })

  })

  describe("payTobidder", function(){
    let item, totalPrice;
    it("initial new market and nft", async function(){
      await nft2.connect(sellerOne_2).mint();
      await nft2.connect(sellerOne_2).mint();
      await nft2.connect(sellerOne_2).mint();
      await market2.connect(sellerOne_2).listItemToMarket(nft2.address, tokenIdOne, oneEth);
      await market2.connect(sellerOne_2).listItemToMarket(nft2.address, tokenIdTwo, oneEth);
      await market2.connect(sellerOne_2).listItemToMarket(nft2.address, tokenIdThree, oneEth);
      await market2.connect(bidderOne_2).auction(itemOne, twoEth, {value:twoEth});
      await market2.connect(bidderOne_2).auction(itemTwo, twoEth, {value:twoEth});

    })

    it('Faild: faild for ` This item is under auction `', async function(){
      await expect(market2.connect(owner_2).payTobidder(itemTwo, {value:threeEth})).to.be.revertedWith("Market: This item is under auction");
    })

    it("sleep time",function(done){
      console.log('start sleep 4 second')
      setTimeout(function(){
        console.log('done sleep.');
        done();
      },4000)
    });

    it('Faild: faild for ` The total price is wrong `', async function(){
      await expect(market2.connect(owner_2).payTobidder(itemOne, {value:threeEth})).to.be.revertedWith("Market: The total price is wrong");
    })

    it("pay to bidder ` successfully `", async function(){
      item = await market2.getItem(itemOne);
      await nft2.connect(owner_2).setApprovalForAll(market2.address, true);

      totalPrice = await market2.getTotalPrice(item.bidderValue);
      // let totalPrice = ((FEE_PERCENT / 100) * item.bidderValue);
      // totalPrice = ethers.BigNumber.from((item.bidderValue - totalPrice).toString());

      let result = await market2.connect(owner_2).payTobidder(itemOne, {value:totalPrice})
      let wait = await result.wait();
      let item2 = await market2.getItem(itemOne);
      // assert for item
      assert.equal(parseInt(item2.itemId), itemOne);
      assert.equal(parseInt(item2.tokenId), tokenIdOne);
      assert.equal(parseInt(item2.price), parseInt(twoEth));
      assert.equal(parseInt(item2.expire_at), 0);
      assert.equal(parseInt(item2.currentBidPrice), 0);
      assert.equal(parseInt(item2.bidderValue), 0);
      assert.equal(parseInt(item2.created_at), 0);
      assert.equal(item2.seller, bidderOne_2.address);
      assert.equal(item2.bidder, zeroAddress);
      assert.equal(item2.isSold, true);
      assert.equal(item2.isActive, false);
      assert.equal(item2.auctionStart, false);
      assert.equal(item2.isBlock, false);
      assert.equal(item2.nft, nft2.address);
      assert.equal(parseInt(await nft2.balanceOf(bidderOne_2.address, itemOne)), 1);

      // assert for event payTobidderEvent
      const args = wait.events[0].args;
      assert.equal(parseInt(args.itemId), itemOne);
      assert.equal(parseInt(args.tokenId), tokenIdOne);
      assert.equal(args.prevSeller, sellerOne_2.address);
      assert.equal(args.seller, bidderOne_2.address);
      assert.equal(parseInt(args.price), parseInt(twoEth));

      // assert for event transactionEvent
      const transactionArgs = wait.events[2].args;
      assert.equal(transactionArgs.addr, sellerOne_2.address);
      assert.equal(parseInt(transactionArgs.amount), parseInt(totalPrice));

      assert.equal(await nft2.balanceOf(item2.seller, item2.tokenId), 1)
    })

    // check faild expire_at for auction test
    it("Faild: faild for ` This auction has ended `", async function(){
      await expect(market2.connect(bidderTwo_2).auction(itemOne, fiveEth, {value:fiveEth})).to.be.revertedWith("Market: This auction has ended");
    })

    it('Faild: faild for ` ItemId does not exist `', async function(){
      await expect(market2.connect(owner_2).payTobidder(itemZero, {value:threeEth})).to.be.revertedWith("Market: ItemId does not exist");
    })
    it('Faild: faild for ` The price must be greater than zero `', async function(){
      await expect(market2.connect(owner_2).payTobidder(itemTwo, {value:0})).to.be.revertedWith("Market: The price must be greater than zero");
    })

    it('Faild: faild for ` This item is blocked `', async function(){
      await market2.connect(owner_2).blockItem(itemTwo);
      await expect(market2.connect(owner_2).payTobidder(itemTwo, {value:threeEth})).to.be.revertedWith("Market: This item is blocked");
      await market2.connect(owner_2).unBlockItem(itemTwo);
    })

    it('Faild: faild for ` This item does not have access to this task `', async function(){
      await expect(market2.connect(owner_2).payTobidder(itemOne, {value:threeEth})).to.be.revertedWith("Market: This item does not have access to this task");
    })

  })

  describe("update List Item To Market", function(){
    
    it("update List Item To Market ` successfully `", async function(){
      await nft2.connect(bidderOne_2).setApprovalForAll(market2.address, true);
      let result = await market2.connect(bidderOne_2).updateListItemToMarket(itemOne, threeEth);

      // assert for event updateListNftEvent
      let wait = await result.wait();
      const args = wait.events[0].args;
      assert.equal(parseInt(args.itemId), itemOne);
      assert.equal(parseInt(args.tokenId), tokenIdOne);
      assert.equal(args.seller, bidderOne_2.address);
      assert.equal(args.nft, nft2.address);

      // assert for item
      let item = await market2.getItem(itemOne);
      assert.equal(parseInt(item.price), parseInt(threeEth));
      assert.equal(item.isSold, false);
      assert.equal(item.isActive, true);
      assert.equal(item.seller, bidderOne_2.address);

      let balanceOf = await nft2.balanceOf(owner_2.address, tokenIdOne);
      assert.equal(parseInt(balanceOf), 1);

    })
    it("Faild: faild for ` ItemId does not exist `", async function(){
      await expect(market2.connect(bidderOne_2).updateListItemToMarket(itemZero, fiveEth)).to.be.revertedWith("Market: ItemId does not exist");
    })

    it("Faild: faild for ` The price must be greater than zero `", async function(){
      await expect(market2.connect(bidderOne_2).updateListItemToMarket(itemOne, 0)).to.be.revertedWith("Market: The price must be greater than zero");
    })

    // it("Faild: faild for ` This tokenId does not belong to this address or does not exist `", async function(){
    //   await expect(market2.connect(bidderOne_2).updateListItemToMarket(itemOne, fiveEth)).to.be.revertedWith("Market: This tokenId does not belong to this address or does not exist");
    // })

    it("Faild: faild for ` This item is blocked `", async function(){
      await market2.connect(owner_2).blockItem(itemOne);
      await expect(market2.connect(bidderOne_2).updateListItemToMarket(itemOne, fiveEth)).to.be.revertedWith("Market: This item is blocked");
      await market2.connect(owner_2).unBlockItem(itemOne);
    })
    it("Faild: faild for ` This ItemId does not belong to you `", async function(){
      await expect(market2.connect(bidderTwo_2).updateListItemToMarket(itemOne, fiveEth)).to.be.revertedWith("Market: This ItemId does not belong to you");
    })
    it("Faild: faild for ` This item already in auction `", async function(){
      await expect(market2.connect(sellerOne_2).updateListItemToMarket(itemTwo, fiveEth)).to.be.revertedWith("Market: This item already in auction");
    })
    it("Faild: faild for ` This item has already been listed `", async function(){
      await expect(market2.connect(sellerOne_2).updateListItemToMarket(itemThree, fiveEth)).to.be.revertedWith("Market: This item has already been listed");
    })
    
  })

  describe("Update Item", function(){
    it("update item successfully", async function(){
      let result = await market2.connect(bidderOne_2).updateItem(itemOne, threeEth);

      // assert for event updateItemEvent
      let wait = await result.wait();
      const args = wait.events[0].args;
      assert.equal(parseInt(args.itemId), itemOne);
      assert.equal(parseInt(args.tokenId), tokenIdOne);
      assert.equal(parseInt(args.price), parseInt(threeEth));
      assert.equal(args.seller, bidderOne_2.address);
      assert.equal(args.nft, nft2.address);

      // assert for item
      let item = await market2.getItem(itemOne);
      assert.equal(parseInt(item.itemId), itemOne);
      assert.equal(parseInt(item.tokenId), tokenIdOne);
      assert.equal(parseInt(item.price), parseInt(threeEth));
      assert.equal(item.seller, bidderOne_2.address);
      assert.equal(item.isActive, true);
      assert.equal(item.isSold, false);
    })
    it('Faild: faild for ` This ItemId does not belong to you `', async function(){
      await expect(market2.connect(sellerOne_2).updateItem(itemOne, threeEth)).to.be.revertedWith("Market: This ItemId does not belong to you");
    })
    it('Faild: faild for ` This item already in auction `', async function(){
      await expect(market2.connect(sellerOne_2).updateItem(tokenIdTwo, threeEth)).to.be.revertedWith("Market: This item already in auction");
    })
  })

  describe("Delete Item", function(){
    before(async function(){
      await nft.connect(sellerThree).mint();
      await nft.connect(sellerThree).mint();
      await market.connect(sellerThree).listItemToMarket(nft.address, tokenIdThree, oneEth);
      await market.connect(sellerThree).listItemToMarket(nft.address, tokenIdFour, oneEth);
      await market.connect(bidderOne).auction(itemThree, twoEth, {value:twoEth});
    });
    it("Delete item successfully", async function(){
      await nft.connect(owner).setApprovalForAll(market.address, true);
      let result = await market.connect(sellerThree).deleteItem(itemTwo);
      
      // assert for event updateItemEvent
      let wait = await result.wait();
      const args = wait.events[0].args;
      assert.equal(parseInt(args.itemId), itemTwo);
      assert.equal(parseInt(args.tokenId), tokenIdThree);
      assert.equal(args.seller, sellerThree.address);
      assert.equal(args.nft, nft.address);

      // assert for item
      let item = await market.getItem(itemTwo);
      assert.equal(parseInt(item.itemId), 0);
      assert.equal(parseInt(item.tokenId), 0);
      assert.equal(parseInt(item.price), 0);
      assert.equal(parseInt(item.expire_at), 0);
      assert.equal(parseInt(item.currentBidPrice), 0);
      assert.equal(parseInt(item.bidderValue), 0);
      assert.equal(parseInt(item.created_at), 0);
      assert.equal(item.seller, zeroAddress);
      assert.equal(item.bidder, zeroAddress);
      assert.equal(item.isActive, false);
      assert.equal(item.isSold, false);
      assert.equal(item.auctionStart, false);
      assert.equal(item.isBlock, false);
      assert.equal(item.nft, zeroAddress);
    })
    it('Faild: faild for ` ItemId does not exist `', async function(){
      await expect(market.connect(sellerThree).deleteItem(itemFour)).to.be.revertedWith("Market: ItemId does not exist");
    })
    it("Faild: faild for ` This item is blocked `", async function(){
      await market.connect(owner).blockItem(itemTwo);
      await expect(market.connect(sellerThree).deleteItem(itemTwo)).to.be.revertedWith("Market: This item is blocked");
      await market.connect(owner).unBlockItem(itemTwo);
    })
    it('Faild: faild for ` This ItemId does not belong to you `', async function(){
      await expect(market.connect(bidderOne).deleteItem(itemTwo)).to.be.revertedWith("Market: This ItemId does not belong to you");
    })
    it("Faild: faild for ` This item already in auction `", async function(){
      await expect(market.connect(sellerThree).deleteItem(itemThree)).to.be.revertedWith("Market: This item already in auction");
    })  
  })

})
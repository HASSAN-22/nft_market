const { ethers, upgrades } = require("hardhat");
require('dotenv').config()
const { EXPIRE_BID_TIME, REFRESH_BID_TIME, FEE_PERCENT, SECOND, NFT_URI } = process.env;
async function main() {
  // Market
  const Market = await ethers.getContractFactory("Market");
  const market = await upgrades.deployProxy(Market, [FEE_PERCENT, EXPIRE_BID_TIME, REFRESH_BID_TIME], { initializer:'initialize' });
  await market.deployed();
  let owner;
  [owner] = await ethers.getSigners();

  console.log("market Address:", market.address);

  // NFT
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await upgrades.deployProxy(NFT, [market.address, NFT_URI], { initializer:'initialize' });
  await nft.deployed();
  console.log("NFT Address:", nft.address);

}

main();
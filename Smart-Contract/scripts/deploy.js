const hre = require("hardhat");

async function main() {

  const GoerliThugs = await hre.ethers.getContractFactory("MyNFT");
  const goerliThugs = await GoerliThugs.deploy();

  await goerliThugs.deployed();

  console.log("My NFT deployed to:", goerliThugs.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
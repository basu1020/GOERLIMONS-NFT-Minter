const hre = require("hardhat");

async function main() {

  const GoerliMons = await hre.ethers.getContractFactory("GMON");
  const goerliMons = await GoerliMons.deploy();

  await goerliMons.deployed();

  console.log("My NFT deployed to:", goerliMons.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//0xF9a04c183f965973A71F529AEbF1dEEbe36E4044
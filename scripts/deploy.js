const hre = require("hardhat");

async function main() {
  
  //const SaintEthAmount = hre.ethers.utils.parseEther("0.1");

  const SaintEth = await hre.ethers.getContractFactory("SaintEth");
  const sainteth = await SaintEth.deploy();

  await sainteth.deployed();

  console.log("Saint Eth", sainteth.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
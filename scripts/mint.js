// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.attach(
    "0x332E9272cc853bf341Ed397A3f5Bc77328d129E1"
  );

  // await myToken.setBaseURI(
  //   "ipfs://QmejYa4kkcnCjDiZwy2YnNCY2CBBYnnxDV3V2F1Eh77iya/"
  // );

  // await myToken.safeMint("0xbcE13E558276c9322B41900d67E24067A10BD8C5", 1);

  const tokenUri = await myToken.tokenURI(1);
  console.log(`tokenUri: ${tokenUri}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

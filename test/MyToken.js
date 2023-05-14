const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    await myToken.deployed();

    return { myToken, owner, otherAccount };
  }

  describe("Custom functions", function () {
    it("Should safeMint", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(
        deployContract
      );

      await myToken.safeMint(otherAccount.address, 1);

      const ownerOfToken = await myToken.ownerOf(1);
      expect(ownerOfToken).to.equal(otherAccount.address);
    });

    it("Should set baseUri", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(
        deployContract
      );
      await myToken.safeMint(otherAccount.address, 1);

      await myToken.setBaseURI("ipfs://random/");

      const tokenUri = await myToken.tokenURI(1);
      expect(tokenUri).to.be.equal("ipfs://random/1.json");
    });
  });
});

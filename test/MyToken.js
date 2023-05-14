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
    it("Should mint", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(
        deployContract
      );

      let tx = await myToken.mint(otherAccount.address, 1);

      const ownerOfToken = await myToken.ownerOf(0);
      expect(ownerOfToken).to.equal(otherAccount.address);
    });

    it("Should mint 1000", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(
        deployContract
      );

      myToken.mint(otherAccount.address, 1000);
    });

    it("Should set baseUri", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(
        deployContract
      );
      await myToken.mint(otherAccount.address, 1);

      await myToken.setBaseURI("ipfs://random/");

      const tokenUri = await myToken.tokenURI(0);
      expect(tokenUri).to.be.equal("ipfs://random/0.json");
    });
  });
});

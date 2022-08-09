const { ethers } = require("chai");
const { expect } = require("chai");
const hre = require("hardhat");
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");


describe("SaintEth", function() {

    let SaintEth, saintEthContract, owner, addr1, addr2, addr3, addrs
    beforeEach(async function () {
      SaintEth = await hre.ethers.getContractFactory("SaintEth");
      [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();
      saintEthContract = await SaintEth.deploy(10185)
    });
  
    describe('Deployment', function() {
      it('Should set the constructor correctly', async function () {
        expect(await saintEthContract.s_owner()).to.equal(owner.address)
      })
    });


    describe('Deployment', function() {
      it('Should set the subscriptionId ', async function () {
        expect(await saintEthContract.s_subscriptionId()).to.equal(10185)
      })
    });

    describe('requestRandomWords', function() {
      it('revert if subscription is not funded', async function () {
        await expect(saintEthContract.connect(owner).requestRandomWords()).to.be.reverted;
      })
    });





})

const { ethers } = require("chai");
const { expect } = require("chai");
const { BigNumber } = require('ethers');
const hre = require("hardhat");
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");

describe("SaintEth", function() {


    let SaintEth, saintEthContract, owner, addr1, addr2, addr3, addrs
    beforeEach(async function () {
      [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();
      SaintEth = await hre.ethers.getContractFactory("SaintEth");
      saintEthContract = await SaintEth.deploy(10185);
      
    });
  
    describe('Deployment', function() {
      it('Should set the constructor correctly', async function () {
        expect(await saintEthContract.s_owner()).to.equal(owner.address)
      })
    });


    describe('Deployment', function() {
      it('Should set the subscriptionId ', async function () {
        overrides = await saintEthContract.s_subscriptionId();
        const expected = hre.ethers.utils.parseUnits("10185", 0);
        //console.log(overrides);
        //console.log(hre.ethers.utils.parseUnits("10185", 0));
        expect(hre.ethers.utils.formatEther(overrides)).to.be.equal(hre.ethers.utils.formatEther(expected));
      })
    });

    // describe('requestRandomWords', function() {
    //   it('revert if subscription is not funded', async function () {
    //     await expect(saintEthContract.connect(owner).requestRandomWords()).to.be.reverted;
    //   })
    //   it('should call the fulffilRandWords', async function () {
    //     saintEthContract
    //     await requestRandomWords();
    //     console.log();
    //   })

    
    // });







})

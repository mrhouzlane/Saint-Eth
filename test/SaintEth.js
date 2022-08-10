const  { ethers } = require("chai");
const { expect } = require("chai");
const { BigNumber } = require('ethers');
const hre = require("hardhat");
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");
const { chai } = require('chai');


describe("SaintEth", function() {


    let SaintEth, saintEthContract, owner, addr1, addr2, addr3, addrs
    beforeEach(async function () {
      [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();
      SaintEth = await hre.ethers.getContractFactory("SaintEth");
      saintEthContract = await SaintEth.deploy(10185); // https://vrf.chain.link/
      
    });
  
    describe('Deployment', function() {
      it('Should set the constructor correctly', async function () {
        expect(await saintEthContract.s_owner()).to.equal(owner.address)
      })
    });

      it('Should set the subscriptionId ', async function () {
        overrides = await saintEthContract.s_subscriptionId();
        const expected = hre.ethers.utils.parseUnits("10185", 0);
        //console.log(overrides);
        //console.log(hre.ethers.utils.parseUnits("10185", 0));
        expect(hre.ethers.utils.formatEther(overrides)).to.be.equal(hre.ethers.utils.formatEther(expected));
      })

    // // describe('requestRandomWords', function() {
    // //   it('revert if subscription is not funded', async function () {
    // //     await expect(saintEthContract.connect(owner).requestRandomWords()).to.be.revertedWith();
    // //   })
      

    // })

    describe('enterLottery', function() {
      it('Update status', async function () {
        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(addr1.address, overrides)
        await saintEthContract.connect(addr2).enterLottery(addr2.address, overrides)
        await saintEthContract.connect(addr3).enterLottery(addr3.address, overrides)


      })
    });




})








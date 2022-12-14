const { ethers } = require("chai");
const { expect } = require("chai");
const hre = require("hardhat");
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");


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

      it('Should set the subscriptionId ', async function () {
        overrides = await saintEthContract.s_subscriptionId();
        const expected = hre.ethers.utils.parseUnits("10185", 0);
        //console.log(overrides);
        //console.log(hre.ethers.utils.parseUnits("10185", 0));
        expect(hre.ethers.utils.formatEther(overrides)).to.be.equal(hre.ethers.utils.formatEther(expected));
      })

    });


    describe('enterLottery', function() {
      it('Update status', async function () {
        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(overrides)
        //await saintEthContract.connect(addr4).enterLottery(addr2.address, overrides)
        //await saintEthContract.connect(addr3).enterLottery(addr3.address, overrides)

        expect(await saintEthContract.status()).to.equal(1);

      });

      it('Whitelist participant', async function () {
        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(overrides)

        expect(await saintEthContract.isWhitelisted(addr1.address)).to.be.equal(true);

      });

      it("revert if msg.value <0.1", async function() {
        const overrides = {value: hre.ethers.utils.parseEther("0.099")}
        await expect(saintEthContract.connect(addr1).enterLottery(overrides)).to.be.revertedWith("Not enough");
      });

      it("should map an address in the array", async function() {
        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(overrides)
        await saintEthContract.connect(addr2).enterLottery(overrides)
        expect(await saintEthContract.participants(0)).to.be.equal(addr1.address);
        expect(await saintEthContract.participants(1)).to.be.equal(addr2.address);
        //expect(await saintEthContract.participants().length).to.be.equal(2);
      });


    });


    describe('startLottery', function() {
      it('should return the Id of a whitelisted address', async function () {
        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(overrides)
        await saintEthContract.connect(addr2).enterLottery(overrides)
        await saintEthContract.connect(addr3).enterLottery(overrides)

        await saintEthContract.connect(owner).startLottery();
        await saintEthContract.connect(owner).startLottery();

        expect(await saintEthContract.addressToTicket(addr1.address)).to.be.equal(0)
        expect(await saintEthContract.addressToTicket(addr2.address)).to.be.equal(1)

      });


      it('should revert if not called by the owner', async function () {
        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(overrides)
        await saintEthContract.connect(addr2).enterLottery(overrides)
        await saintEthContract.connect(addr3).enterLottery(overrides)

        await expect (saintEthContract.connect(addr1).startLottery(addr1.getAddress()))
        .to.be.revertedWith("Ownable: caller is not the owner")
       
      });


    })

    describe('selectWinner', function() {
      it.only('should return the winner', async function () {

        const overrides = {value: hre.ethers.utils.parseEther("0.1")}
        await saintEthContract.connect(addr1).enterLottery(overrides)
        await saintEthContract.connect(addr2).enterLottery(overrides)
        await saintEthContract.connect(addr3).enterLottery(overrides)

        await saintEthContract.connect(owner).startLottery();
        await saintEthContract.connect(owner).startLottery();

        const random = await saintEthContract.s_randomWords
        const randoms = hre.ethers.utils.formatEther(random)
        console.log(randoms);
        const lengths = await saintEthContract.participants().length;
        const winner = await saintEthContract.participants([random % lengths]) ;
        console.log(winner);

        //expect(winner).to.be.equal(Winner);

      });
    })






     
})










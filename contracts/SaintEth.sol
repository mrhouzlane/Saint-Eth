// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


contract SaintEth is Ownable {

    address[] public participants  ; //for the giveAway everyone should know the participants
    mapping(address => bool) isWhitelisted ; 
    mapping(address => uint256) addressToTicket; //each address has a ticket like id 

    enum LotterySteps {
        notStarted,
        Initliazed, 
        Started,
        Finished
    }

    LotterySteps public status ;


    ///------------------------------------------------------CHAINLINK PART--------------------------------------------------------------------------///

    // VRFCoordinatorV2Interface COORDINATOR;

    // // Your subscription ID.
    // uint64 s_subscriptionId;

    // // Rinkeby coordinator. For other networks,
    // // see https://docs.chain.link/docs/vrf-contracts/#configurations
    // address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

    // // The gas lane to use, which specifies the maximum gas price to bump to.
    // // For a list of available gas lanes on each network,
    // // see https://docs.chain.link/docs/vrf-contracts/#configurations
    // bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    // // Depends on the number of requested values that you want sent to the
    // // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // // so 100,000 is a safe default for this example contract. Test and adjust
    // // this limit based on the network that you select, the size of the request,
    // // and the processing of the callback request in the fulfillRandomWords()
    // // function.
    // uint32 callbackGasLimit = 100000;

    // // The default is 3, but you can set this higher.
    // uint16 requestConfirmations = 3;

    // // For this example, retrieve 2 random values in one request.
    // // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    // uint32 numWords =  2;

    // uint256[] public s_randomWords;
    // uint256 public s_requestId;
    // address s_owner;

    // constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
    //     COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    //     s_owner = msg.sender;
    //     s_subscriptionId = subscriptionId;
    // }

    // // Assumes the subscription is funded sufficiently.
    // function requestRandomWords() external onlyOwner {
    //     // Will revert if subscription is not set and funded.
    //     s_requestId = COORDINATOR.requestRandomWords(
    //     keyHash,
    //     s_subscriptionId,
    //     requestConfirmations,
    //     callbackGasLimit,
    //     numWords
    //     );
    // }

    // function fulfillRandomWords(
    //     uint256, /* requestId */
    //     uint256[] memory randomWords
    // ) internal override {
    //     s_randomWords = randomWords;
    // }

    ///------------------------------------------------------GIVEAWAY--------------------------------------------------------------------------///


    //@notice Pay to enter Lottery 
    function enterLottery(address _participant) external payable{
        require(status ==  LotterySteps.notStarted);
        require(msg.value >= 0.1 ether, "Not enough"); //small revert text to consume less gas
        require(isWhitelisted[_participant] = false, "Already participating");

        participants.push(_participant);
        status == LotterySteps.Initliazed;

    }

    function returnId(address _address) private returns (uint256) {
        require(isWhitelisted[_address] = true, "Enter Lottery before getting Id");
        for (uint i = 1 ; i <= participants.length ; i++ ){
            addressToTicket[participants[i]] = i; 
        }

        return addressToTicket[_address];
    }

    //@notice Start the Lottery
    function startLottery() public onlyOwner {
        require(status == LotterySteps.Initliazed);
        require(participants.length >= 3); // for testing purposes we set 3 to test with 3 accounts; 

        status = LotterySteps.Started;


    }

    function selectWinner() internal view returns(address){}




    function rewardWinner() external{}


    // modifier onlyOwner() {
    // require(msg.sender == s_owner);
    // _;
    // }






   
}


// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract VotingMachine {
    
    mapping(address=>uint256) voteMapper;
    mapping(address=>bool) hasVoted;
    mapping(address=>bool) voterRegister;
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }
    modifier onlyOwner() {

        require(msg.sender == owner, "Not the owner");
        _;
    }


    function RegisterNewVoter(address voterAddress, uint256 age) public onlyOwner{
        require(age>=18,"voter must be atleast 18 years old");
        require(voterRegister[voterAddress],"voter already registered");

        voterRegister[voterAddress] = true;
    }

    function vote(address voterAddress, uint256 partyCode ) public onlyOwner{
        require(partyCode<=9999,"only party code from 0 to 9999 are allowed");
        require(voterRegister[voterAddress],"voter should be registered first");
        require(hasVoted[voterAddress],"voter can only vote once");

        hasVoted[voterAddress] = true;
        voteMapper[voterAddress] = partyCode;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }
}

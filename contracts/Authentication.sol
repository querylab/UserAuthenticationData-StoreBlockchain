// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

contract Authentication {
    uint256 public nbOfUsers;

    struct User {
        string signatureHash;
        address userAddress;
    }

    mapping(address => User) private users;

    constructor() {
        nbOfUsers = 0;
    }

    function register(string memory _signature) public {
        require(users[msg.sender].userAddress == address(0), "already registered");

        users[msg.sender].signatureHash = _signature;
        users[msg.sender].userAddress = msg.sender;
        nbOfUsers++;
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == users[msg.sender].userAddress, "Not allowed");

        return users[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return users[msg.sender].userAddress;
    }
}
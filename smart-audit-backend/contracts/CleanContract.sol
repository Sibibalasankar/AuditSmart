// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NoAccessControl {
    address public owner;
    uint public storedData;

    constructor() {
        owner = msg.sender;
    }

    function updateData(uint _data) public {
        storedData = _data;
    }
}

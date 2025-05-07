// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FixedVault {
    mapping(address => uint) private balances;
    bool private locked;
    
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
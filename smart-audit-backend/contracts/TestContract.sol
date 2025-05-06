// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SafeVault is ReentrancyGuard {
    mapping(address => uint256) private balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // Accept ETH deposits
    receive() external payable {
        deposit();
    }

    // Deposit function
    function deposit() public payable {
        require(msg.value > 0, "Must send some Ether");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw function with reentrancy guard
    function withdraw(uint256 amount) public nonReentrant {
        require(amount > 0, "Invalid amount");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Update state before external call
        balances[msg.sender] -= amount;

        // Transfer Ether
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawn(msg.sender, amount);
    }

    // View user's balance
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // View total balance of contract (optional)
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

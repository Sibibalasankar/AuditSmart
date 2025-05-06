```solidity
// contracts/UnprotectedSelfdestruct.sol
pragma solidity ^0.8.17;

contract UnprotectedSelfdestruct {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function kill() public {
        require(msg.sender == owner, "Only the owner can destroy the contract");
        selfdestruct(payable(owner));
    }

    receive() external payable {}
}
```
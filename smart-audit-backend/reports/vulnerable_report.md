# Audit Report

## Original Code

```solidity
// VulnerableContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
}

```

## Detected Vulnerabilities

### reentrancy-eth

- **Description:** Reentrancy in VulnerableContract.withdraw() (contracts/vulnerable.sol#12-20):
	External calls:
	- (sent,None) = msg.sender.call{value: amount}() (contracts/vulnerable.sol#16)
	State variables written after the call(s):
	- balances[msg.sender] = 0 (contracts/vulnerable.sol#19)
	VulnerableContract.balances (contracts/vulnerable.sol#6) can be used in cross function reentrancies:
	- VulnerableContract.balances (contracts/vulnerable.sol#6)
	- VulnerableContract.deposit() (contracts/vulnerable.sol#8-10)
	- VulnerableContract.withdraw() (contracts/vulnerable.sol#12-20)

- **Impact:** High
- **Confidence:** Medium
- **Source Mapping:** N/A


### solc-version

- **Description:** Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- ^0.8.0 (contracts/vulnerable.sol#3)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** N/A


### low-level-calls

- **Description:** Low level call in VulnerableContract.withdraw() (contracts/vulnerable.sol#12-20):
	- (sent,None) = msg.sender.call{value: amount}() (contracts/vulnerable.sol#16)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** N/A


## Rewritten Contract

```solidity
// Gemini quota exceeded. Retry after ~30 seconds.
```
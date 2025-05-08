# Audit Report

## Original Code

```solidity
// contracts/UnprotectedSelfdestruct.sol
pragma solidity ^0.8.0;

contract UnprotectedSelfdestruct {
    function kill() public {
        selfdestruct(payable(msg.sender)); // anyone can destroy the contract
    }

    receive() external payable {}
}

```

## Detected Vulnerabilities

### suicidal

- **Description:** UnprotectedSelfdestruct.kill() (contracts/pasted_contract.sol#5-7) allows anyone to destruct the contract

- **Impact:** High
- **Confidence:** High
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
	- ^0.8.0 (contracts/pasted_contract.sol#2)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** N/A


## Rewritten Contract

```solidity
// Gemini quota exceeded. Retry after ~30 seconds.
```
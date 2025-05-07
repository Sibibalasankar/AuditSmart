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

- **Description:** UnprotectedSelfdestruct.kill() (contracts/sample.sol#5-7) allows anyone to destruct the contract

- **Impact:** High
- **Confidence:** High
- **Source Mapping:** [{'type': 'function', 'name': 'kill', 'source_mapping': {'start': 109, 'length': 110, 'filename_relative': 'contracts/sample.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/sample.sol', 'filename_short': 'contracts/sample.sol', 'is_dependency': False, 'lines': [5, 6, 7], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'UnprotectedSelfdestruct', 'source_mapping': {'start': 69, 'length': 190, 'filename_relative': 'contracts/sample.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/sample.sol', 'filename_short': 'contracts/sample.sol', 'is_dependency': False, 'lines': [4, 5, 6, 7, 8, 9, 10], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'kill()'}}]


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
	- ^0.8.0 (contracts/sample.sol#2)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** [{'type': 'pragma', 'name': '^0.8.0', 'source_mapping': {'start': 42, 'length': 23, 'filename_relative': 'contracts/sample.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/sample.sol', 'filename_short': 'contracts/sample.sol', 'is_dependency': False, 'lines': [2], 'starting_column': 1, 'ending_column': 24}, 'type_specific_fields': {'directive': ['solidity', '^', '0.8', '.0']}}]


## Rewritten Contract

```solidity
// Gemini quota exceeded. Retry after ~30 seconds.
```
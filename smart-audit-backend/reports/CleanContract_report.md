# Audit Report

## Original Code

```solidity
// CleanContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CleanContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function updateOwner(address newOwner) external {
        require(msg.sender == owner, "Not owner");
        owner = newOwner;
    }
}

```

## Detected Vulnerabilities

### missing-zero-check

- **Description:** CleanContract.updateOwner(address).newOwner (contracts/CleanContract.sol#12) lacks a zero-check on :
		- owner = newOwner (contracts/CleanContract.sol#14)

- **Impact:** Low
- **Confidence:** Medium
- **Source Mapping:** [{'type': 'variable', 'name': 'newOwner', 'source_mapping': {'start': 221, 'length': 16, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [12], 'starting_column': 26, 'ending_column': 42}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'updateOwner', 'source_mapping': {'start': 200, 'length': 135, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'CleanContract', 'source_mapping': {'start': 82, 'length': 256, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'updateOwner(address)'}}}}, {'type': 'node', 'name': 'owner = newOwner', 'source_mapping': {'start': 311, 'length': 16, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [14], 'starting_column': 9, 'ending_column': 25}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'updateOwner', 'source_mapping': {'start': 200, 'length': 135, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'CleanContract', 'source_mapping': {'start': 82, 'length': 256, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'updateOwner(address)'}}}}]


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
	- ^0.8.0 (contracts/CleanContract.sol#3)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** [{'type': 'pragma', 'name': '^0.8.0', 'source_mapping': {'start': 55, 'length': 23, 'filename_relative': 'contracts/CleanContract.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/CleanContract.sol', 'filename_short': 'contracts/CleanContract.sol', 'is_dependency': False, 'lines': [3], 'starting_column': 1, 'ending_column': 24}, 'type_specific_fields': {'directive': ['solidity', '^', '0.8', '.0']}}]


## Rewritten Contract

```solidity
// Gemini quota exceeded. Retry after ~30 seconds.
```
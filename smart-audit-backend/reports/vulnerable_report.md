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
- **Source Mapping:** [{'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 270, 'length': 286, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'VulnerableContract', 'source_mapping': {'start': 87, 'length': 472, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}, {'type': 'node', 'name': '(sent,None) = msg.sender.call{value: amount}()', 'source_mapping': {'start': 413, 'length': 50, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [16], 'starting_column': 9, 'ending_column': 59}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 270, 'length': 286, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'VulnerableContract', 'source_mapping': {'start': 87, 'length': 472, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}}, 'additional_fields': {'underlying_type': 'external_calls'}}, {'type': 'node', 'name': 'balances[msg.sender] = 0', 'source_mapping': {'start': 524, 'length': 24, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [19], 'starting_column': 9, 'ending_column': 33}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 270, 'length': 286, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'VulnerableContract', 'source_mapping': {'start': 87, 'length': 472, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}}, 'additional_fields': {'underlying_type': 'variables_written', 'variable_name': 'balances'}}]


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
- **Source Mapping:** [{'type': 'pragma', 'name': '^0.8.0', 'source_mapping': {'start': 60, 'length': 23, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [3], 'starting_column': 1, 'ending_column': 24}, 'type_specific_fields': {'directive': ['solidity', '^', '0.8', '.0']}}]


### low-level-calls

- **Description:** Low level call in VulnerableContract.withdraw() (contracts/vulnerable.sol#12-20):
	- (sent,None) = msg.sender.call{value: amount}() (contracts/vulnerable.sol#16)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** [{'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 270, 'length': 286, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'VulnerableContract', 'source_mapping': {'start': 87, 'length': 472, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}, {'type': 'node', 'name': '(sent,None) = msg.sender.call{value: amount}()', 'source_mapping': {'start': 413, 'length': 50, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [16], 'starting_column': 9, 'ending_column': 59}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 270, 'length': 286, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'VulnerableContract', 'source_mapping': {'start': 87, 'length': 472, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}}}]


## Rewritten Contract

```solidity
// Gemini quota exceeded. Retry after ~30 seconds.
```
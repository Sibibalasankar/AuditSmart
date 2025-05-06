# Audit Report

## Original Code

```solidity
// contracts/vulnerable.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReentrancyExample {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0;
    }
}

```

## Detected Vulnerabilities

### reentrancy-eth

- **Description:** Reentrancy in ReentrancyExample.withdraw() (contracts/vulnerable.sol#12-18):
	External calls:
	- (sent,None) = msg.sender.call{value: bal}() (contracts/vulnerable.sol#15)
	State variables written after the call(s):
	- balances[msg.sender] = 0 (contracts/vulnerable.sol#17)
	ReentrancyExample.balances (contracts/vulnerable.sol#6) can be used in cross function reentrancies:
	- ReentrancyExample.balances (contracts/vulnerable.sol#6)
	- ReentrancyExample.deposit() (contracts/vulnerable.sol#8-10)
	- ReentrancyExample.withdraw() (contracts/vulnerable.sol#12-18)

- **Impact:** High
- **Confidence:** Medium
- **Source Mapping:** [{'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 266, 'length': 245, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 89, 'length': 425, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}, {'type': 'node', 'name': '(sent,None) = msg.sender.call{value: bal}()', 'source_mapping': {'start': 373, 'length': 47, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [15], 'starting_column': 9, 'ending_column': 56}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 266, 'length': 245, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 89, 'length': 425, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}}, 'additional_fields': {'underlying_type': 'external_calls'}}, {'type': 'node', 'name': 'balances[msg.sender] = 0', 'source_mapping': {'start': 479, 'length': 24, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [17], 'starting_column': 9, 'ending_column': 33}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 266, 'length': 245, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 89, 'length': 425, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}}, 'additional_fields': {'underlying_type': 'variables_written', 'variable_name': 'balances'}}]


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
- **Source Mapping:** [{'type': 'pragma', 'name': '^0.8.0', 'source_mapping': {'start': 62, 'length': 23, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [3], 'starting_column': 1, 'ending_column': 24}, 'type_specific_fields': {'directive': ['solidity', '^', '0.8', '.0']}}]


### low-level-calls

- **Description:** Low level call in ReentrancyExample.withdraw() (contracts/vulnerable.sol#12-18):
	- (sent,None) = msg.sender.call{value: bal}() (contracts/vulnerable.sol#15)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** [{'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 266, 'length': 245, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 89, 'length': 425, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}, {'type': 'node', 'name': '(sent,None) = msg.sender.call{value: bal}()', 'source_mapping': {'start': 373, 'length': 47, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [15], 'starting_column': 9, 'ending_column': 56}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 266, 'length': 245, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 89, 'length': 425, 'filename_relative': 'contracts/vulnerable.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable.sol', 'filename_short': 'contracts/vulnerable.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'starting_column': 1, 'ending_column': 2}}, 'signature': 'withdraw()'}}}}]


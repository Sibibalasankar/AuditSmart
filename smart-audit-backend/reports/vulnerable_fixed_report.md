# Audit Report

## Original Code

```solidity
// contracts/vulnerable.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReentrancyExample {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        balances[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
    }
}
```

## Detected Vulnerabilities

### solc-version

- **Description:** Version constraint ^0.8.19 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- VerbatimInvalidDeduplication
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess.
It is used by:
	- ^0.8.19 (contracts/vulnerable_fixed.sol#3)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** [{'type': 'pragma', 'name': '^0.8.19', 'source_mapping': {'start': 62, 'length': 24, 'filename_relative': 'contracts/vulnerable_fixed.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable_fixed.sol', 'filename_short': 'contracts/vulnerable_fixed.sol', 'is_dependency': False, 'lines': [3], 'starting_column': 1, 'ending_column': 25}, 'type_specific_fields': {'directive': ['solidity', '^', '0.8', '.19']}}]


### low-level-calls

- **Description:** Low level call in ReentrancyExample.withdraw() (contracts/vulnerable_fixed.sol#12-18):
	- (sent,None) = msg.sender.call{value: bal}() (contracts/vulnerable_fixed.sol#16)

- **Impact:** Informational
- **Confidence:** High
- **Source Mapping:** [{'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 267, 'length': 245, 'filename_relative': 'contracts/vulnerable_fixed.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable_fixed.sol', 'filename_short': 'contracts/vulnerable_fixed.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 90, 'length': 425, 'filename_relative': 'contracts/vulnerable_fixed.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable_fixed.sol', 'filename_short': 'contracts/vulnerable_fixed.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 1, 'ending_column': 0}}, 'signature': 'withdraw()'}}, {'type': 'node', 'name': '(sent,None) = msg.sender.call{value: bal}()', 'source_mapping': {'start': 409, 'length': 47, 'filename_relative': 'contracts/vulnerable_fixed.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable_fixed.sol', 'filename_short': 'contracts/vulnerable_fixed.sol', 'is_dependency': False, 'lines': [16], 'starting_column': 9, 'ending_column': 56}, 'type_specific_fields': {'parent': {'type': 'function', 'name': 'withdraw', 'source_mapping': {'start': 267, 'length': 245, 'filename_relative': 'contracts/vulnerable_fixed.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable_fixed.sol', 'filename_short': 'contracts/vulnerable_fixed.sol', 'is_dependency': False, 'lines': [12, 13, 14, 15, 16, 17, 18], 'starting_column': 5, 'ending_column': 6}, 'type_specific_fields': {'parent': {'type': 'contract', 'name': 'ReentrancyExample', 'source_mapping': {'start': 90, 'length': 425, 'filename_relative': 'contracts/vulnerable_fixed.sol', 'filename_absolute': 'D:/AuditSmart/smart-audit-backend/contracts/vulnerable_fixed.sol', 'filename_short': 'contracts/vulnerable_fixed.sol', 'is_dependency': False, 'lines': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 'starting_column': 1, 'ending_column': 0}}, 'signature': 'withdraw()'}}}}]


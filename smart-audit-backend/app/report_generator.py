from app.llm_rewriter import (
    get_security_summary,
    get_optimization_suggestions,
    get_best_practice_checklist
)

def generate_report(original_code: str, vulnerabilities: list, fixed_code: str = None) -> str:
    report_parts = [
        "# Audit Report\n",
        "## Original Code\n",
        "```solidity",
        original_code,
        "```\n",
        "## Detected Vulnerabilities\n"
    ]

    if not vulnerabilities:
        report_parts.append("No vulnerabilities found.\n")

        # Add enhanced output for clean contract
        report_parts.append("\n## Security Summary\n")
        report_parts.append(get_security_summary(original_code))

        report_parts.append("\n## Optimization Suggestions\n")
        report_parts.append(get_optimization_suggestions(original_code))

        report_parts.append("\n## Security Best Practices Checklist\n")
        report_parts.append(get_best_practice_checklist(original_code))

    else:
        for v in vulnerabilities:
            report_parts.append(f"""### {v.get('vulnerability', 'Unknown')}

- **Description:** {v.get('description', 'N/A')}
- **Impact:** {v.get('impact', 'N/A')}
- **Confidence:** {v.get('confidence', 'N/A')}
- **Source Mapping:** {v.get('source_mapping', 'N/A')}

""")

        if fixed_code:
            report_parts.append("## Rewritten Contract\n")
            report_parts.append("```solidity")
            report_parts.append(fixed_code)
            report_parts.append("```")

    return "\n".join(report_parts)

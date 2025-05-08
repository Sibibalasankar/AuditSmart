import subprocess
import json
import os
import re

def extract_solidity_version(contract_path: str) -> str:
    with open(contract_path, "r") as file:
        for line in file:
            if "pragma solidity" in line:
                match = re.search(r"pragma solidity\s+[\^>=<]*\s*([\d.]+);", line)
                if match:
                    return match.group(1)
    return None

def switch_solc_version(version: str):
    try:
        subprocess.run(["solc-select", "use", version], check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        return f"❌ solc-select failed: {e.stderr.strip()}"
    return None

def run_slither(contract_path: str):
    output_file = "output.json"

    # Delete old report
    if os.path.exists(output_file):
        os.remove(output_file)

    # Step 1: Detect and switch compiler version
    version = extract_solidity_version(contract_path)
    if version:
        switch_error = switch_solc_version(version)
        if switch_error:
            return {"error": "Failed to switch Solidity version", "details": switch_error}
    else:
        return {"error": "Could not detect Solidity version from pragma"}

    try:
        result = subprocess.run(
            ["slither", contract_path, "--json", output_file],
            capture_output=True,
            text=True
        )

        # Check if output.json was created
        if os.path.exists(output_file):
            with open(output_file, "r") as f:
                data = json.load(f)

            raw_issues = data.get("results", {}).get("detectors", [])
            parsed_issues = []
            for issue in raw_issues:
                parsed_issues.append({
                    "vulnerability": issue.get("check"),
                    "description": issue.get("description"),
                    "impact": issue.get("impact"),
                    "confidence": issue.get("confidence"),
                    "severity": issue.get("impact", "Medium"),
                    "recommendation": issue.get("recommendation", ""),
                    "line": issue.get("elements", [{}])[0].get("source_mapping", {}).get("lines", [None])[0],
                    "contract": issue.get("elements", [{}])[0].get("contract", "Unknown"),
                })

            return parsed_issues
        else:
            return {"error": "Slither did not generate output.json", "details": result.stderr}

    except Exception as e:
        return {"error": "Exception occurred", "details": str(e)}

import subprocess
import json
import os

def run_slither(contract_path: str):
    output_file = "output.json"

    # Delete old report
    if os.path.exists(output_file):
        os.remove(output_file)

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
                    "source_mapping": issue.get("elements", [])
                })

            return parsed_issues

        else:
            return {"error": "Slither did not generate output.json", "details": result.stderr}

    except Exception as e:
        return {"error": "Exception occurred", "details": str(e)}

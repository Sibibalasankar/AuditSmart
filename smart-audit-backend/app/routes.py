from fastapi import APIRouter, UploadFile, File
from app.utils import save_uploaded_file
from app.slither_runner import run_slither
from app.report_generator import generate_report
from app.llm_rewriter import generate_fixed_contract

import os

router = APIRouter()

@router.post("/audit/")
async def audit_contract(file: UploadFile = File(...)):
    print("🔍 Saving file...")
    contract_path = await save_uploaded_file(file, "contracts")

    print("📖 Reading original code...")
    with open(contract_path, "r", encoding="utf-8") as f:
        original_code = f.read()

    print("🛠 Running Slither...")
    slither_results = run_slither(contract_path)
    print("✅ Slither done.")

    if isinstance(slither_results, dict) and "error" in slither_results:
        print("❌ Slither error:", slither_results)
        return slither_results

    vulnerabilities = slither_results  # already a list
    fixed_code = None

    if vulnerabilities:
        print("🤖 Vulnerabilities found. Sending to Gemini/OpenAI...")
        fixed_code = generate_fixed_contract(original_code, slither_results)
        print("✅ Got fixed code.")

        # ✅ Save fixed code to a .sol file
        fixed_filename = f"{os.path.splitext(file.filename)[0]}_fixed.sol"
        fixed_path = os.path.join("contracts", fixed_filename)
        with open(fixed_path, "w", encoding="utf-8") as f:
            f.write(fixed_code)
        print("✅ Fixed contract saved at:", fixed_path)
    else:
        print("✅ No vulnerabilities found. Skipping code rewrite.")

    print("📝 Generating report...")
    report = generate_report(original_code, vulnerabilities, fixed_code)

    report_path = os.path.join("reports", f"{os.path.splitext(file.filename)[0]}_report.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report)
    print("✅ Report saved.")

    return {
        "original_filename": file.filename,
        "vulnerabilities": vulnerabilities,
        "fixed_code": fixed_code,
        "fixed_contract_path": fixed_path if fixed_code else None,
        "report_path": report_path
    }

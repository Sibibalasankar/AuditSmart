import os
from openai import APIConnectionError
from app.gemini_client import genai, model_name

def generate_fixed_contract(original_code: str, slither_output: dict) -> str:
    try:
        # Create a natural prompt from Slither output
        prompt = f"""You are a smart contract security expert.
Below is a Solidity smart contract and a list of security issues found by a static analyzer (Slither).
Fix the issues mentioned and return only the updated Solidity contract.

--- Solidity Contract ---
{original_code}

--- Issues Found ---
{slither_output}

Only output the corrected Solidity code.
"""

        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        print("❌ Gemini Error:", e)
        return "// Error generating fixed code"

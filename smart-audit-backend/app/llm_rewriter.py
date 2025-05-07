import logging
from app.gemini_client import genai, model_name
from google.api_core.exceptions import ResourceExhausted  # for 429 errors

def extract_retry_delay(e):
    try:
        details = e.response.json()
        return details.get("retry_delay", {}).get("seconds", 30)
    except Exception:
        return 30  # default fallback


def generate_fixed_contract(original_code: str, slither_output: dict) -> str:
    prompt = f"""You are a smart contract security expert.
Below is a Solidity smart contract and a list of security issues found by a static analyzer (Slither).
Fix the issues mentioned and return only the updated Solidity contract.

--- Solidity Contract ---
{original_code}

--- Issues Found ---
{slither_output}

Only output the corrected Solidity code.
"""
    try:
        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return response.text.strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.error(f"❌ Gemini quota limit hit. Retry after {delay} seconds.")
        return f"// Gemini quota exceeded. Retry after ~{delay} seconds."
    except Exception as e:
        logging.exception("❌ Unexpected error during contract fixing.")
        return "// Error generating fixed code"


def get_security_summary(original_code: str) -> str:
    prompt = f"""You are a smart contract auditor.
Below is a Solidity smart contract that has passed a static analysis scan with no detected vulnerabilities.
Write a short security summary confirming this and highlighting good practices found in the code.

--- Solidity Contract ---
{original_code}

Respond with a short summary paragraph.
"""
    try:
        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return response.text.strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.error(f"❌ Gemini quota limit hit. Retry after {delay} seconds.")
        return f"Security summary unavailable due to rate limit. Try again in ~{delay}s."
    except Exception as e:
        logging.exception("❌ Gemini Summary Error.")
        return "Could not generate summary."


def get_optimization_suggestions(original_code: str) -> str:
    prompt = f"""You are a smart contract developer.
Below is a Solidity contract. There are no security vulnerabilities, but we want to optimize it.
Suggest improvements for gas efficiency, readability, or maintainability.

--- Solidity Contract ---
{original_code}

Respond with a list of suggestions.
"""
    try:
        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return response.text.strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.error(f"❌ Gemini quota limit hit. Retry after {delay} seconds.")
        return f"Optimization suggestions unavailable due to rate limit. Try again in ~{delay}s."
    except Exception as e:
        logging.exception("❌ Gemini Optimization Error.")
        return "No optimization suggestions available."


def get_best_practice_checklist(original_code: str) -> str:
    prompt = f"""You are an expert smart contract auditor.
Below is a Solidity contract. Please evaluate it against common security best practices (e.g., proper access control, use of reentrancy guard, safe math, etc.).
Return a checklist and mark items as ✅ (followed) or ❌ (missing).

--- Solidity Contract ---
{original_code}

Respond with a checklist.
"""
    try:
        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return response.text.strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.error(f"❌ Gemini quota limit hit. Retry after {delay} seconds.")
        return f"Best practice checklist unavailable due to rate limit. Try again in ~{delay}s."
    except Exception as e:
        logging.exception("❌ Gemini Checklist Error.")
        return "Best practice checklist could not be generated."
    
# This will works
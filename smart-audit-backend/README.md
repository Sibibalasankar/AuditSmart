uvicorn app.main:app --reload

This is the commend to run backend 


open ai integration import logging
from app.gemini_client import genai, model_name
from app.openai_client import get_openai_completion
from google.api_core.exceptions import ResourceExhausted  # Gemini 429
from openai import RateLimitError, APIError  # OpenAI errors


def extract_retry_delay(e):
    try:
        details = e.response.json()
        return details.get("retry_delay", {}).get("seconds", 30)
    except Exception:
        return 30  # default fallback


def safe_openai_fallback(prompt: str, fallback_text: str) -> str:
    try:
        return get_openai_completion(prompt)
    except RateLimitError:
        logging.error("❌ OpenAI quota exceeded. Returning fallback.")
        return fallback_text
    except APIError as e:
        logging.error(f"❌ OpenAI API error: {e}. Returning fallback.")
        return fallback_text
    except Exception as e:
        logging.exception("❌ Unexpected OpenAI error. Returning fallback.")
        return fallback_text


def generate_fixed_contract(original_code: str, slither_output: dict) -> str:
    prompt = f"""You are a smart contract security expert.
Below is a Solidity smart contract and a list of security issues found by a static analyzer (Slither).
Fix the issues mentioned and return only the updated Solidity contract.
Ensure that all reentrancy vulnerabilities are mitigated by updating state before making external calls.
Avoid unsafe low-level calls like .call() unless absolutely required.

--- Solidity Contract ---
{original_code}

--- Issues Found ---
{slither_output}

Only output the corrected Solidity code.
"""
    try:
        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return (response.text or "").strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.warning(f"❌ Gemini quota limit hit. Falling back to OpenAI. Retry after {delay} seconds.")
        return safe_openai_fallback(prompt, original_code)
    except Exception as e:
        logging.exception("❌ Gemini error. Falling back to OpenAI.")
        return safe_openai_fallback(prompt, original_code)


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
        return (response.text or "").strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.warning(f"❌ Gemini quota limit hit. Falling back to OpenAI. Retry after {delay} seconds.")
        return safe_openai_fallback(prompt, "No summary available.")
    except Exception as e:
        logging.exception("❌ Gemini error. Falling back to OpenAI.")
        return safe_openai_fallback(prompt, "No summary available.")


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
        return (response.text or "").strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.warning(f"❌ Gemini quota limit hit. Falling back to OpenAI. Retry after {delay} seconds.")
        return safe_openai_fallback(prompt, "No suggestions available.")
    except Exception as e:
        logging.exception("❌ Gemini error. Falling back to OpenAI.")
        return safe_openai_fallback(prompt, "No suggestions available.")


def get_best_practice_checklist(original_code: str) -> str:
    prompt = f"""You are a smart contract security expert and Solidity developer.
Below is a Solidity contract and a list of issues reported by the Slither static analysis tool.

Your task:
- Fix all vulnerabilities and bad practices reported.
- Apply best practices such as:
  - Checks-Effects-Interactions pattern to prevent reentrancy.
  - Avoid unsafe low-level calls like `.call()` unless absolutely necessary.
  - Validate input parameters and use `require()` appropriately.
  - Use `transfer()` or `send()` where safer and feasible.
  - Ensure safe initialization and access control for storage variables.
  - Use latest safe Solidity versions and avoid known-buggy compiler ranges.
- Optimize for readability, gas efficiency, and security.

Do not explain your changes. Output only the complete corrected Solidity code.

--- Solidity Contract ---
{original_code}

--- Issues Found by Slither ---
{slither_output}

Return only the corrected Solidity contract.
"""

    try:
        response = genai.GenerativeModel(model_name).generate_content(prompt)
        return (response.text or "").strip()
    except ResourceExhausted as e:
        delay = extract_retry_delay(e)
        logging.warning(f"❌ Gemini quota limit hit. Falling back to OpenAI. Retry after {delay} seconds.")
        return safe_openai_fallback(prompt, "No checklist available.")
    except Exception as e:
        logging.exception("❌ Gemini error. Falling back to OpenAI.")
        return safe_openai_fallback(prompt, "No checklist available.")

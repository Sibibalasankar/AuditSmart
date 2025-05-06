import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="AIzaSyDhYN2vBbkyD6lxrZZuUoFpsFXVge1cvUc")

try:
    model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
    response = model.generate_content("Say hello in Solidity")
    print("✅ Success! Gemini Pro responded with:\n")
    print(response.text)
except Exception as e:
    print("❌ Error occurred:")
    print(e)

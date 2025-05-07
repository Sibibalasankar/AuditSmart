import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure the API key from your .env file
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Pick your preferred Gemini model (from your earlier list)
model_name = "gemini-1.5-pro-latest"
import os
from openai import OpenAI

# Make sure the environment variable is set
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise EnvironmentError("OPENAI_API_KEY is not set in environment variables.")

# Initialize client with env var key
client = OpenAI(api_key=api_key)

# List available models
models = client.models.list()

# Print all model IDs
print("✅ Available models for your API key:")
for model in models.data:
    print(f"- {model.id}")

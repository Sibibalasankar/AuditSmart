import os
from openai import OpenAI

# Initialize the client with your API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
openai_model = "gpt-4o"  # Instead of "gpt-4"


def get_openai_completion(prompt: str) -> str:
    response = client.chat.completions.create(
        model=openai_model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    return response.choices[0].message.content.strip()

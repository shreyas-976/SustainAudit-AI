import requests
import json
from config import OPENROUTER_API_KEY   

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def extract_claims(text: str):

    prompt = f"""
    Extract sustainability claims from the text below.

    Categorize into JSON format:

    {{
      "material_claims": [],
      "carbon_claims": [],
      "certifications": [],
      "ethical_claims": [],
      "packaging_claims": []
    }}

    Only return valid JSON.

    Text:
    {text}
    """

    try:
        response = requests.post(
            url=OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 500
            })
        )

        result = response.json()

        # Debug print (optional but useful)
        print("\n=== OPENROUTER RESPONSE ===")
        print(result)
        print("===========================\n")

        # Check API success
        if "choices" not in result:
            return json.dumps({
                "error": "OpenRouter API failed",
                "details": result
            })

        # Extract model output
        content = result["choices"][0]["message"]["content"]

        # Clean markdown formatting if present
        content = content.strip()

        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        return content

    except Exception as e:
        return json.dumps({
            "error": "Claim extraction failed",
            "details": str(e)
        })
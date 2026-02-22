import requests
import json
from config import OPENROUTER_API_KEY

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_verification_plan(claims: dict):

    prompt = f"""
You are an AI sustainability auditor.

Based on the sustainability claims below, create a verification plan.

For each claim category, define:
- What needs verification
- Which data source to check
- Risk indicators to investigate

Return JSON only in this format:

{{
  "verification_tasks": [
    {{
      "task": "",
      "method": "",
      "data_source": ""
    }}
  ]
}}

If there are no claims, return:

{{
  "verification_tasks": []
}}

Claims:
{json.dumps(claims, indent=2)}
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

        if "choices" not in result:
            return {
                "verification_tasks": [],
                "error": "Planner failed",
                "details": result
            }

        content = result["choices"][0]["message"]["content"].strip()

        # --------------------------
        # Clean Markdown Formatting
        # --------------------------
        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        # --------------------------
        # Safe JSON Parsing
        # --------------------------
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {
                "verification_tasks": [],
                "raw_plan": content
            }

    except Exception as e:
        return {
            "verification_tasks": [],
            "error": str(e)
        }
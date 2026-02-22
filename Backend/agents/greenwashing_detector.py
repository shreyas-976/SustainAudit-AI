import requests
import json
from config import OPENROUTER_API_KEY

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def detect_greenwashing(claims: dict):

    prompt = f"""
You are a sustainability compliance auditor.

Analyze the sustainability claims below and detect potential greenwashing signals.

Look for:

- Vague environmental language
- Lack of measurable data
- No certifications referenced
- Overstated environmental impact
- Marketing exaggeration

Return JSON only:

{{
  "greenwashing_flags": [],
  "risk_level": "",
  "penalty_score": 0
}}

IMPORTANT:
Penalty score must be between 0 and 0.5 (float).

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
                "max_tokens": 300
            })
        )

        result = response.json()

        if "choices" not in result:
            return {
                "greenwashing_flags": [],
                "risk_level": "Unknown",
                "penalty_score": 0
            }

        content = result["choices"][0]["message"]["content"].strip()

        # --------------------------
        # Clean Markdown Formatting
        # --------------------------
        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        parsed = json.loads(content)

        # --------------------------
        # Normalize Penalty Score
        # --------------------------
        raw_penalty = parsed.get("penalty_score", 0)

        # If model returns 0–10 scale → convert
        if raw_penalty > 1:
            normalized_penalty = min(raw_penalty / 20, 0.5)
        else:
            normalized_penalty = raw_penalty

        parsed["penalty_score"] = normalized_penalty

        return parsed

    except Exception as e:
        return {
            "greenwashing_flags": [],
            "risk_level": "Error",
            "penalty_score": 0
        }
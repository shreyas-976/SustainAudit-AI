import json
import re
from pathlib import Path
from difflib import get_close_matches

# -----------------------------
# Load certification seed database (list format)
# -----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
seed_path = BASE_DIR / "database" / "certification_seed.json"

with open(seed_path, "r") as f:
    CERT_DB_LIST = json.load(f)

# Convert list → dictionary using cert_name as key
CERT_DB = {cert["cert_name"]: cert for cert in CERT_DB_LIST}

# Create list of certification names for fuzzy matching
CERT_NAMES = list(CERT_DB.keys())


# -----------------------------
# Regex Detection (Text-based)
# -----------------------------
def regex_detect_certifications(text: str):
    detected = []

    patterns = {
        "B Corp": r"\bB[\s-]?Corp(?:oration)?\b",
        "FSC": r"\bFSC\b",
        "GOTS": r"\bGOTS\b",
        "ISO 14001": r"\bISO[\s-]?14001\b",
        "CarbonNeutral": r"\bCarbon\s?Neutral\b"
    }

    for cert, pattern in patterns.items():
        if re.search(pattern, text, re.IGNORECASE):
            detected.append(cert)

    return detected


# -----------------------------
# Hybrid Certification Validation
# -----------------------------
def validate_certifications(extracted_certs: list, text_content: str = ""):

    results = []

    # Combine LLM-extracted + regex-detected
    regex_certs = regex_detect_certifications(text_content)
    all_certs = list(set(extracted_certs + regex_certs))

    for cert in all_certs:

        # Fuzzy match against database names
        match = get_close_matches(cert, CERT_NAMES, n=1, cutoff=0.6)

        if match:
            matched_name = match[0]
            db_cert = CERT_DB[matched_name]

            results.append({
                "name": cert,
                "matched_with": matched_name,
                "full_name": db_cert.get("full_name"),
                "authority_type": db_cert.get("authority_type"),
                "credibility_level": db_cert.get("credibility_level"),
                "status": "recognized",
                "authority_weight": db_cert.get("authority_weight", 0)
            })

        else:
            results.append({
                "name": cert,
                "status": "unverified",
                "authority_weight": 0
            })

    return results
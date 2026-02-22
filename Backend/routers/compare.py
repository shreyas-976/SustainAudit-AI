from fastapi import APIRouter
from services.scraper import scrape_website
from agents.claim_extractor import extract_claims
from services.certification_validator import validate_certifications
from agents.greenwashing_detector import detect_greenwashing
from services.evidence_search import search_evidence
from services.scoring_engine import calculate_score
import json

router = APIRouter()


def run_single_audit(url: str):

    scrape_result = scrape_website(url)
    text_content = scrape_result.get("content", "")[:2000]

    claims_raw = extract_claims(text_content)

    try:
        claims = json.loads(claims_raw)
    except:
        claims = {
            "material_claims": [],
            "carbon_claims": [],
            "certifications": [],
            "ethical_claims": [],
            "packaging_claims": []
        }

    certification_results = validate_certifications(
        claims.get("certifications", []),
        text_content
    )

    greenwashing_result = detect_greenwashing(claims)

    evidence_items = search_evidence(claims).get("evidence_items", [])

    score_data = calculate_score(
        claims,
        certification_results,
        greenwashing_result.get("penalty_score", 0),
        evidence_items
    )

    return score_data


@router.post("/")
async def compare_products(data: dict):

    url_1 = data.get("product_1_url")
    url_2 = data.get("product_2_url")

    score_1 = run_single_audit(url_1)
    score_2 = run_single_audit(url_2)

    winner = (
        "Product 1" if score_1["score"] > score_2["score"]
        else "Product 2"
    )

    return {
        "product_1_score": score_1["score"],
        "product_2_score": score_2["score"],
        "winner": winner
    }
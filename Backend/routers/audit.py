
from fastapi import APIRouter
import json

# Services & Agents
from services.scraper import scrape_website
from agents.claim_extractor import extract_claims
from agents.planner_agent import generate_verification_plan
from services.certification_validator import validate_certifications
from services.scoring_engine import calculate_score
from agents.greenwashing_detector import detect_greenwashing
from services.evidence_search import search_evidence
from agents.confidence_agent import compute_confidence
from services.controversy_detector import detect_controversies
from services.watchlist_service import add_or_update_watchlist

router = APIRouter()


@router.post("")
async def run_audit(data: dict):

    # =============================
    # DEBUG — Incoming Request
    # =============================
    print("\n=== INCOMING REQUEST DATA ===")
    print(data)
    print("URL RECEIVED:", data.get("product_url"))
    print("================================\n")

    url = data.get("product_url")
    # -----------------------------
    # Input Validation
    # -----------------------------
    if not url:
        return {
            "error": "No product URL provided",
            "score": 0,
            "confidence": 0,
            "verdict": "Invalid Input"
        }

    # -----------------------------
    # Step 1 — Scrape Website
    # -----------------------------
    scrape_result = scrape_website(url)

    if scrape_result.get("status") == "error":
        return {
            "error": "Failed to retrieve website content",
            "score": 0,
            "confidence": 10,
            "verdict": "Insufficient Data"
        }

    text_content = scrape_result.get("content", "")[:2000]

    # -----------------------------
    # Step 2 — Claim Extraction
    # -----------------------------
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

    # -----------------------------
    # Step 3 — Verification Planning
    # -----------------------------
    verification_plan = generate_verification_plan(claims)

    # -----------------------------
    # Step 4 — Certification Validation
    # -----------------------------
    certification_results = validate_certifications(
        claims.get("certifications", []),
        text_content
    )

    # -----------------------------
    # Step 5 — Greenwashing Detection
    # -----------------------------
    greenwashing_result = detect_greenwashing(claims)

    # -----------------------------
    # Step 6 — Evidence Retrieval
    # -----------------------------
    evidence_items = search_evidence(claims).get("evidence_items", [])

    # -----------------------------
    # Step 7 — Controversy Detection
    # -----------------------------
    controversy_result = detect_controversies(text_content)

    # -----------------------------
    # Step 8 — Merge Penalties
    # -----------------------------
    total_penalty = (
        greenwashing_result.get("penalty_score", 0) +
        controversy_result.get("penalty_score", 0)
    )

    # -----------------------------
    # Step 9 — Scoring
    # -----------------------------
    score_data = calculate_score(
        claims,
        certification_results,
        total_penalty,
        evidence_items
    )

    # -----------------------------
    # Step 10 — Confidence
    # -----------------------------
    confidence_data = compute_confidence(
        claims,
        evidence_items,
        certification_results,
        scrape_result.get("status", "error")
    )

    # -----------------------------
    # Step 11 — Auto Watchlist Add
    # -----------------------------
    try:
        brand_name = url.split("//")[-1].split("/")[0]

        watchlist_result = add_or_update_watchlist(
            url=url,
            brand_name=brand_name,
            score=score_data["score"]
        )

    except Exception as e:
        print("WATCHLIST ERROR:", str(e))
        watchlist_result = {
            "status": "failed",
            "entry": {}
        }

    # -----------------------------
    # Final Response
    # -----------------------------
    return {
        "claims": claims,
        "verification_plan": verification_plan,
        "certifications": certification_results,
        "greenwashing": greenwashing_result,
        "controversies": controversy_result,
        "evidence": evidence_items,
        "score": score_data["score"],
        "confidence": confidence_data["confidence_score"],
        "confidence_factors": confidence_data["confidence_factors"],
        "verdict": score_data["verdict"],
        "breakdown": score_data["breakdown"],
        "watchlist_status": watchlist_result["status"],
        "watchlist_entry": watchlist_result["entry"]
    }
def compute_confidence(
    claims: dict,
    evidence_items: list,
    certifications: list,
    scrape_status: str
):
    """
    Computes confidence score separately from sustainability score.
    Confidence reflects completeness & reliability of evaluation.
    """

    total_claims = sum([
        len(claims.get("material_claims", [])),
        len(claims.get("carbon_claims", [])),
        len(claims.get("ethical_claims", [])),
        len(claims.get("packaging_claims", []))
    ])

    evidence_count = len(evidence_items)

    verified_certs = len([
        c for c in certifications
        if c.get("status") == "recognized"
    ])

    confidence = 40  # base confidence

    # More claims → more evaluation depth
    confidence += total_claims * 3

    # More verified certifications → higher trust
    confidence += verified_certs * 6

    # Evidence improves reliability
    confidence += evidence_count * 2

    # Scraper failure reduces confidence
    if scrape_status != "success":
        confidence -= 20

    confidence = max(min(confidence, 95), 10)

    return {
        "confidence_score": confidence,
        "confidence_factors": {
            "total_claims_detected": total_claims,
            "verified_certifications": verified_certs,
            "evidence_items_found": evidence_count,
            "scrape_status": scrape_status
        }
    }
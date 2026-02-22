def calculate_score(
    claims: dict,
    certifications: list,
    penalty_score: float,
    evidence_items: list
):

    # --------------------------
    # 1. Certification Score
    # --------------------------
    cert_score = 0

    for cert in certifications:
        if cert.get("status") == "recognized":
            cert_score += cert.get("authority_weight", 0)

    cert_score = min(cert_score, 1)


    # --------------------------
    # 2. Claim Strength Score
    # --------------------------
    total_claims = (
        len(claims.get("material_claims", [])) +
        len(claims.get("carbon_claims", [])) +
        len(claims.get("ethical_claims", [])) +
        len(claims.get("packaging_claims", []))
    )

    if total_claims >= 8:
        claim_score = 1
    elif total_claims >= 4:
        claim_score = 0.7
    elif total_claims > 0:
        claim_score = 0.4
    else:
        claim_score = 0


    # --------------------------
    # 3. Evidence Score
    # --------------------------
    evidence_score = 0

    for item in evidence_items:
        level = item.get("credibility_level", "").lower()

        if level == "high":
            evidence_score += 0.3
        elif level == "medium":
            evidence_score += 0.2
        elif level == "low":
            evidence_score += 0.1

    evidence_score = min(evidence_score, 1)


    # --------------------------
    # 4. Transparency Score
    # --------------------------
    transparency_score = 0.5


    # --------------------------
    # 5. Greenwashing Penalty
    # --------------------------
    penalty = min(max(penalty_score, 0), 0.5)


    # --------------------------
    # 6. Final Weighted Score
    # --------------------------
    final_score = (
        0.25 * cert_score +
        0.30 * claim_score +
        0.20 * evidence_score +
        0.15 * transparency_score -
        (penalty * 0.6)
    )

    final_score = max(min(final_score, 1), 0)
    score_percentage = round(final_score * 100, 2)


    # --------------------------
    # 7. Verdict Logic
    # --------------------------
    if score_percentage >= 75:
        verdict = "Highly Credible"
    elif score_percentage >= 50:
        verdict = "Moderately Credible"
    elif score_percentage >= 30:
        verdict = "Low Credibility"
    else:
        verdict = "High Greenwashing Risk"


    # --------------------------
    # 8. Confidence Score
    # --------------------------
    evidence_bonus = min(len(evidence_items) * 2, 10)
    confidence = min(50 + total_claims * 4 + evidence_bonus, 95)


    # --------------------------
    # 9. Score Breakdown
    # --------------------------
    breakdown = {
        "certification_score": round(cert_score * 100, 2),
        "claim_strength_score": round(claim_score * 100, 2),
        "evidence_score": round(evidence_score * 100, 2),
        "transparency_score": round(transparency_score * 100, 2),
        "greenwashing_penalty": round(penalty * 100, 2)
    }

    return {
    "score": score_percentage,
    "verdict": verdict,
    "breakdown": breakdown
}
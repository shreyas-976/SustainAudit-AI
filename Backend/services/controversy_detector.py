def detect_controversies(brand_text: str):
    """
    Detects sustainability controversies, lawsuits,
    NGO criticism, or environmental violations.
    """

    controversy_flags = []

    keywords = [
        "lawsuit",
        "greenwashing scandal",
        "environmental violation",
        "pollution fine",
        "supply chain abuse",
        "forced labor",
        "carbon fraud",
        "NGO criticism",
        "deforestation link"
    ]

    for word in keywords:
        if word in brand_text.lower():
            controversy_flags.append(word)

    # -----------------------------
    # Risk Level Logic
    # -----------------------------
    if len(controversy_flags) >= 3:
        risk_level = "High"
    elif len(controversy_flags) > 0:
        risk_level = "Moderate"
    else:
        risk_level = "Low"

    # -----------------------------
    # Penalty Calculation
    # -----------------------------
    penalty = min(len(controversy_flags) * 0.08, 0.30)

    return {
        "controversy_flags": controversy_flags,
        "risk_level": risk_level,
        "penalty_score": penalty
    }
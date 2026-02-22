def search_evidence(claims: dict):

    evidence_items = []

    for claim_type, items in claims.items():

        for claim in items:

            if "carbon" in claim.lower():
                evidence_items.append({
                    "claim": claim,
                    "source": "Sustainability Report",
                    "credibility_level": "medium"
                })

            elif "recycled" in claim.lower():
                evidence_items.append({
                    "claim": claim,
                    "source": "Material Disclosure Sheet",
                    "credibility_level": "high"
                })

            else:
                evidence_items.append({
                    "claim": claim,
                    "source": "Website Statement",
                    "credibility_level": "low"
                })

    return {
        "evidence_items": evidence_items
    }
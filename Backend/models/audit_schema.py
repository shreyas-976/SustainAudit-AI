from pydantic import BaseModel

class AuditRequest(BaseModel):
    product_url: str


class AuditResponse(BaseModel):
    score: float
    confidence: float
    verdict: str
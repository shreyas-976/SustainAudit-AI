from pydantic import BaseModel

class CompareRequest(BaseModel):
    product_1_url: str
    product_2_url: str
from pydantic import BaseModel

class WatchlistAdd(BaseModel):
    brand_name: str
    url: str
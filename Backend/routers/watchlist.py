from fastapi import APIRouter
from services.watchlist_service import (
    add_or_update_watchlist,
    load_watchlist
)

router = APIRouter()


@router.post("/add")
async def add_brand(data: dict):

    brand = data.get("brand_name")
    url = data.get("url")
    score = data.get("score", 0)

    entry = add_to_watchlist(brand, url, score)

    return {
        "message": "Brand added",
        "entry": entry
    }


@router.get("/list")
async def list_watchlist():

    return {
        "watchlist": load_watchlist()
    }
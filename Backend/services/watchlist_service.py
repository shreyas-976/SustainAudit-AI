import json
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent.parent
WATCHLIST_PATH = BASE_DIR / "database" / "watchlist.json"


def load_watchlist():
    if not WATCHLIST_PATH.exists():
        return []

    try:
        with open(WATCHLIST_PATH, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        # If file corrupted, reset safely
        return []


def save_watchlist(data):
    with open(WATCHLIST_PATH, "w") as f:
        json.dump(data, f, indent=2)


def add_or_update_watchlist(url: str, brand_name: str, score: float):

    watchlist = load_watchlist()
    now = datetime.utcnow().isoformat()

    # Update existing
    for entry in watchlist:
        if entry.get("url") == url:
            entry["last_score"] = score
            entry["last_checked"] = now
            save_watchlist(watchlist)

            return {
                "status": "updated",
                "entry": entry
            }

    # Add new entry
    new_entry = {
        "brand_name": brand_name,
        "url": url,
        "last_score": score,
        "last_checked": now
    }

    watchlist.append(new_entry)
    save_watchlist(watchlist)

    return {
        "status": "added",
        "entry": new_entry
    }
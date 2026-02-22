import requests
from bs4 import BeautifulSoup


def scrape_website(url: str) -> dict:
    """
    Scrapes visible website text content.
    Returns structured response for audit pipeline.
    """

    try:
        headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
    "Connection": "keep-alive"
}

        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )

        # -----------------------------
        # HTTP Status Guard
        # -----------------------------
        if response.status_code != 200:
            return {
                "status": "error",
                "message": f"HTTP {response.status_code}"
            }

        # -----------------------------
        # Parse HTML
        # -----------------------------
        soup = BeautifulSoup(response.text, "html.parser")

        # Remove non-visible elements
        for tag in soup(["script", "style", "noscript", "header", "footer"]):
            tag.decompose()

        # Extract text
        text = soup.get_text(separator=" ", strip=True)

        # -----------------------------
        # Encoding Cleanup
        # -----------------------------
        text = text.encode("utf-8", errors="ignore").decode("utf-8")

        # -----------------------------
        # Token Safety Limit
        # -----------------------------
        text = text[:5000]

        return {
            "status": "success",
            "content": text
        }

    except requests.exceptions.Timeout:
        return {
            "status": "error",
            "message": "Request timed out"
        }

    except requests.exceptions.ConnectionError:
        return {
            "status": "error",
            "message": "Connection failed"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
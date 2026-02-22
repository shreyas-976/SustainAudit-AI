import requests

def test_audit():

    url = "http://127.0.0.1:8000/audit/"

    payload = {
        "product_url": "https://example.com"
    }

    response = requests.post(url, json=payload)

    assert response.status_code == 200

    data = response.json()

    assert "score" in data
    assert "verdict" in data
import os
from dotenv import load_dotenv
from pathlib import Path

# Get backend folder path
BASE_DIR = Path(__file__).resolve().parent

# Load .env from backend folder
env_path = BASE_DIR / ".env"
load_dotenv(dotenv_path=env_path)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

print("Loaded API Key:", OPENROUTER_API_KEY)
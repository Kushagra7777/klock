import os
from qdrant_client import QdrantClient
from dotenv import load_dotenv

load_dotenv()

QDRANT_MODE = os.getenv("QDRANT_MODE", "local")
QDRANT_PATH = os.getenv("QDRANT_PATH", "backend/qdrant_data")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

def get_qdrant_client():
    if QDRANT_MODE == "local":
        print("📍 Using local Qdrant mode:", QDRANT_PATH)
        return QdrantClient(path=QDRANT_PATH)
    elif QDRANT_MODE == "remote":
        print("🌐 Using remote Qdrant:", QDRANT_URL)
        return QdrantClient(
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
        )
    else:
        raise ValueError("❌ Invalid QDRANT_MODE. Use 'local' or 'remote'")

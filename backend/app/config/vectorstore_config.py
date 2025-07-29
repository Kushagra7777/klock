import os
from qdrant_client import QdrantClient

QDRANT_MODE = os.getenv("QDRANT_MODE", "local")  # default to local
QDRANT_PATH = os.getenv("QDRANT_PATH", "backend/qdrant_data")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

def get_qdrant_client():
    return QdrantClient(path="./qdrant_data")

# scripts/init_qdrant.py

from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
import os

COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "user_documents")

client = QdrantClient(
    path="./qdrant_data"  
)
if not client.collection_exists(COLLECTION_NAME):
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    print(f"Created collection: {COLLECTION_NAME}")
else:
    print(f"Collection already exists: {COLLECTION_NAME}")

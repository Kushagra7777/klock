import os
import json
import uuid
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from dotenv import load_dotenv

# Load env vars
load_dotenv()

jsonl_path = "D:/AO/Infra/klock/backend/qdrant_data/collection/user_documents.jsonl"
collection_name = os.getenv("QDRANT_COLLECTION_NAME", "user_documents")
qdrant_path = os.getenv("QDRANT_PATH")
openai_api_key = os.getenv("OPENAI_API_KEY")

# Init clients
client = QdrantClient(path=qdrant_path)
openai = OpenAI(api_key=openai_api_key)

# Create collection if it doesn't exist
if not client.collection_exists(collection_name):
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(
            size=1536,
            distance=Distance.COSINE
        )
    )

# Upload documents
points = []
with open(jsonl_path, "r", encoding="utf-8") as f:
    for line in f:
        doc = json.loads(line)
        text = doc.get("text")
        user_id = doc.get("user_id", "global")  # default fallback

        if not text:
            continue  # skip empty lines

        # Embed
        embedding = openai.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        ).data[0].embedding

        # Add point
        points.append(PointStruct(
            id=str(uuid.uuid4()),
            vector=embedding,
            payload={"text": text, "user_id": user_id}
        ))

# Upload in batches if needed (optional: for large sets)
client.upsert(collection_name=collection_name, points=points)

print(f"✅ Uploaded {len(points)} chunks to Qdrant.")

import os
import json
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
import uuid

# Load env
from dotenv import load_dotenv
load_dotenv()

jsonl_path = "D:/AO/Infra/klock/backend/qdrant_data/collection/user_documents.jsonl"
collection_name = os.getenv("QDRANT_COLLECTION_NAME", "user_documents")

client = QdrantClient(path=os.getenv("QDRANT_PATH"))  # local mode
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Ensure collection exists
if not client.collection_exists(collection_name):
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )

# Upload documents
points = []
with open(jsonl_path, "r", encoding="utf-8") as f:
    for line in f:
        doc = json.loads(line)
        text = doc["text"]
        embedding = openai.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        ).data[0].embedding

        points.append(PointStruct(
            id=str(uuid.uuid4()),
            vector=embedding,
            payload={"text": doc["text"], "user_id": doc["user_id"]}
        ))

client.upsert(collection_name=collection_name, points=points)
print(f"✅ Uploaded {len(points)} chunks to Qdrant.")

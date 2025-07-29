from app.config.vectorstore_config import get_qdrant_client
from app.services.llm_service import call_openai
from app.models.chat import ChatMessage
from qdrant_client.models import Filter, FieldCondition, MatchValue
from typing import List
import os
from openai import OpenAI

OPENAI_EMBEDDING_MODEL = "text-embedding-3-small"
COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "user_documents")

# Limit characters
MAX_CONTEXT_CHARS = 3000

def generate_response(user_id: str, message: str, history: List[ChatMessage] = None) -> str:
    client = get_qdrant_client()

    # 1. Embed the query
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    embedding_response = openai_client.embeddings.create(
        input=message,
        model=OPENAI_EMBEDDING_MODEL
    )
    query_vector = embedding_response.data[0].embedding

    # 2. Try to search using user_id
    print(f"Searching Qdrant for user_id: {user_id}")
    search_result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=5,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="user_id",
                    match=MatchValue(value=user_id)
                )
            ]
        )
    )

    # 2b. If nothing found, retry without filter
    if not search_result:
        print("No user-specific docs found. Falling back to global search.")
        search_result = client.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_vector,
            limit=5
        )

    print(f"Found {len(search_result)} matching chunks.")
    if search_result:
        print("First chunk preview:", search_result[0].payload.get("text", "")[:100])

    # 3. Build context from retrieved documents
    context_chunks = [point.payload["text"] for point in search_result]
    context = "\n\n".join(context_chunks)

    # Truncate context if too long
    if len(context) > MAX_CONTEXT_CHARS:
        print(f"Context too long ({len(context)} chars), truncating to {MAX_CONTEXT_CHARS} chars.")
        context = context[:MAX_CONTEXT_CHARS]

    # 4. Construct system prompt with context
    system_prompt = (
        "You are a helpful assistant answering questions based on the provided documents. "
        "If the answer is not in the documents, say you don't know."
        f"\n\nDocuments:\n{context}"
    )

    # 5. Trim long history (optional)
    if history and len(history) > 10:
        history = history[-10:]

    # 6. Call LLM
    response_text = call_openai(system_prompt, message, history)

    return response_text

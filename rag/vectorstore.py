# from qdrant_client import QdrantClient
# from qdrant_client.models import Distance, VectorParams
# from langchain.vectorstores import Qdrant
# from langchain.embeddings.base import Embeddings
# from typing import List
# from backend.config import settings

# def get_qdrant_client():
#     return QdrantClient(
#         path=settings.QDRANT_PATH,
#         port=settings.QDRANT_PORT
#     )

# def create_collection(client: QdrantClient, collection_name: str, embeddings: Embeddings):
#     try:
#         # Get embedding size
#         if hasattr(embeddings, 'client'):
#             # For HuggingFace embeddings
#             vector_size = embeddings.client.get_sentence_embedding_dimension()
#         elif hasattr(embeddings, 'model'):
#             # For OpenAI embeddings
#             vector_size = 1536  # OpenAI embeddings are 1536 dimensions
#         else:
#             # Default fallback
#             vector_size = 384
            
#         client.create_collection(
#             collection_name=collection_name,
#             vectors_config=VectorParams(
#                 size=vector_size,
#                 distance=Distance.COSINE
#             )
#         )
#     except Exception:
#         # Collection already exists
#         pass

# def add_documents(documents: List, embeddings: Embeddings):
#     client = get_qdrant_client()
#     collection_name = "documents"
    
#     create_collection(client, collection_name, embeddings)
    
#     # Check LangChain version and use appropriate parameter
#     try:
#         # Newer versions use 'embedding'
#         qdrant = Qdrant(
#             client=client,
#             collection_name=collection_name,
#             embedding=embeddings
#         )
#     except TypeError:
#         # Older versions use 'embeddings'
#         qdrant = Qdrant(
#             client=client,
#             collection_name=collection_name,
#             embeddings=embeddings
#         )
    
#     qdrant.add_documents(documents)

# def get_vectorstore(embeddings: Embeddings):
#     client = get_qdrant_client()
#     collection_name = "documents"
    
#     create_collection(client, collection_name, embeddings)
    
#     # Check LangChain version and use appropriate parameter
#     try:
#         # Newer versions use 'embedding'
#         return Qdrant(
#             client=client,
#             collection_name=collection_name,
#             embedding=embeddings
#         )
#     except TypeError:
#         # Older versions use 'embeddings'
#         return Qdrant(
#             client=client,
#             collection_name=collection_name,
#             embeddings=embeddings
#         )
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from langchain_qdrant import Qdrant
from langchain_core.embeddings import Embeddings
from typing import List
from backend.config import settings

def get_qdrant_client():
    return QdrantClient(
        path=settings.QDRANT_PATH,
        port=settings.QDRANT_PORT
    )

def get_vector_size(embeddings: Embeddings) -> int:
    # Safe fallback for known embedding classes
    name = embeddings.__class__.__name__
    if name == "OpenAIEmbeddings":
        return 1536
    elif name == "HuggingFaceEmbeddings":
        return 384  # all-MiniLM-L6-v2 dimension
    return 384  # default fallback

def create_collection_if_not_exists(client: QdrantClient, collection_name: str, vector_size: int):
    existing_collections = [col.name for col in client.get_collections().collections]
    if collection_name not in existing_collections:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE
            )
        )

def add_documents(documents: List, embeddings: Embeddings):
    client = get_qdrant_client()
    collection_name = "documents"
    vector_size = get_vector_size(embeddings)

    create_collection_if_not_exists(client, collection_name, vector_size)

    qdrant = Qdrant(
        client=client,
        collection_name=collection_name,
        embeddings=embeddings
    )

    qdrant.add_documents(documents)

def get_vectorstore(embeddings: Embeddings):
    client = get_qdrant_client()
    collection_name = "documents"
    vector_size = get_vector_size(embeddings)

    create_collection_if_not_exists(client, collection_name, vector_size)

    return Qdrant(
        client=client,
        collection_name=collection_name,
        embeddings=embeddings
    )
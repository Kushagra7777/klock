
### backend/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    # Qdrant
    QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
    QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
    QDRANT_PATH = os.getenv("QDRANT_PATH", "./qdrant_storage")
    
    # Embeddings
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    HF_EMBEDDINGS_MODEL = os.getenv("HF_EMBEDDINGS_MODEL", "all-MiniLM-L6-v2")
    
    # Auth
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

settings = Settings()
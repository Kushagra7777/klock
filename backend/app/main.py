from fastapi import FastAPI
from dotenv import load_dotenv
from app.api import chat  # make sure app/api/chat.py exists and defines `router`

# Load environment variables from .env file
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Klock Backend",
    version="1.0",
    description="RAG + LLM API backend for chat assistant"
)

# Include chat routes
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

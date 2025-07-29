from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse
from app.services.rag_pipeline import generate_response

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    response_text = generate_response(
        user_id=request.user_id,
        message=request.message,
        history=request.history
    )
    return ChatResponse(response=response_text)
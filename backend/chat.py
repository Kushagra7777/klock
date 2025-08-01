from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from db.models import User
from db.schemas import User as UserSchema
from .auth import get_current_user
from rag.pipeline import get_answer

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/{user_id}")
async def chat(
    user_id: int,
    chat_message: ChatMessage,
    current_user: UserSchema = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify user owns this chat
    user = db.query(User).filter(User.id == user_id).first()
    if not user or user.id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Get answer from RAG pipeline
    answer = get_answer(chat_message.message, user_id)
    
    return ChatResponse(response=answer)
from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from db.models import Document
from db.schemas import User
from .auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])
templates = Jinja2Templates(directory="frontend/templates")

@router.get("/")
async def dashboard(request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    documents = db.query(Document).filter(Document.user_id == current_user.id).all()
    return templates.TemplateResponse("dashboard.html", {
        "request": request,
        "user": current_user,
        "documents": documents
    })
from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, Request
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import os
import uuid

from db.database import get_db
from db.models import Document as DocumentModel
from db.schemas import User as UserSchema
from .auth import get_current_user
from rag.loader import process_document

router = APIRouter(prefix="/upload", tags=["upload"])
templates = Jinja2Templates(directory="frontend/templates")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/")
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    current_user: UserSchema = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Save file
    file_extension = os.path.splitext(file.filename)[1]
    if file_extension not in [".pdf", ".docx", ".txt"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # Save to database
    db_document = DocumentModel(
        filename=file.filename,
        file_path=file_path,
        user_id=current_user.id
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    # Process document
    try:
        process_document(file_path, current_user.id)
    except Exception as e:
        db.delete(db_document)
        db.commit()
        os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")
    
    return {"filename": file.filename, "id": db_document.id}
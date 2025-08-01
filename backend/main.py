from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware

from .auth import router as auth_router, get_current_user
from .dashboard import router as dashboard_router
from .upload import router as upload_router
from .chat import router as chat_router
from db.database import engine, get_db
from db import models
from db.schemas import User

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Klock - Local RAG Chatbot")

# Add session middleware
app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Templates
templates = Jinja2Templates(directory="frontend/templates")

# Include routers
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
async def root(request: Request):
    return RedirectResponse(url="/auth/login")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
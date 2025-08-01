from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from .vectorstore import add_documents
from backend.config import settings
import os

def get_embeddings():
    if settings.OPENAI_API_KEY:
        return OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
    else:
        return HuggingFaceEmbeddings(model_name=settings.HF_EMBEDDINGS_MODEL)

def process_document(file_path: str, user_id: int):
    # Determine loader based on file extension
    _, ext = os.path.splitext(file_path)
    
    if ext == ".pdf":
        loader = PyPDFLoader(file_path)
    elif ext == ".docx":
        loader = Docx2txtLoader(file_path)
    elif ext == ".txt":
        loader = TextLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")
    
    # Load document
    documents = loader.load()
    
    # Split document
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    texts = text_splitter.split_documents(documents)
    
    # Add user_id to metadata
    for text in texts:
        text.metadata["user_id"] = str(user_id)
    
    # Get embeddings
    embeddings = get_embeddings()
    
    # Add to vector store
    add_documents(texts, embeddings)
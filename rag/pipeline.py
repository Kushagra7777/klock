from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from langchain_community.llms import HuggingFaceHub
from .vectorstore import get_vectorstore
from .loader import get_embeddings
from backend.config import settings

def get_answer(question: str, user_id: int) -> str:
    embeddings = get_embeddings()
    vectorstore = get_vectorstore(embeddings)
    
    # Create retriever with user filter
    retriever = vectorstore.as_retriever(
        search_kwargs={"filter": {"user_id": str(user_id)}}
    )
    
    # Choose LLM based on settings
    if settings.OPENAI_API_KEY:
        llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model="gpt-3.5-turbo"
        )
    else:
        llm = HuggingFaceHub(
            repo_id="google/flan-t5-large",
            model_kwargs={"temperature": 0.7, "max_length": 100}
        )
    
    # Create QA chain
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever
    )
    
    return qa.run(question)
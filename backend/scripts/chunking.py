import os
import json
from PyPDF2 import PdfReader
from docx import Document

# Input and output paths
input_folder = "D:/AO/Infra/klock/backend/uploads"
output_file = "D:/AO/Infra/klock/backend/qdrant_data/collection/user_documents.jsonl"

os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Function to extract text based on file type
def extract_text_from_file(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    try:
        if ext == ".pdf":
            reader = PdfReader(filepath)
            return "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
        elif ext == ".docx":
            doc = Document(filepath)
            return "\n".join([para.text for para in doc.paragraphs])
        elif ext == ".txt":
            with open(filepath, "r", encoding="utf-8") as f:
                return f.read()
    except Exception as e:
        print(f"Failed to extract {filepath}: {e}")
    return ""

# Split text into chunks
def chunk_text(text, max_words=200):
    words = text.split()
    return [" ".join(words[i:i + max_words]) for i in range(0, len(words), max_words)]

# Process files and write to JSONL
with open(output_file, "w", encoding="utf-8") as out_f:
    for filename in os.listdir(input_folder):
        filepath = os.path.join(input_folder, filename)
        if not os.path.isfile(filepath):
            continue

        print(f"Processing: {filename}")
        text = extract_text_from_file(filepath)

        if not text.strip():
            print(f"No text extracted from {filename}, skipping.")
            continue

        chunks = chunk_text(text)
        print(f"{len(chunks)} chunks extracted from {filename}")

        for i, chunk in enumerate(chunks):
            json.dump({
                "id": f"{filename}_{i}",
                "text": chunk,
                "user_id": "kushagra"
            }, out_f)
            out_f.write("\n")


from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader
from OpenAI import get_llm_answer
from store import * 
from model import chunk_text, build_prompt
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PINECONE_INDEX_NAME = 'rag-app'


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/add-documents")
async def add_documents(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
        
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        doc = PdfReader(temp_file_path)
        
        text = ""
        for page in doc.pages:
            text += page.extract_text()
        chunks = chunk_text(text)
        embed_chunks_and_upload_to_pinecone(chunks, PINECONE_INDEX_NAME)
        response_json = {
        "message": "Chunks embedded and stored successfully"
    }
        return {"message": "Documents added successfully","response": response_json}
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))



@app.delete("/delete-documents")
async def delete_documents(ids: list[str]):
    try:
        delete_index(PINECONE_INDEX_NAME)
        return JSONResponse({"message": f"Index {PINECONE_INDEX_NAME} deleted successfully"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat")
async def quick_response(msg: str):
    context_chunks = get_most_similar_chunks_for_query(msg, PINECONE_INDEX_NAME)
    prompt = build_prompt(msg, context_chunks)
    answer = get_llm_answer(prompt)
    return answer

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
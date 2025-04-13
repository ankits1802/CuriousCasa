from fastapi.responses import JSONResponse
from agent2_faq import get_answer
import shutil
import os
import uvicorn
from fastapi import FastAPI, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

agent_2_api = FastAPI()

agent_2_api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for all origins (not recommended for prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@agent_2_api.post("/faq/")
async def ask_faq(question: str = Form(...)):
    answer = get_answer(question)
    response = JSONResponse(content=answer)  # answer should be a dict: {"question": ..., "answer": ...}
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return answer

if __name__ == "__main__":
    uvicorn.run("agent_2_api:agent_2_api", host="127.0.0.1", port=8002, reload=True)
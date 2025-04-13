from agent_3 import diagnose_property_issue
import shutil
import os
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

agent_3_api = FastAPI()

agent_3_api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for all origins (not recommended for prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@agent_3_api.post("/diagnose/")
async def diagnose_issue(problem: str = Form(...)):
    print(f"Diagnosing issue: {problem}")  # Debug log
    result = diagnose_property_issue(problem)
    print(f"Diagnosis result: {result}")  # Debug log
    return result

if __name__ == "__main__":
    uvicorn.run("agent_3_api:agent_3_api", host="127.0.0.1", port=8003, reload=True)
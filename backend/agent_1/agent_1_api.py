from agent1 import run_image_analysis
import shutil
import os
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

agent_1_api = FastAPI()

agent_1_api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for all origins (not recommended for prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@agent_1_api.post("/analyze-image/")
async def analyze_image(file: UploadFile = File(...), prompt: str = Form(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = run_image_analysis(temp_path, prompt)
        return result
    finally:
        os.remove(temp_path)


if __name__ == "__main__":
    uvicorn.run("agent_1_api:agent_1_api", host="127.0.0.1", port=8001, reload=True)
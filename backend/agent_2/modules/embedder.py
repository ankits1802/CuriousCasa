import requests

EMBEDDING_API = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"
HF_TOKEN = "API_KEY"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

def embed_text(text: str):
    response = requests.post(EMBEDDING_API, headers=HEADERS, json={"inputs": text})
    if response.status_code == 200:
        return response.json()[0]
    else:
        raise RuntimeError(f"Embedding failed: {response.status_code} - {response.text}")

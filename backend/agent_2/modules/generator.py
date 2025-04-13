import requests

API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
HEADERS = {
    "Authorization": "Bearer API_KEY",
    "Content-Type": "application/json",
}

def generate_answer(question: str, context: str):
    prompt = f"[INST] You are a legal expert in tenancy law. Use the following context to answer the question:\n\n{context}\n\nQuestion: {question} [/INST]"
    
    payload = {
        "inputs": prompt,
        "parameters": {
            "temperature": 0.7,
            "top_p": 0.9,
            "max_new_tokens": 200,
            "return_full_text": False
        }
    }

    response = requests.post(API_URL, headers=HEADERS, json=payload)
    if response.status_code == 200:
        return response.json()[0]["generated_text"].strip()
    else:
        return f"Error: {response.status_code} - {response.text}"

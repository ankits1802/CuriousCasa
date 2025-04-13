import requests

API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
API_TOKEN = "API_KEY"

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

def diagnose_property_issue(user_problem: str) -> str:
    prompt = f"""[INST] 
You are an expert property issue diagnostician. The user describes a problem in natural language. 
1. Identify the likely cause.
2. Suggest a troubleshooting step.
3. If unclear, ask a clarifying follow-up question. 

Problem: {user_problem}
[/INST]"""

    payload = {
        "inputs": prompt,
        "parameters": {
            "temperature": 0.5,
            "top_p": 0.9,
            "max_new_tokens": 256,
            "return_full_text": False
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        return response.json()[0]["generated_text"].strip()
    else:
        return f"Error: {response.status_code} - {response.text}"
    
# if __name__ == "__main__":
#     # Example usage
#     user_problem = "My washing machine is making a strange noise."
#     diagnosis = diagnose_property_issue(user_problem)
#     print(diagnosis)  # For debugging purposes; remove in production

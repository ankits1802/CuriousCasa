import requests
import base64
from huggingface_hub import InferenceClient

IMG_API_KEY = 'API_KEY'
HUGGINGFACE_API_KEY = 'API_KEY'

# Uploads a local image file to ImgBB and returns a hosted URL
def upload_image_to_imgbb(image_path):
    try:
        with open(image_path, "rb") as img_file:
            img_data = {'image': base64.b64encode(img_file.read()).decode('utf-8')}

        response = requests.post(f"https://api.imgbb.com/1/upload?key={IMG_API_KEY}", data=img_data)

        if response.status_code == 200:
            return response.json()['data']['url']
        else:
            print("❌ Upload failed:", response.json())
            return None
    except Exception as e:
        print("❌ Exception while uploading:", str(e))
        return None

# Uses Qwen2.5-VL to analyze image based on user prompt
def analyze_image_with_qwen(image_url, user_prompt):
    client = InferenceClient(
        provider="hf-inference",
        api_key=HUGGINGFACE_API_KEY,
    )

    completion = client.chat.completions.create(
        model="Qwen/Qwen2.5-VL-7B-Instruct",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": user_prompt},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ],
        max_tokens=512,
    )

    return completion.choices[0].message.content

# Combines upload and analysis

def run_image_analysis(image_path, user_prompt):
    uploaded_image_url = upload_image_to_imgbb(image_path)
    if not uploaded_image_url:
        return {"error": "Image upload failed."}

    result = analyze_image_with_qwen(uploaded_image_url, user_prompt)
    return result

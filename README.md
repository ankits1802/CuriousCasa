# 🏡 CuriousCasa – Multi-Agent Real Estate Assistant

CuriousCasa is an AI-powered, multi-agent chatbot designed to streamline real estate support by intelligently routing user queries to specialized agents. It handles **property issue diagnosis**, **tenancy FAQs**, and **image-based troubleshooting**, creating a seamless experience for tenants and property managers.

---

## 🚀 Features

-   🤖 **Auto Agent Detection**: Smart classification based on text and image input
-   🛠️ **Issue Diagnosis Agent**: Detects problems (e.g. broken appliances, leaks) and offers troubleshooting suggestions
-   📷 **Image Analysis Agent**: Understands images using multimodal models for visual issue identification
-   📘 **Tenancy FAQ Agent**: Retrieves legal and practical information from tenancy knowledge base

---

## 🧐 Models Used

| Agent | Model | Purpose |
| --- | --- | --- |
| Image Analysis Agent | `Qwen/Qwen2.5-VL-7B-Instruct` (via HuggingFace) | Visual language model for image + text Q&A |
| FAQ Agent | Custom RAG pipeline with embedding + generation | Retrieval + generation from `tenancy_facts.json` |
| Diagnosis Agent | `mistralai/Mixtral-8x7B-Instruct-v0.1` (via HuggingFace) | Property issue understanding and advice |

---

## 🏗️ Project Structure

```
project-root/
├── backend/
│   ├── agent_1/                     # Image analysis agent (Qwen2.5-VL)
│   │   ├── agent1.py
│   │   └── agent_1_api.py
│   ├── agent_2/                     # FAQ agent (RAG pipeline)
│   │   ├── agent2_faq.py
│   │   ├── agent_2_api.py
│   │   ├── modules/
│   │   │   ├── embedder.py
│   │   │   ├── generator.py
│   │   │   └── retriever.py
│   │   └── data/
│   │       └── tenancy_facts.json
│   ├── agent_3/                     # Property diagnosis agent (Mixtral-8x7B)
│   │   ├── agent_3.py
│   │   └── agent_3_api.py
├── frontend/                        # React-based frontend UI
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── CameraButton.jsx
│       │   ├── ChatHistory.jsx
│       │   ├── DiagnoseAgent.jsx
│       │   ├── FaqAgent.jsx
│       │   ├── ImageAnalysisAgent.jsx
│       │   └── SendButton.jsx
│       ├── App.js
│       ├── App.css
│       ├── App.test.js
│       ├── index.js
│       ├── index.css
│       ├── reportWebVitals.js
│       ├── setupProxy.js
│       └── setupTests.js
```

---

## 💠 Local Setup

### 🔧 Prerequisites

-   Python 3.9+
-   Node.js (v18+ recommended)
-   HuggingFace API Keys (for image & text agents)
-   ImgBB API Key (for hosting image uploads)

### 📦 Install Dependencies

**Backend - Agent 1**
```bash
cd backend/agent_1
pip install fastapi uvicorn requests huggingface_hub
```

**Backend - Agent 2**
```bash
cd backend/agent_2
pip install fastapi uvicorn numpy
```

**Backend - Agent 3**
```bash
cd backend/agent_3
pip install fastapi uvicorn requests
```

**Frontend**
```bash
cd frontend
npm install
```

### ▶️ Run the Project

Open the project in VS Code. Open 4 terminals ``Ctrl + ` ``, and in each terminal run the following commands:

**Terminal 1**
```bash
cd backend/agent_1
python agent_1_api.py
```

**Terminal 2**
```bash
cd backend/agent_2
python agent_2_api.py
```

**Terminal 3**
```bash
cd backend/agent_3
python agent_3_api.py
```

**Terminal 4**
```bash
cd frontend
npm start
```

Visit: [http://localhost:3000](http://localhost:3000/)

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
...
```

For the full text, refer to [LICENSE](https://opensource.org/licenses/MIT).

---

## 🙌 Acknowledgements

-   [Qwen2.5-VL-7B by Alibaba Group](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct)
-   [Mixtral-8x7B by Mistral AI](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1)
-   HuggingFace Inference APIs
-   ImgBB for image hosting

---

Happy Hacking! 🔧✨

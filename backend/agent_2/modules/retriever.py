import json
import numpy as np
from modules.embedder import embed_text

with open("data/tenancy_facts.json", "r", encoding="utf-8") as f:
    RAW_FACTS = json.load(f)

FACTS = [f"Q: {q.strip()}\nA: {a.strip()}" for q, a in RAW_FACTS.items()]

def cosine_similarity(a, b):
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8)

def retrieve_top_k(query: str, k: int = 3):
    query_vec = embed_text(query)
    scored = []
    for fact in FACTS:
        fact_vec = embed_text(fact)
        score = cosine_similarity(query_vec, fact_vec)
        scored.append((score, fact))
    top = sorted(scored, key=lambda x: x[0], reverse=True)[:k]
    return [fact for _, fact in top]

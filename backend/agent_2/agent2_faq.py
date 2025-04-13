from modules.retriever import retrieve_top_k
from modules.generator import generate_answer

def get_answer(question: str):
    top_facts = retrieve_top_k(question, k=3)
    context = "\n\n".join(top_facts)
    return generate_answer(question, context)

# Example usage
# if __name__ == "__main__":
#     q = "How long can you stay in a property without a tenancy agreement?"
#     ans = get_answer(q)
#     print(ans)

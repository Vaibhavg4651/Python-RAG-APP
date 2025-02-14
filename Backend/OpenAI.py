from openai import AzureOpenAI, OpenAI
from config import AZURE_OPENAI_API_KEY1, AZURE_OPENAI_ENDPOINT1, API_VERSION1 , MODEL1 , DEEPSEEK_API_KEY,MODEL_DEEPSEEK

PROMPT_LIMIT = 3750

client1 = AzureOpenAI(
  api_key = AZURE_OPENAI_API_KEY1,  
  api_version = API_VERSION1,
  azure_endpoint = AZURE_OPENAI_ENDPOINT1
)


deepseekclient = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=DEEPSEEK_API_KEY,

)

def get_embedding(chunk, model=MODEL1): 
  try:
        print("Getting embeddings for chunk")
        print(chunk)

        if not isinstance(chunk, str):
            chunk = str(chunk)
        response = client1.embeddings.create(
            input=chunk,
            model=model
        )
        return response.data[0].embedding
  except Exception as e:
        print(f"Error getting embedding: {str(e)}")
        raise


def get_llm_answer(prompt):
    """Get completion from DeepSeek model"""
    try:
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]

        response = deepseekclient.chat.completions.create(
            model=MODEL_DEEPSEEK,
            messages=messages
        )
        # Access the content directly from the response object
        completion = response.choices[0].message.content
        return completion
    except Exception as e:
        print(f"Error getting LLM answer: {str(e)}")
        raise
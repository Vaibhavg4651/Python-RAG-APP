from openai import AzureOpenAI
from config import AZURE_OPENAI_API_KEY1, AZURE_OPENAI_ENDPOINT1, API_VERSION1 , MODEL1 , AZURE_OPENAI_API_KEY2,AZURE_OPENAI_ENDPOINT2,MODEL2,API_VERSION2

PROMPT_LIMIT = 3750

client1 = AzureOpenAI(
  api_key = AZURE_OPENAI_API_KEY1,  
  api_version = API_VERSION1,
  azure_endpoint = AZURE_OPENAI_ENDPOINT1
)

client2 = AzureOpenAI(
  api_key = AZURE_OPENAI_API_KEY2,  
  api_version = API_VERSION2,
  azure_endpoint = AZURE_OPENAI_ENDPOINT2
)


def get_embedding(chunk, model=MODEL1): 
  return client1.embeddings.create(input = [chunk], model=model).data[0].embedding


def get_llm_answer(prompt):
  messages = [{"role": "system", "content": "You are a helpful assistant."}]
  messages.append({"role": "user", "content": prompt})

  response = client2.chat.completions.create(
    model=MODEL2,
    messages=messages
  )
  response_json = response.model_dump_json()
  completion = response_json["choices"][0]["message"]["content"]
  return completion
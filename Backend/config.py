from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def get_env_variable(var_name: str) -> str:
    value = os.getenv(var_name)
    if value is None:
        raise ValueError(f"Environment variable '{var_name}' not found.")
    return value



AZURE_OPENAI_API_KEY1= get_env_variable("AZURE_OPENAI_API_KEY1")
AZURE_OPENAI_ENDPOINT1= get_env_variable("AZURE_OPENAI_ENDPOINT1")
API_VERSION1=get_env_variable("API_VERSION1")
MODEL1= get_env_variable("MODEL1") 
AZURE_OPENAI_API_KEY2= get_env_variable("AZURE_OPENAI_API_KEY2")
AZURE_OPENAI_ENDPOINT2= get_env_variable("AZURE_OPENAI_ENDPOINT2")
API_VERSION2=get_env_variable("API_VERSION2")
MODEL2= get_env_variable("MODEL2")
PINECONE_CLIENT= get_env_variable("PINECONE_API")
DEEPSEEK_API_KEY= get_env_variable("DEEPSEEK_API")
MODEL_DEEPSEEK= get_env_variable("MODEL_DEEPSEEK")

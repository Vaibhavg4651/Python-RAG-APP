from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def get_env_variable(var_name: str) -> str:
    value = os.getenv(var_name)
    if value is None:
        raise ValueError(f"Environment variable '{var_name}' not found.")
    return value


# Access environment variables
DB_HOST = get_env_variable("DB_HOST")
DB_USER = get_env_variable("DB_USER")
DB_PASSWORD =get_env_variable("DB_PASSWORD")
DB_NAME = get_env_variable("DB_NAME")
DB_PORT=get_env_variable("DB_PORT")
OPENAI_API_KEY= get_env_variable("OPENAI_API_KEY")

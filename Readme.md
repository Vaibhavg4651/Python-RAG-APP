# RAG Application with FastAPI #

This FastAPI application implements a Retrieval-Augmented Generation (RAG) system using langchain components, OpenAI, and pgvector for document storage and retrieval. The application supports document uploading, retrieval, and deletion, and provides a chat interface for interacting with stored documents.

Installation<br>
Clone the Repository


bash
```
    git clone https://github.com/Vaibhavg4651/Python-RAG-APP/
```

### For Running the Backend ###

Create and Activate Virtual Environment

bash

```
    cd Backend
    python3 -m venv venv
    source venv/bin/activate
    
```
### Install Dependencies ###

bash
```
    pip install -r requirements.txt
    Setup Environment Variables
```


## Create a .env file in the root directory with the following content: ##


```
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_PORT=your_database_port
    OPENAI_API_KEY=your_openai_api_key
```


Start the Server


```
    uvicorn main:app --reload
    The server will be running at http://127.0.0.1:8000.
```


## Endpoints ##


GET /

Returns a simple greeting message.

`json`
```
{
  "Hello": "World"
}
```


`Add Documents`

POST /add-documents/

Uploads a PDF document and extracts its text content. The document is then added to the vector store.

```
Request:

file: The PDF file to upload (must be in .pdf format).
Response:

json

{
  "message": "Documents added successfully",
  "ids": ["id1", "id2", ...]
}

Errors:

400 Bad Request: Only PDF files are allowed.
500 Internal Server Error: If there is an issue with processing the file.
```

`Get All IDs`

GET /get-all-ids/

Retrieves all document IDs from the vector store.
```
Response:

json
Copy code
["id1", "id2", ...]
Errors:

500 Internal Server Error: If there is an issue with retrieving the IDs.
```

`Get Documents by IDs`

POST /get-documents-by-ids/

Retrieves documents based on a list of IDs.

```
Request:

ids: List of document IDs to retrieve.
Response:

json
Copy code
[
  {
    "id": "id1",
    "page_content": "Document content here",
    "metadata": {"digest": "digest_value"}
  },
  ...
]
Errors:

404 Not Found: If one or more IDs are not found.
500 Internal Server Error: If there is an issue with retrieving the documents.
```

`Delete Documents`

DELETE /delete-documents/

Deletes documents based on a list of IDs.
```
Request:

ids: List of document IDs to delete.
Response:

json
Copy code
{
  "message": "N documents deleted successfully"
}
Errors:

404 Not Found: If one or more IDs are not found.
500 Internal Server Error: If there is an issue with deleting the documents.
```

`Chat`

POST /chat/

Sends a query to the RAG model and returns the generated response based on the context of stored documents.
```
Request:

msg: The query message to send to the model.
Response:

json
Copy code
{
  "response": "Model-generated response here"
}
```

## Notes ## 
Ensure your PostgreSQL database is correctly configured and accessible. <br>
The application uses OpenAI's API; make sure your API key is valid.<br>
For PDF processing, the PyMuPDF library is used to extract text from documents.<br>

## Troubleshooting ##

ModuleNotFoundError: Ensure all required libraries are installed and the virtual environment is activated.<br>
Database Connection Issues: Check your database configuration in the .env file and ensure the database is running.<br>
For further assistance, please refer to the documentation of the respective libraries or open an issue in the repository.


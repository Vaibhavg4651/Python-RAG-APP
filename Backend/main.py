from typing import Union
from sqlalchemy import create_engine, MetaData
from databases import Database
from .config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
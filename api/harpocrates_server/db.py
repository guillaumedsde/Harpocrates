import os

from pymongo import MongoClient

MONGO_URI = os.environ.get("MONGO_URI") or "mongodb://root:example@localhost:27017/"

MONGO_DB_NAME = os.environ.get("MONGO_DB_NAME") or "document_sets"


print(MONGO_DB_NAME)


def create_db_client(uri=None, db_name=None):
    mongo = MongoClient(uri or MONGO_URI)
    db = mongo[db_name or MONGO_DB_NAME]
    return db

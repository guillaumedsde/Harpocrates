import os

from pymongo import MongoClient

MONGO_URI = os.environ.get("MONGO_URI") or "mongodb://root:example@localhost:27017/"


def create_db_client(uri=None):
    mongo = MongoClient(uri or MONGO_URI)
    db = mongo["document_sets"]
    return db

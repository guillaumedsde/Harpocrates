import os

from pymongo import MongoClient


def create_db_client():
    MONGO_URI = os.environ.get("MONGO_URI") or "mongodb://root:example@localhost:27017/"
    mongo = MongoClient(MONGO_URI)
    db = mongo["document_sets"]
    return db

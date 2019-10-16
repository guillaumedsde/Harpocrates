# sqlalchemy.py
from pathlib import Path

from openapi_sqlalchemy import init_model_factory
from sqlalchemy.ext.declarative import declarative_base
from yaml import load, Loader

from openapi_server import db

OPENAPI_SPECIFICATION_FILE = Path(__file__).parent.parent.joinpath("openapi").joinpath("openapi.yaml")

# use the flask-sqlalchemy base model
Base = db.Model
with open(OPENAPI_SPECIFICATION_FILE) as spec_file:
    SPEC = load(spec_file, Loader=Loader)
MODEL_FACTORY = init_model_factory(base=Base, spec=SPEC)

Document = MODEL_FACTORY(name="document")

DocumentSet = MODEL_FACTORY(name="documentSet")

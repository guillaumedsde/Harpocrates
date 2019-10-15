# models.py
from pathlib import Path

from openapi_sqlalchemy import init_model_factory
from sqlalchemy.ext.declarative import declarative_base
from yaml import load, Loader

# OPENAPI_SPECIFICATION_FILE = "/home/architect/git_repositories/dissertation/api-specification/api-specification/openapi.yml"


OPENAPI_SPECIFICATION_FILE = Path(__file__).parent.parent.joinpath("openapi").joinpath("openapi.yaml")

Base = declarative_base()
with open(OPENAPI_SPECIFICATION_FILE) as spec_file:
    SPEC = load(spec_file, Loader=Loader)
MODEL_FACTORY = init_model_factory(base=Base, spec=SPEC)

Document = MODEL_FACTORY(name="document")

DocumentSet = MODEL_FACTORY(name="documentSet")

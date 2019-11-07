import os

import click
import connexion
from flask.cli import with_appcontext

# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from flask_cors import CORS

from elasticsearch import Elasticsearch
from elasticsearch.client import CatClient

from openapi_server import encoder

__version__ = (0, 1, 0, "dev")

# db = SQLAlchemy()

es = Elasticsearch()
cat = CatClient(es)


def create_app(test_config=None):
    connexion_app = connexion.App(
        __name__, specification_dir="./openapi/", options={"swagger_ui": False}
    )

    connexion_app.add_api(
        "openapi.yaml",
        arguments={"title": "REST API for predictive analtyics"},
        pythonic_params=True,
        strict_validation=True,
    )

    app = connexion_app.app

    CORS(app)

    app.json_encoder = encoder.JSONEncoder

    # some deploy systems set the database url in the environ
    db_url = os.environ.get("DATABASE_URL")

    if not db_url:
        # default to a sqlite database in the instance folder
        db_url = "sqlite:///" + os.path.join(app.instance_path, "app.sqlite")
        # ensure the instance folder exists
        os.makedirs(app.instance_path, exist_ok=True)

    app.config.from_mapping(
        # default secret that should be overridden in environ or config
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev"),
        SQLALCHEMY_DATABASE_URI=db_url,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    # if test_config is None:
    #     # load the instance config, if it exists, when not testing
    #     app.config.from_pyfile("config.py", silent=True)
    # else:
    #     # load the test config if passed in
    #     app.config.update(test_config)

    return app

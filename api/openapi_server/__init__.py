import os

import click
import connexion
from flask.cli import with_appcontext

from flask_cors import CORS

from pymongo import MongoClient

from openapi_server import encoder

__version__ = (0, 1, 0, "dev")

MONGO_URI = os.environ.get("MONGO_URI") or "mongodb://root:example@localhost:27017/"
mongo = MongoClient(MONGO_URI)
db = mongo["document_sets"]


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

    app.config.from_mapping(
        # default secret that should be overridden in environ or config
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev"),
    )

    # if test_config is None:
    #     # load the instance config, if it exists, when not testing
    #     app.config.from_pyfile("config.py", silent=True)
    # else:
    #     # load the test config if passed in
    #     app.config.update(test_config)

    return app

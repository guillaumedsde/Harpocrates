import os
from multiprocessing.pool import ThreadPool

from multiprocessing import cpu_count

import click
import connexion
from flask.cli import with_appcontext

from flask_cors import CORS

from harpocrates_server import encoder
from harpocrates_server.db import create_db_client

__version__ = (0, 1, 0, "dev")

# setup database
db = create_db_client()

pool = ThreadPool(processes=cpu_count())


# def make_celery(app):
#     celery = Celery(
#         app.import_name,
#         backend=app.config["CELERY_RESULT_BACKEND"],
#         broker=app.config["CELERY_BROKER_URL"],
#     )
#     celery.conf.update(app.config)
#     TaskBase = celery.Task

#     class ContextTask(TaskBase):
#         abstract = True

#         def __call__(self, *args, **kwargs):
#             with app.app_context():
#                 return TaskBase.__call__(self, *args, **kwargs)

#     celery.Task = ContextTask
#     return celery


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

    # setup messaging broker

    # flask_app = Flask(__name__)
    # flask_app.config.update(
    #     CELERY_BROKER_URL=CELERY_BROKER, CELERY_RESULT_BACKEND=CELERY_BROKER
    # )
    # celery = make_celery(flask_app)

    # if test_config is None:
    #     # load the instance config, if it exists, when not testing
    #     app.config.from_pyfile("config.py", silent=True)
    # else:
    #     # load the test config if passed in
    #     app.config.update(test_config)

    return app
#!/usr/bin/env python3

from openapi_server import create_app
from waitress import serve


if __name__ == "__main__":
    app = create_app()

    serve(app, listen="*:80")

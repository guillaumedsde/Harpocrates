ARG PYTHON_VERSION=3.7

FROM python:${PYTHON_VERSION}-windowsservercore-1809

RUN mkdir app
WORKDIR C:\app

RUN pip install --no-cache-dir pipenv && \
    # install dependencies
    pipenv install --system --deploy --ignore-pipfile && \
    pip uninstall pipenv -y

COPY . ./

CMD ["waitress-server.py"]
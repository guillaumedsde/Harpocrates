FROM python:3.7.4-slim-buster

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* /usr/src/app/

RUN apt update && \
    apt install git -y --no-install-recommends && \
    pip install --no-cache-dir pipenv && \
    pipenv install --deploy --ignore-pipfile && \
    # delete build only requirements
    apt purge git -y && \
    apt autoremove --purge -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

COPY . /usr/src/app

EXPOSE 8080

CMD ["pipenv", "run", "python", "-m", "openapi_server"]

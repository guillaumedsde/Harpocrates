ARG PYTHON_VERSION=3.8

FROM python:${PYTHON_VERSION}-slim-buster

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* ./

RUN apt update && \
    apt install -y --no-install-recommends git uwsgi && \
    pip install --no-cache-dir pipenv && \
    pipenv install --system --deploy --ignore-pipfile && \
    pip uninstall pipenv -y &&\
    # delete build only requirements
    apt purge git -y && \
    apt autoremove --purge -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

COPY . ./

EXPOSE 80

CMD ["uwsgi", "--ini", "uwsgi.ini"]

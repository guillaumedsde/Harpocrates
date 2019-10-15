FROM python:3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* /usr/src/app/

RUN pip install --no-cache-dir pipenv && \
    pipenv install --skip-lock --system --dev && \
    pip uninstall pipenv -y

COPY . /usr/src/app

EXPOSE 8080

ENTRYPOINT ["python"]

CMD ["-m", "openapi_server"]

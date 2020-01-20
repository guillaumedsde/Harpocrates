ARG PYTHON_VERSION=3.7

FROM python:${PYTHON_VERSION}-slim-buster as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* ./

RUN apt update && \
    apt install -y --no-install-recommends  build-essential && \
    pip install --no-cache-dir pipenv && \
    # install dependencies with optimizations
    CFLAGS="-g0 -Wl,--strip-all -I/usr/include:/usr/local/include -L/usr/lib:/usr/local/lib" \
    CPPFLAGS=${CFLAGS} \
    #PIP_GLOBAL_OPTION="build_ext -j 4" \
    pipenv install --system --deploy --ignore-pipfile && \
    pip uninstall pipenv -y &&\
    # delete build only requirements
    apt purge  build-essential -y && \
    apt autoremove --purge -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

COPY . ./


FROM gcr.io/distroless/python3-debian10:debug

ARG PYTHON_VERSION=3.7
COPY --from=build /usr/src/app /usr/src/app
COPY --from=build /usr/local/lib/python${PYTHON_VERSION}/site-packages /usr/local/lib/python${PYTHON_VERSION}/site-packages
COPY --from=build /usr/local/bin/gunicorn /usr/local/bin/gunicorn
WORKDIR /usr/src/app
ENV PYTHONPATH=/usr/local/lib/python${PYTHON_VERSION}/site-packages
ENV FLASK_APP=openapi_server
ENV FLASK_ENV=production

EXPOSE 80

ENTRYPOINT ["python", "-m", "flask"]
CMD ["run", "-p 80"]
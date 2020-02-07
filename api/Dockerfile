ARG BUILD_PYTHON_VERSION=3.6

FROM python:${BUILD_PYTHON_VERSION}-buster as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* ./

RUN pip install --no-cache-dir pipenv && \
    # install dependencies with optimizations
    CFLAGS="-g0 -Wl,--strip-all -I/usr/include:/usr/local/include -L/usr/lib:/usr/local/lib" \
    CPPFLAGS=${CFLAGS} \
    #PIP_GLOBAL_OPTION="build_ext -j 4" \
    pipenv install --system --deploy --ignore-pipfile && \
    pip uninstall pipenv -y

COPY . ./


FROM gcr.io/distroless/python3-debian10:latest

ARG BUILD_PYTHON_VERSION=3.6
ARG RUN_PYTHON_VERSION=3.7

COPY --from=build /usr/src/app /usr/src/app
COPY --from=build /usr/local/lib/python${BUILD_PYTHON_VERSION}/site-packages /usr/local/lib/python${RUN_PYTHON_VERSION}/site-packages

WORKDIR /usr/src/app
ENV PYTHONPATH=/usr/local/lib/python${RUN_PYTHON_VERSION}/site-packages

EXPOSE 80

CMD ["waitress-server.py"]
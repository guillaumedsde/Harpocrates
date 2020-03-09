# Python version used in the build container
ARG BUILD_PYTHON_VERSION=3.7

# debian python base for build time
FROM python:${BUILD_PYTHON_VERSION}-buster as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install pipenv
RUN pip install --no-cache-dir pipenv

COPY Pipfile* ./

# install dependencies with optimizations
RUN CFLAGS="-g0 -Wl,--strip-all -I/usr/include:/usr/local/include -L/usr/lib:/usr/local/lib" \
    CPPFLAGS=${CFLAGS} \
    #PIP_GLOBAL_OPTION="build_ext -j 4" \
    pipenv install --system --deploy --ignore-pipfile

COPY . ./

# distroless python base for runtime
FROM gcr.io/distroless/python3@sha256:ea01cb37b865764175854e62f286920fbbf7945e3933a6a5a4f248755619132c

# Python version used in the build container
ARG BUILD_PYTHON_VERSION=3.7
# Python version used in the distroless container
ARG RUN_PYTHON_VERSION=3.7

COPY --from=build /usr/src/app /usr/src/app
COPY --from=build /usr/local/lib/python${BUILD_PYTHON_VERSION}/site-packages /usr/local/lib/python${RUN_PYTHON_VERSION}/site-packages

WORKDIR /usr/src/app
ENV PYTHONPATH=/usr/local/lib/python${RUN_PYTHON_VERSION}/site-packages

EXPOSE 80

CMD ["waitress-server.py"]
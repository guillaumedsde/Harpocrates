ARG PYTHON_VERSION=3.8

FROM python:${PYTHON_VERSION}-slim-buster

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

EXPOSE 80

CMD ["uwsgi", "--ini", "uwsgi.ini"]

FROM tiangolo/uwsgi-nginx-flask:python3.7

COPY Pipefile* ./

RUN pip install --no-cache-dir pipenv && \
    pipenv install --skip-lock --system --dev && \
    pip uninstall pipenv -y

COPY . .


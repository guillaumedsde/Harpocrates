FROM tiangolo/uwsgi-nginx-flask:python3.7

COPY Pipfile* ./

RUN pip install --no-cache-dir pipenv && \
    pipenv install --system --deploy --ignore-pipfile && \
    pip uninstall pipenv -y

COPY . .


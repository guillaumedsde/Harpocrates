# Harpocrates

![Gitlab pipeline status](https://gitlab.com/harpocrates-app/harpocrates/badges/master/pipeline.svg)

![UI demo](static/document_edit.gif)

This is the mono-repository for the Harpocrates sensitive document redaction application. Harpocrates is a web application to aid in the redaction of collections of sensitive by using Machine Learn (scikit-learn) to classify documents according to sensitivity and explaining these classifications (LIME).

Harpocrates' interface not only allows redactors to visualize the Machine Learning classifications with their explanations but also to redact the uploaded documents.

## How to run

To run the Harpocrates stack, you will need:

- docker
- docker-compose

```bash
git clone https://gitlab.com/harpocrates-app/harpocrates.git
cd harpocrates
docker-compose up -d
```

### Prebuilt docker images

A Docker image repository with prebuilt docker images is also [available here](https://gitlab.com/harpocrates-app/harpocrates/container_registry)

## Documentation

Documentation for Harpocrates services is available here: [https://harpocrates-app.gitlab.io/harpocrates](https://harpocrates-app.gitlab.io/harpocrates)

## Development

The development Logbook of Harpocrates can be [found here](https://dissertation.guillaume.desusanne.com).

### How it works

Harpocrates uses the following tech stack:

- MongoDB (Document store)
- Flask (backend API)
- ReactJS (Frontend)

### Develop locally (without docker)

To run the stack without docker you will need to have:

- python 3.7
- pipenv
- node 13.1

1. Clone the repository
   - ```bash
     git clone https://gitlab.com/harpocrates-app/harpocrates.git
     cd harpocrates
     cat hosts.txt >> /etc/hosts
     ```
2. Create and install backend API environment and run API
   - ```bash
     cd api
     pipenv install
     pipenv shell
     flask run --port 80
     ```
3. Create and install frontend Node environment and run development build of frontend
   - ```bash
     cd frontend
     npm install
     npm run dev
     ```
4. Run a MongoDB instance (you can use the one define in the docker-compose `docker-compose up -d mongo`)

### Generate the Javascript API Client code

The `js-api-client` service is a Node package auto-generated using the openapi-generator from the specification defined in `api-sepecification/api-specification/openapi.yml`.

To update the JS client after having modified the specification use the following command at the repo's root **after having installed the [OpenAPI code generator](https://github.com/OpenAPITools/openapi-generator)**:

```bash
make api-client
```

### Generate the Flask API Server code

The Flask API server code is also derived from the OpenAPI generator code, however, some files are protected from "auto generation overwrite" this list is in `api/.openapi-generator-ignore`. As such, some manual modification of these files might be required after code generation which is run from the project root with the following command **after having installed the [OpenAPI code generator](https://github.com/OpenAPITools/openapi-generator)**:

```bash
make api-server
```

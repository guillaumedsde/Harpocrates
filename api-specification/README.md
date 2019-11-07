# API specification

[![Pipeline Status](https://gitlab.com/visualising-sensitivity-classification-features/api-specification/badges/master/pipeline.svg)](https://gitlab.com/visualising-sensitivity-classification-features/api-specification/pipelines)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fharpocrates-app.gitlab.io%2Fapi-specification)](https://harpocrates-app.gitlab.io/api-specification)

This is an [OpenAPI specification](https://en.wikipedia.org/wiki/OpenAPI_Specification) for an API for predictive analytics engines.

## Documentation

OpenAPI documentation is automatically generated and published from this specification, it is [**available here**](https://harpocrates-app.gitlab.io/api-specification).

## Contribute

To install development packages (linter and swagger-ui) please run:

```bash
npm install --dev-only
```

A set of linting rules are defined in `.validaterc` using the [IBM openAPI validator](https://github.com/IBM/openapi-validator) and GitLab CI pipelines will fail if there are errors as defined in this file.

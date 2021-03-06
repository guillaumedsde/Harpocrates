# @harpocrates/frontend

This is the ReactJS frontend for the Harpocrates application

- Package version: 9.0.0

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install @harpocrates/frontend --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Test modes

For testing purposes I have added a `TEST_MODE` environment variable to build different variations of the frontend:

- `TEST_MODE=0`: test mode is disable no modifications to the frontend
- `TEST_MODE=1`: test mode is enabled certain "technical" features are disabled (classifier type, document split level...)
- `TEST_MODE=2`: test mode is enabled all Machine learning features are disabled (classification, explanations...)

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Then run:

```shell
npm install
```

Lastly start the development server using

```shell
npm run dev
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

#### Docker container

A prebuilt docker container for this application is [available here](https://gitlab.com/harpocrates-app/harpocrates/container_registry)

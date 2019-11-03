# harpocrates_api

HarpocratesApi - JavaScript client for harpocrates_api
This is the Rest API specification for the harpocrates application
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 0.1.0
- Package version: 0.1.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install harpocrates_api --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your harpocrates_api from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var HarpocratesApi = require('harpocrates_api');


var api = new HarpocratesApi.DocumentApi()
var setId = "setId_example"; // {String} ID of a set
var body = "body_example"; // {String} 
api.createDocument(setId, body).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});


```

## Documentation for API Endpoints

All URIs are relative to *http://localhost/0.1.0*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*HarpocratesApi.DocumentApi* | [**createDocument**](docs/DocumentApi.md#createDocument) | **POST** /documentSet/{setId} | Add a new document to the document set
*HarpocratesApi.DocumentApi* | [**deleteDocument**](docs/DocumentApi.md#deleteDocument) | **DELETE** /documentSet/{setId}/{docId} | delete the set
*HarpocratesApi.DocumentApi* | [**getDocument**](docs/DocumentApi.md#getDocument) | **GET** /documentSet/{setId}/{docId} | get document from set
*HarpocratesApi.SetApi* | [**createSet**](docs/SetApi.md#createSet) | **POST** /documentSet | Add a new documentset set to the engine
*HarpocratesApi.SetApi* | [**deleteSet**](docs/SetApi.md#deleteSet) | **DELETE** /documentSet/{setId} | delete the set
*HarpocratesApi.SetApi* | [**getSet**](docs/SetApi.md#getSet) | **GET** /documentSet/{setId} | lists all documents in the set
*HarpocratesApi.SetApi* | [**getSets**](docs/SetApi.md#getSets) | **GET** /documentSet | List all documentsets known by the engine


## Documentation for Models

 - [HarpocratesApi.Document](docs/Document.md)
 - [HarpocratesApi.DocumentSet](docs/DocumentSet.md)
 - [HarpocratesApi.DocumentSets](docs/DocumentSets.md)
 - [HarpocratesApi.Documents](docs/Documents.md)
 - [HarpocratesApi.HttpStatus](docs/HttpStatus.md)


## Documentation for Authorization

All endpoints do not require authorization.

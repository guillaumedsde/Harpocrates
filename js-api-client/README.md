# @harpocrates/api-client

api - JavaScript client for @harpocrates/api-client
This is the Rest API specification for the Harpocrates application
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 9.2.1
- Package version: 9.2.1
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install @harpocrates/api-client --save
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

To use the link you just defined in your project, switch to the directory you want to use your @harpocrates/api-client from, and run:

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
var api = require('@harpocrates/api-client');


var api = new api.DocumentApi()
var setId = 9_11; // {String} ID of a set
var body = "body_example"; // {String} 
api.createDocument(setId, body).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});


```

## Documentation for API Endpoints

All URIs are relative to *http://api.harpocrates.app.local*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*api.DocumentApi* | [**createDocument**](docs/DocumentApi.md#createDocument) | **POST** /documentSet/{setId} | Add a new document to the set
*api.DocumentApi* | [**deleteDocument**](docs/DocumentApi.md#deleteDocument) | **DELETE** /documentSet/{setId}/{docId} | delete document from set
*api.DocumentApi* | [**getDocument**](docs/DocumentApi.md#getDocument) | **GET** /documentSet/{setId}/{docId} | get document from set
*api.DocumentApi* | [**getOriginalContent**](docs/DocumentApi.md#getOriginalContent) | **GET** /documentSet/{setId}/{docId}/original | get original document content as plain text
*api.DocumentApi* | [**getPredictedClassification**](docs/DocumentApi.md#getPredictedClassification) | **GET** /documentSet/{setId}/{docId}/predictedClassification | Get the predicted classification for the document
*api.DocumentApi* | [**getRedactedContent**](docs/DocumentApi.md#getRedactedContent) | **GET** /documentSet/{setId}/{docId}/redacted | get redacted document content as plain text
*api.SetApi* | [**createSet**](docs/SetApi.md#createSet) | **POST** /documentSet | Add a new document set set to the engine
*api.SetApi* | [**deleteSet**](docs/SetApi.md#deleteSet) | **DELETE** /documentSet/{setId} | delete the set
*api.SetApi* | [**getSet**](docs/SetApi.md#getSet) | **GET** /documentSet/{setId} | lists all documents in the set
*api.SetApi* | [**getSets**](docs/SetApi.md#getSets) | **GET** /documentSet | List all document sets known by the engine
*api.TextContentApi* | [**addSensitiveSection**](docs/TextContentApi.md#addSensitiveSection) | **POST** /documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections | add a sensitive section to the document
*api.TextContentApi* | [**addSensitiveSections**](docs/TextContentApi.md#addSensitiveSections) | **PUT** /documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections | Overwrite the sensitive sections of a TextContent object
*api.TextContentApi* | [**getSensitiveSections**](docs/TextContentApi.md#getSensitiveSections) | **GET** /documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections | get sensitive sections of a TextContent object


## Documentation for Models

 - [api.Document](docs/Document.md)
 - [api.DocumentSet](docs/DocumentSet.md)
 - [api.DocumentSets](docs/DocumentSets.md)
 - [api.Documents](docs/Documents.md)
 - [api.Feature](docs/Feature.md)
 - [api.FeatureAllOf](docs/FeatureAllOf.md)
 - [api.HttpStatus](docs/HttpStatus.md)
 - [api.PredictedClassification](docs/PredictedClassification.md)
 - [api.PredictedClassificationExplanation](docs/PredictedClassificationExplanation.md)
 - [api.Section](docs/Section.md)
 - [api.SensitiveSection](docs/SensitiveSection.md)
 - [api.SensitiveSectionAllOf](docs/SensitiveSectionAllOf.md)
 - [api.SensitiveSections](docs/SensitiveSections.md)
 - [api.TextContent](docs/TextContent.md)


## Documentation for Authorization

All endpoints do not require authorization.

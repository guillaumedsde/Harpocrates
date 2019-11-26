# @HarpocratesApiClient.DocumentApi

All URIs are relative to *http://api.harpocrates.app.local*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addSensitiveSection**](DocumentApi.md#addSensitiveSection) | **POST** /documentSet/{setId}/{docId}/sensitiveSection | add a sensitive section to the document
[**addSensitiveSections**](DocumentApi.md#addSensitiveSections) | **POST** /documentSet/{setId}/{docId}/sensitiveSections | add multiple sensitive sections to the document
[**createDocument**](DocumentApi.md#createDocument) | **POST** /documentSet/{setId} | Add a new document to the document set
[**deleteDocument**](DocumentApi.md#deleteDocument) | **DELETE** /documentSet/{setId}/{docId} | delete the set
[**getDocument**](DocumentApi.md#getDocument) | **GET** /documentSet/{setId}/{docId} | get document from set
[**getPredictedClassification**](DocumentApi.md#getPredictedClassification) | **GET** /documentSet/{setId}/{docId}/predictedClassification | Get the predicted classification for the document
[**getPredictedClassificationWithExplanation**](DocumentApi.md#getPredictedClassificationWithExplanation) | **GET** /documentSet/{setId}/{docId}/predictedClassificationWithExplanation | Get the explanation for the predicted classification of a document
[**getSensitiveSections**](DocumentApi.md#getSensitiveSections) | **GET** /documentSet/{setId}/{docId}/sensitiveSections | get sensitive sections of the document



## addSensitiveSection

> SensitiveSection addSensitiveSection(setId, docId, opts)

add a sensitive section to the document

add a sensitive section to the document

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
let opts = {
  'sensitiveSection': new @HarpocratesApiClient.SensitiveSection() // SensitiveSection | 
};
apiInstance.addSensitiveSection(setId, docId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 
 **sensitiveSection** | [**SensitiveSection**](SensitiveSection.md)|  | [optional] 

### Return type

[**SensitiveSection**](SensitiveSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addSensitiveSections

> SensitiveSections addSensitiveSections(setId, docId, opts)

add multiple sensitive sections to the document

add multiple sensitive sections to the document

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
let opts = {
  'sensitiveSections': new @HarpocratesApiClient.SensitiveSections() // SensitiveSections | 
};
apiInstance.addSensitiveSections(setId, docId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 
 **sensitiveSections** | [**SensitiveSections**](SensitiveSections.md)|  | [optional] 

### Return type

[**SensitiveSections**](SensitiveSections.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDocument

> Document createDocument(setId, body)

Add a new document to the document set

Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let body = "body_example"; // String | 
apiInstance.createDocument(setId, body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **body** | **String**|  | 

### Return type

[**Document**](Document.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/json


## deleteDocument

> Document deleteDocument(setId, docId)

delete the set

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
apiInstance.deleteDocument(setId, docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 

### Return type

[**Document**](Document.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDocument

> Document getDocument(setId, docId)

get document from set

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
apiInstance.getDocument(setId, docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 

### Return type

[**Document**](Document.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getPredictedClassification

> PredictedClassification getPredictedClassification(setId, docId)

Get the predicted classification for the document

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
apiInstance.getPredictedClassification(setId, docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 

### Return type

[**PredictedClassification**](PredictedClassification.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getPredictedClassificationWithExplanation

> PredictedClassificationWithExplanation getPredictedClassificationWithExplanation(setId, docId)

Get the explanation for the predicted classification of a document

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
apiInstance.getPredictedClassificationWithExplanation(setId, docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 

### Return type

[**PredictedClassificationWithExplanation**](PredictedClassificationWithExplanation.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSensitiveSections

> SensitiveSections getSensitiveSections(setId, docId)

get sensitive sections of the document

get sensitive sections of the document

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = "setId_example"; // String | ID of a set
let docId = "docId_example"; // String | ID of a document
apiInstance.getSensitiveSections(setId, docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 
 **docId** | **String**| ID of a document | 

### Return type

[**SensitiveSections**](SensitiveSections.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


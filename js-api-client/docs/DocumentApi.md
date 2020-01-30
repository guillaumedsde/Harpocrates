# @HarpocratesApiClient.DocumentApi

All URIs are relative to *http://api.harpocrates.app.local*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDocument**](DocumentApi.md#createDocument) | **POST** /documentSet/{setId} | Add a new document to the set
[**deleteDocument**](DocumentApi.md#deleteDocument) | **DELETE** /documentSet/{setId}/{docId} | delete document from set
[**getDocument**](DocumentApi.md#getDocument) | **GET** /documentSet/{setId}/{docId} | get document from set
[**getPredictedClassification**](DocumentApi.md#getPredictedClassification) | **GET** /documentSet/{setId}/{docId}/predictedClassification | Get the predicted classification for the document



## createDocument

> Document createDocument(setId, body)

Add a new document to the set

Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = 9_11; // String | ID of a set
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

delete document from set

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.DocumentApi();
let setId = 9_11; // String | ID of a set
let docId = document1; // String | ID of a document
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
let setId = 9_11; // String | ID of a set
let docId = document1; // String | ID of a document
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
let setId = 9_11; // String | ID of a set
let docId = document1; // String | ID of a document
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


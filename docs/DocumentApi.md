# RestApiForPredictiveAnaltyics.DocumentApi

All URIs are relative to *http://localhost/0.1.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDocument**](DocumentApi.md#createDocument) | **POST** /documentSet/{setId} | Add a new document to the document set
[**deleteDocument**](DocumentApi.md#deleteDocument) | **DELETE** /documentSet/{setId}/{docId} | delete the set
[**getDocument**](DocumentApi.md#getDocument) | **GET** /documentSet/{setId}/{docId} | get document from set



## createDocument

> Document createDocument(setId, body)

Add a new document to the document set

Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.

### Example

```javascript
import RestApiForPredictiveAnaltyics from 'rest_api_for_predictive_analtyics';

let apiInstance = new RestApiForPredictiveAnaltyics.DocumentApi();
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
import RestApiForPredictiveAnaltyics from 'rest_api_for_predictive_analtyics';

let apiInstance = new RestApiForPredictiveAnaltyics.DocumentApi();
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
import RestApiForPredictiveAnaltyics from 'rest_api_for_predictive_analtyics';

let apiInstance = new RestApiForPredictiveAnaltyics.DocumentApi();
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


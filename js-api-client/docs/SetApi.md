# @HarpocratesApiClient.SetApi

All URIs are relative to *http://api.harpocrates.app.local*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSet**](SetApi.md#createSet) | **POST** /documentSet | Add a new document set set to the engine
[**deleteSet**](SetApi.md#deleteSet) | **DELETE** /documentSet/{setId} | delete the set
[**getSet**](SetApi.md#getSet) | **GET** /documentSet/{setId} | lists all documents in the set
[**getSets**](SetApi.md#getSets) | **GET** /documentSet | List all document sets known by the engine



## createSet

> DocumentSet createSet(documentSet)

Add a new document set set to the engine

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.SetApi();
let documentSet = new @HarpocratesApiClient.DocumentSet(); // DocumentSet | documentSet descriptor that needs to be added to the engine
apiInstance.createSet(documentSet).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **documentSet** | [**DocumentSet**](DocumentSet.md)| documentSet descriptor that needs to be added to the engine | 

### Return type

[**DocumentSet**](DocumentSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteSet

> DocumentSet deleteSet(setId)

delete the set

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.SetApi();
let setId = "setId_example"; // String | ID of a set
apiInstance.deleteSet(setId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 

### Return type

[**DocumentSet**](DocumentSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSet

> Documents getSet(setId)

lists all documents in the set

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.SetApi();
let setId = "setId_example"; // String | ID of a set
apiInstance.getSet(setId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setId** | **String**| ID of a set | 

### Return type

[**Documents**](Documents.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSets

> DocumentSets getSets()

List all document sets known by the engine

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.SetApi();
apiInstance.getSets().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**DocumentSets**](DocumentSets.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


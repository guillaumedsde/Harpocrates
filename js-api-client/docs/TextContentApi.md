# @HarpocratesApiClient.TextContentApi

All URIs are relative to *http://api.harpocrates.app.local*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addSensitiveSection**](TextContentApi.md#addSensitiveSection) | **POST** /documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections | add a sensitive section to the document
[**addSensitiveSections**](TextContentApi.md#addSensitiveSections) | **PUT** /documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections | Overwrite the sensitive sections of a TextContent object
[**getSensitiveSections**](TextContentApi.md#getSensitiveSections) | **GET** /documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections | get sensitive sections of a TextContent object



## addSensitiveSection

> SensitiveSection addSensitiveSection(setId, docId, textContentIndex, opts)

add a sensitive section to the document

add a sensitive section to the document

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.TextContentApi();
let setId = 9_11; // String | ID of a set
let docId = document1; // String | ID of a document
let textContentIndex = 2; // Number | Index of the position of a TextContent object in the list of TextContent objects making up the document
let opts = {
  'sensitiveSection': new @HarpocratesApiClient.SensitiveSection() // SensitiveSection | 
};
apiInstance.addSensitiveSection(setId, docId, textContentIndex, opts).then((data) => {
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
 **textContentIndex** | **Number**| Index of the position of a TextContent object in the list of TextContent objects making up the document | 
 **sensitiveSection** | [**SensitiveSection**](SensitiveSection.md)|  | [optional] 

### Return type

[**SensitiveSection**](SensitiveSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addSensitiveSections

> SensitiveSections addSensitiveSections(setId, docId, textContentIndex, opts)

Overwrite the sensitive sections of a TextContent object

Overwrite the sensitive sections of a TextContent object

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.TextContentApi();
let setId = 9_11; // String | ID of a set
let docId = document1; // String | ID of a document
let textContentIndex = 2; // Number | Index of the position of a TextContent object in the list of TextContent objects making up the document
let opts = {
  'sensitiveSections': new @HarpocratesApiClient.SensitiveSections() // SensitiveSections | 
};
apiInstance.addSensitiveSections(setId, docId, textContentIndex, opts).then((data) => {
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
 **textContentIndex** | **Number**| Index of the position of a TextContent object in the list of TextContent objects making up the document | 
 **sensitiveSections** | [**SensitiveSections**](SensitiveSections.md)|  | [optional] 

### Return type

[**SensitiveSections**](SensitiveSections.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getSensitiveSections

> SensitiveSections getSensitiveSections(setId, docId, textContentIndex)

get sensitive sections of a TextContent object

get sensitive sections of a TextContent object

### Example

```javascript
import @HarpocratesApiClient from '@harpocrates/api-client';

let apiInstance = new @HarpocratesApiClient.TextContentApi();
let setId = 9_11; // String | ID of a set
let docId = document1; // String | ID of a document
let textContentIndex = 2; // Number | Index of the position of a TextContent object in the list of TextContent objects making up the document
apiInstance.getSensitiveSections(setId, docId, textContentIndex).then((data) => {
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
 **textContentIndex** | **Number**| Index of the position of a TextContent object in the list of TextContent objects making up the document | 

### Return type

[**SensitiveSections**](SensitiveSections.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


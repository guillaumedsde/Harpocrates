# api.Document

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** |  | [optional] 
**documentId** | **String** |  | 
**textSplitGranularity** | **String** | Granularity of the split of the document&#39;s content | [optional] 
**predictedClassification** | [**PredictedClassification**](PredictedClassification.md) |  | [optional] 
**textContents** | [**[TextContent]**](TextContent.md) | list of textContent object representing the content of the document | 



## Enum: TextSplitGranularityEnum


* `document` (value: `"document"`)

* `paragraph` (value: `"paragraph"`)

* `line` (value: `"line"`)





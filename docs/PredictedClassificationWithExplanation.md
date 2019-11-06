# @HarpocratesApiClient.PredictedClassificationWithExplanation

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sensitive** | **Boolean** | true if the document is predicted to be sensitive, false otherwise | 
**sensitivity** | **Number** | Document sensitivity percentage | [optional] 
**sensitiveFeatures** | [**[Feature]**](Feature.md) | The explanation for the \&quot;sensitive\&quot; classification of a document as an array of features and their contribution to the explanation | [optional] 
**nonSensitiveFeatures** | [**[Feature]**](Feature.md) | The explanation for the \&quot;non sensitive\&quot; classification of a document as an array of features and their contribution to the explanation | [optional] 



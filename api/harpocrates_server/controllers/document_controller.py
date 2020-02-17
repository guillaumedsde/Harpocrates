import traceback
import logging
import connexion
from typing import Tuple, Union
import six
from http import HTTPStatus
from typing import List
import json
import re
from copy import deepcopy
import numpy as np
from bson.objectid import ObjectId

from flask import current_app

from harpocrates_server.models.document import Document  # noqa: E501
from harpocrates_server.models.http_status import HttpStatus  # noqa: E501
from harpocrates_server.models.sensitive_section import SensitiveSection  # noqa: E501
from harpocrates_server.models.sensitive_sections import SensitiveSections  # noqa: E501
from harpocrates_server.models.predicted_classification_explanation import (
    PredictedClassificationExplanation,
)

from harpocrates_server.models.predicted_classification import PredictedClassification

from harpocrates_server.models.feature import Feature
from harpocrates_server.models.http_status import HttpStatus as ApiHttpStatus
from harpocrates_server.models.text_content import TextContent

from harpocrates_server import util, db

from harpocrates_server.service import CLASS_NAMES
from harpocrates_server.service.classification import get_model
from harpocrates_server.service.explanation import (
    lime_explanation,
    shap_tree_explanation,
)

from harpocrates_server.service.errors import create_api_http_status
from harpocrates_server.service.document import (
    document_from_mongo_dict,
    text_contents_from_document_body,
    content_from_text_contents
)

# create a dummy current_app for logging outside of flask context
try:

    from flask import current_app
    current_app.logger.info()
except RuntimeError:
    from harpocrates_server.models.dummy_flask_app import DummyFlaskApp
    logger = logging.getLogger(__name__)
    handler = logging.StreamHandler()
    handler.setLevel(logging.DEBUG)
    logger.addHandler(handler)
    current_app = DummyFlaskApp(logger)



def create_document(set_id, body) -> Tuple[Document, int]:  # noqa: E501
    """Add a new document to the document set

    Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain. # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param body: 
    :type body: str

    :rtype: Document
    """

    granularity = "line"

    text_contents = text_contents_from_document_body(
        body.decode(), granularity=granularity
    )

    document = Document(text_contents=text_contents, text_split_granularity=granularity)

    operation_result = db[set_id].insert_one(document.to_dict())

    if not operation_result.inserted_id:
        error = HTTPStatus.INTERNAL_SERVER_ERROR
        return create_api_http_status(error), error.value

    classify(set_id, operation_result.inserted_id)

    document = get_document(set_id, operation_result.inserted_id)

    return document, HTTPStatus.OK.value


def delete_document(set_id: str, doc_id: str) -> Tuple[Document, int]:
    """
    Delete a document a in the set
    :param set_id: ID of a set
    :param doc_id: ID of a document
    """
    result = db[set_id].find_one_and_delete({"_id": ObjectId(doc_id)})

    result["documentId"] = str(result["_id"])
    del result["_id"]
    deleted = Document.from_dict(result)
    return deleted, HTTPStatus.OK.value


def get_document(
    set_id: str, doc_id: str
) -> Tuple[Union[ApiHttpStatus, Document], int]:  # noqa: E501
    """get document from set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: Document
    """

    doc = db[set_id].find_one({"_id": ObjectId(doc_id)})
    if not doc:
        error = HTTPStatus.NOT_FOUND
        return create_api_http_status(error), error.value

    doc["documentId"] = str(doc["_id"])
    del doc["_id"]

    document = Document.from_dict(doc)

    # recreate text_content objects
    text_contents = []

    for text_content_dict in doc["textContents"]:
        classification_dict = text_content_dict["predictedClassification"]

        # Build predicted_classification from dictionary
        classification = None
        if classification_dict:
            explanations = []
            for explanation_dict in classification_dict["explanations"]:
                features = []
                for feature_dict in explanation_dict["features"]:
                    feature = Feature.from_dict(feature_dict)
                    features.append(feature)
                explanation = PredictedClassificationExplanation.from_dict(
                    explanation_dict
                )
                explanation.features = features
                explanations.append(explanation)
            classification = PredictedClassification.from_dict(classification_dict)
            classification.explanations = explanations

        # build sensitive_sections from dictionaries
        sensitive_sections_dicts = text_content_dict["sensitiveSections"]
        sensitive_sections = []
        if sensitive_sections_dicts:

            for sensitive_section_dict in sensitive_sections_dicts["sensitiveSections"]:
                sensitive_sections.append(
                    SensitiveSection.from_dict(sensitive_section_dict)
                )

        # build text_content object
        text_content = TextContent.from_dict(text_content_dict)
        text_content.predicted_classification = classification
        text_content.sensitive_sections = SensitiveSections(sensitive_sections)
        text_contents.append(text_content)

    # # add text_contents to document and return it
    document.text_contents = text_contents

    return document, HTTPStatus.OK.value


def get_original_content(set_id: str, doc_id: str) -> Tuple[Union[ApiHttpStatus, str], int]:
    """returns plain text original document content
    
    Arguments:
        set_id {str} -- ID of a set
        doc_id {str} -- ID of a document
    
    Returns:
        Tuple[str, int] -- Tuple containing the plaintext string of the document or an HttpStatus object and the HTTP status code
    """
    document, status = get_document(set_id, doc_id)

    return content_from_text_contents(document), HTTPStatus.OK

def get_redacted_content(set_id: str, doc_id: str) -> Tuple[Union[ApiHttpStatus, str], int]:
    """returns plain text redacted document content
    
    Arguments:
        set_id {str} -- ID of a set
        doc_id {str} -- ID of a document
    
    Returns:
        Tuple[str, int] -- Tuple containing the plaintext string of the redacted document or an HttpStatus object and the HTTP status code
    """
    document, status = get_document(set_id, doc_id)

    return content_from_text_contents(document, redacted=True), HTTPStatus.OK

def classify_text(text: str, explanations=None) -> PredictedClassification:
    """Calculate the classification of a text with the explanation for the predicted classification

    :param text: text for which to calculate classification
    """

    # TODO this is a long blocking call when first training the classifier, needs to return 202 "created" with some URL to the processed element
    trained_model, classifier_type = get_model()

    sensitive = bool(trained_model.predict([text])[0])

    # calculate explanations
    lime = lime_explanation(trained_model, text)

    # shap explanation
    # shap = shap_tree_explanation(trained_model, text)
    # sensitivity of text is the probability of "sensitive" classification
    # FIXME using a libSVM based SVC classifier, this will sometimes output
    # a different result from the .predict() method
    sensitivity = round(lime.predict_proba[1] * 100)

    if explanations:
        feature_weights = {}
        for explanation in explanations:
            feature_list = [(feature.text, feature.weight) for feature in explanation.features]
            feature_weights[explanation.explainer] = list(set(feature_list))
    else:
        feature_weights = {"lime": lime.as_list()}  # , "shap": shap}

    explanation_objects = []

    # iterate over all explanations
    for explainer, explanation in feature_weights.items():
        # sort into sensitive/non sensitive feature based on classification
        features = []

        # iterate over all features
        for feature_info in explanation:

            # regex pattern for finding feature in text
            pattern = "\\b({feature})+\\b".format(feature=feature_info[0])

            

            # calculate custom weight, positive if sensitive, negative otherwise
            # only if no explanations passed (as this has already been done)
            if explanations:
                weight = feature_info[1]
            else:
                # if sensitive feature
                if (sensitive and (feature_info[1] > 0)) or (
                    not sensitive and (feature_info[1] < 0)
                ):
                    weight = abs(feature_info[1])
                # if non sensitive feature
                else:
                    weight = -abs(feature_info[1])

            # match all features in content
            matches = re.finditer(
                pattern,
                text,
                # match in entire text and regardless of case
                flags=re.MULTILINE | re.IGNORECASE,
            )

            # iterate over all matches and sort accordingly
            for match in matches:
                feature = Feature(
                    start_offset=match.span()[0],
                    end_offset=match.span()[1],
                    weight=weight,
                    text=match[0],
                )
                features.append(feature)
        explanation_objects.append(
            PredictedClassificationExplanation(features=features, explainer=explainer)
        )

    # build and return final classification with explanation object
    classification = PredictedClassification(
        # for some reason python boolean can't be casted to JSON
        sensitive=int(sensitive),
        sensitivity=sensitivity,
        explanations=explanation_objects,
        classifier=classifier_type,
    )

    return classification


def calculate_text_content_classifications(
    document: Document,
    explanations: List[PredictedClassificationExplanation]
) -> List[PredictedClassification]:
    """Calculate the classifications for all the text_contents pf a document

    :param document: document for which to calculate text_content classifications
    """

    text_contents = []

    for text_content in document.text_contents:
        try:
            classification = classify_text(text_content.content, explanations)
        except ValueError as e:
            current_app.logger.warn("Could not classify: %s", repr(text_content.content))
            classification = None

        new_text_content = TextContent(
            content=text_content.content, predicted_classification=classification
        )

        text_contents.append(new_text_content)

    return text_contents


def get_predicted_classification(set_id, doc_id):  # noqa: E501
    """Get the explanation for the predicted classification of a document

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: PredictedClassification
    """
    document, status = get_document(set_id, doc_id)

    predicted_classification_query = db[set_id].find_one(
        {"_id": ObjectId(doc_id)}, {"predictedClassification": 1}
    )

    if not predicted_classification_query:
        error = HTTPStatus.NOT_FOUND
        return create_api_http_status(error), error.value

    predicted_classification = predicted_classification_query["predictedClassification"]

    if not predicted_classification:
        error = HTTPStatus.NOT_FOUND
        return create_api_http_status(error), error.value

    # build and return final classification with explanation object
    classification = PredictedClassification.from_dict(predicted_classification)

    explanations_dict = predicted_classification["explanations"]

    explanations = None

    if explanations_dict:
        explanations = []
        for explanation in explanations_dict:
            features = []
            for feature in explanation["features"]:
                features.append(Feature.from_dict(feature))
            explanations.append(
                PredictedClassificationExplanation(
                    features=features, explainer=explanation["explainer"]
                )
            )

    classification.explanations = explanations

    return classification, HTTPStatus.OK.value


def classify(set_id: str, doc_id: str) -> None:
    """calculates document classification and accompanying explanation

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    """

    document, status = get_document(set_id, doc_id)

    # rebuild document content from list of text_content content
    document_content = "".join(
        [text_content.content for text_content in document.text_contents]
    )

    classification = classify_text(document_content)

    try:
        classified_text_contents = calculate_text_content_classifications(document, explanations=classification.explanations)
    except Exception as e:
        current_app.logger.warn("Could not classify document %s in set %s: %s",set_id, document.name, document_content)
    
        raise e

    doc_id = db[set_id].update_one(
        {"_id": ObjectId(doc_id)},
        {
            "$set": {
                # Update document wide predicted classification
                "predictedClassification": classification.to_dict(),
                # Update paragrah classifications
                "textContents": [
                    text_content.to_dict() for text_content in classified_text_contents
                ],
            }
        },
    )


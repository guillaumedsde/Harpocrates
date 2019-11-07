import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import { DocumentApi } from "@harpocrates/api-client";

import PredictedClassification from "./documentPredictedClassification";
import DocumentBody from "./documentBody";

import CustomizedSnackbar from "./status";
import ExplanationToggles from "./explanationToggles";

export default function Document(props) {
  const [document, setDocument] = useState(null);

  const [classification, setClassification] = useState(null);

  const [showSensitiveExplanations, setShowSensitiveExplanations] = useState(
    true
  );
  const [
    showNonSensitiveExplanations,
    setShowNonSensitiveExplanations
  ] = useState(false);

  var api = new DocumentApi();

  // effect for getting document
  useEffect(() => {
    api
      .getDocument(props.documentSetName, props.documentId)
      .then(apiDocument => {
        setDocument(apiDocument);
      });
  }, []);

  // effect for getting prediction and explanation
  useEffect(() => {
    api
      .getPredictedClassificationWithExplanation(
        props.documentSetName,
        props.documentId
      )
      .then(apiClassification => {
        setClassification(apiClassification);
      });
  }, []);

  if (document) {
    return (
      <div>
        <h1>{document.name}</h1>
        <h2>{document.documentId}</h2>
        {classification ? (
          <Box my={2}>
            <PredictedClassification classification={classification} />
          </Box>
        ) : null}

        <DocumentBody
          documentContent={document.content}
          classification={classification}
          showNonSensitive={showNonSensitiveExplanations}
          showSensitive={showSensitiveExplanations}
        />
        <CustomizedSnackbar
          message="Calculating sensitivity classification with explanation..."
          open={classification == null}
          variant="info"
        />
        <ExplanationToggles
          showSensitiveExplanations={showSensitiveExplanations}
          setShowSensitiveExplanations={setShowSensitiveExplanations}
          showNonSensitiveExplanations={showNonSensitiveExplanations}
          setShowNonSensitiveExplanations={setShowNonSensitiveExplanations}
        />
      </div>
    );
  } else {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
}

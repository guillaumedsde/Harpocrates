import React, { useEffect, useState } from "react";

import { DocumentApi } from "@harpocrates/api-client";

export default function Document(props) {
  const [document, setDocument] = useState([]);
  const [predictedClassification, setPredictedClassification] = useState(null);

  var api = new DocumentApi();

  // effect for getting document
  useEffect(
    () => {
      api
        .getDocument(props.documentSetName, props.documentId)
        .then(apiDocument => {
          setDocument(apiDocument);
        });
    },
    [] //dependencies
  );

  api.predictedClassification;
  // effect for getting document classification
  useEffect(
    () => {
      api
        .getPredictedClassification(props.documentSetName, props.documentId)
        .then(apiPredictedClassification => {
          setPredictedClassification(apiPredictedClassification);
        });
    },
    [] //dependencies
  );
  return (
    <div>
      <h1>{document.name}</h1>
      <h2>{document.documentId}</h2>
      <h3>
        {predictedClassification
          ? `Prediction: ${
              predictedClassification.sensitive
                ? "Sensitive Document"
                : "Non-sensitive document"
            } (${predictedClassification.sensitivity}% sensitive)`
          : "getting classification..."}
      </h3>
      <p>{document.content}</p>
    </div>
  );
}

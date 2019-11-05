import React, { useEffect, useState } from "react";

import { DocumentApi } from "@harpocrates/api-client";

export default function PredictedClassification(props) {
  const [predictedClassification, setPredictedClassification] = useState(null);

  var api = new DocumentApi();

  api.predictedClassification;
  // effect for getting document classification
  useEffect(
    () => {
      api
        .getPredictedClassification(props.documentSet, props.documentId)
        .then(apiPredictedClassification => {
          setPredictedClassification(apiPredictedClassification);
        });
    },
    [] //dependencies
  );
  return (
    <div>
      {predictedClassification
        ? `Prediction: ${
            predictedClassification.sensitive
              ? "Sensitive Document"
              : "Non-sensitive document"
          } (${predictedClassification.sensitivity}% sensitive)`
        : "getting classification..."}
    </div>
  );
}

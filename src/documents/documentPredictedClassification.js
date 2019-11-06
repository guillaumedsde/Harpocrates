import React, { useEffect, useState } from "react";

import { DocumentApi } from "@harpocrates/api-client";

import LinearProgress from "@material-ui/core/LinearProgress";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { Box } from "@material-ui/core";

export default function PredictedClassification(props) {
  const [predictedClassification, setPredictedClassification] = useState(null);

  var api = new DocumentApi();

  api.predictedClassification;
  // effect for getting document classification
  useEffect(() => {
    api
      .getPredictedClassification(props.documentSet, props.documentId)
      .then(apiPredictedClassification => {
        setPredictedClassification(apiPredictedClassification);
      });
  }, []);

  if (predictedClassification != null) {
    return (
      <div>
        <Box display="flex" mx={1}>
          <Chip
            label={`${
              predictedClassification.sensitive
                ? "Sensitive Document"
                : "Non-sensitive document"
            }`}
            color={predictedClassification.sensitive ? "primary" : "default"}
            icon={
              predictedClassification.sensitive ? (
                <WarningIcon fontSize="small" />
              ) : (
                <CheckCircleIcon fontSize="small" />
              )
            }
          />
          <Chip
            label={`${predictedClassification.sensitivity}% sensitive`}
            color={predictedClassification.sensitive ? "primary" : "default"}
          />
        </Box>
      </div>
    );
  }

  return (
    <div>
      Evaluating document sensitivity...
      <br />
      <LinearProgress />
    </div>
  );
}

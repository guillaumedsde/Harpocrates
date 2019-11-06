import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import { DocumentApi } from "@harpocrates/api-client";

import PredictedClassification from "./documentPredictedClassification";
import DocumentBody from "./documentBody";

import CustomizedSnackbar from "./status";

export default function Document(props) {
  const [document, setDocument] = useState(null);

  const [gettingExplanation, setGettingExplanation] = useState(true);

  var api = new DocumentApi();

  function handleDoneGettingExplanation(newGettingExplanation) {
    setGettingExplanation(newGettingExplanation);
  }

  // effect for getting document
  useEffect(() => {
    api
      .getDocument(props.documentSetName, props.documentId)
      .then(apiDocument => {
        setDocument(apiDocument);
      });
  }, []);

  console.log(props);

  if (document) {
    return (
      <div>
        <h1>{document.name}</h1>
        <h2>{document.documentId}</h2>
        <Box my={2}>
          <PredictedClassification
            documentSet={props.documentSetName}
            documentId={props.documentId}
          />
        </Box>
        <DocumentBody
          documentSetName={props.documentSetName}
          documentId={props.documentId}
          documentContent={document.content}
          setExplanationDone={handleDoneGettingExplanation}
        />
        <CustomizedSnackbar
          message="Calculating explanation for sensitivity prediction..."
          open={gettingExplanation}
          variant="info"
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

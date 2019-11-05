import React, { useEffect, useState } from "react";

import { DocumentApi } from "@harpocrates/api-client";
import Highlighter from "react-highlight-words";

import PredictedClassification from "./documentPredictedClassification";

export default function Document(props) {
  const [document, setDocument] = useState([]);

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

  return (
    <div>
      <h1>{document.name}</h1>
      <h2>{document.documentId}</h2>
      <PredictedClassification
        documentSet={props.documentSetName}
        documentId={props.documentId}
      />
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight={document.content}
      />
      ,
    </div>
  );
}

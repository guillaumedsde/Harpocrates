import React, { useEffect, useState } from "react";

import { DocumentApi } from "@harpocrates/api-client";

export default function Document(props) {
  const [document, setDocument] = useState([]);

  var api = new DocumentApi();

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
  // tell if no document Sets

  return (
    <div>
      <h1>{document.name}</h1>
      <h2>{document.documentId}</h2>
      <p>{document.content}</p>
    </div>
  );
}

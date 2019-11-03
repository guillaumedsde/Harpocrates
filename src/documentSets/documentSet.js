import React, { useEffect, useState } from "react";

import HarpocratesApi from "@harpocrates/api-client";

export default function DocumentSet(props) {
  const [documents, setDocuments] = useState([]);

  var api = new HarpocratesApi.SetApi();

  useEffect(
    () => {
      api.getSet(props.documentSetName).then(apiSet => {
        setDocuments(apiSet.documents);
      });
    },
    [] //dependencies
  );

  return (
    <ul>
      {documents.map(document => (
        <li key={document.name}>{document.name}</li>
      ))}
    </ul>
  );
}

import React, { useEffect, useState } from "react";

var RestApiForPredictiveAnaltyics = require("rest_api_for_predictive_analtyics");

export default function DocumentSet(props) {
  const [documents, setDocuments] = useState([]);

  var api = new RestApiForPredictiveAnaltyics.SetApi();

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

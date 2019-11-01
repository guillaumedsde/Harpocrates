import React, { useEffect, useState, setState } from "react";

import DocumentSet from "./documentSet";
var RestApiForPredictiveAnaltyics = require("rest_api_for_predictive_analtyics");

export default function DocumentSets() {
  const [documentSets, setDocumentSets] = useState([]);

  var api = new RestApiForPredictiveAnaltyics.SetApi();

  useEffect(
    () => {
      api.getSets().then(apiSets => {
        console.log(apiSets.documentSets);
        setDocumentSets(apiSets.documentSets);
      }, console.error);
    },
    [] //dependencies
  );

  return (
    <div>
      {documentSets.map(set => (
        <DocumentSet key={set.name} name={set.name} />
      ))}
    </div>
  );
}

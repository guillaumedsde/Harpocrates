import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";

var RestApiForPredictiveAnaltyics = require("rest_api_for_predictive_analtyics");

export default function DocumentSetList() {
  const [documentSets, setDocumentSets] = useState([]);

  var api = new RestApiForPredictiveAnaltyics.SetApi();

  useEffect(
    () => {
      api.getSets().then(apiSets => {
        setDocumentSets(apiSets.documentSets);
      });
    },
    [] //dependencies
  );

  return (
    <div>
      <ul>
        {documentSets.map(set => (
          <li key={set.name}>
            <Link to={"/documentSet/" + set.name}>{set.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";

import HarpocratesApi from "@harpocrates/api-client";

export default function DocumentSetList() {
  const [documentSets, setDocumentSets] = useState([]);

  var api = new HarpocratesApi.SetApi();

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

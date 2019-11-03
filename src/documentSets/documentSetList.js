import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";

import { SetApi } from "@harpocrates/api-client";

export default function DocumentSetList() {
  const [documentSets, setDocumentSets] = useState([]);

  var api = new SetApi();

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

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
  // tell if no document Sets
  if (documentSets.length == 0) {
    return (
      <div>
        <p>No Document Sets</p>
      </div>
    );
  }
  // Otherwise display them
  else {
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
}

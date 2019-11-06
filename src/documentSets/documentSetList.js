import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";

import { SetApi } from "@harpocrates/api-client";

import DocumentSetCard from "./documentSetCard";
import { Grid } from "@material-ui/core";

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
      <Grid>
        <h1>No Document Sets</h1>
      </Grid>
    );
  }
  // Otherwise display them
  else {
    return (
      <Grid container spacing={3}>
        {documentSets.map(set => (
          <Grid key={set.name} item m={10}>
            <DocumentSetCard documentSet={set} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

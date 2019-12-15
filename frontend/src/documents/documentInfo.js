import React from "react";
import Grid from "@material-ui/core/Grid";

import PredictedClassification from "./documentPredictedClassification";
import { Typography } from "@material-ui/core";

export default function DocumentInfo(props) {
  return (
    <Grid container alignItems="center">
      {props.document.name ? (
        <Grid item xs>
          <Typography variant="h4">{props.document.name}</Typography>
        </Grid>
      ) : null}
      <Grid item xs>
        <Typography variant="h5">{props.document.documentId}</Typography>
      </Grid>
      {props.classification ? (
        <PredictedClassification classification={props.classification} />
      ) : null}
    </Grid>
  );
}

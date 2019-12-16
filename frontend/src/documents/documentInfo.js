import React from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

export default function DocumentInfo(props) {
  return (
    <Grid container>
      {props.document.name ? (
        <Grid item xs>
          <Typography variant="h4">{props.document.name}</Typography>
        </Grid>
      ) : null}
      <Grid item xs>
        <Typography variant="h6">{props.document.documentId}</Typography>
      </Grid>
    </Grid>
  );
}

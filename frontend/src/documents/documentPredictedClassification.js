import React from "react";

import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { Grid } from "@material-ui/core";

export default function PredictedClassification(props) {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Chip
          style={{ margin: "auto" }}
          label={`${
            props.classification.sensitive
              ? "Sensitive Document"
              : "Non-sensitive document"
          }`}
          color={props.classification.sensitive ? "primary" : "default"}
          icon={
            props.classification.sensitive ? (
              <WarningIcon fontSize="small" />
            ) : (
              <CheckCircleIcon fontSize="small" />
            )
          }
        />
      </Grid>
      <Grid item>
        <Chip
          style={{ margin: "auto" }}
          label={`${props.classification.sensitivity}% sensitive`}
          color={props.classification.sensitive ? "primary" : "default"}
        />
      </Grid>
    </Grid>
  );
}

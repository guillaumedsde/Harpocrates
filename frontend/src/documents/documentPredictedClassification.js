import React from "react";

import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { Grid, Typography, LinearProgress } from "@material-ui/core";

export default function PredictedClassification(props) {
  return (
    <>
      <Grid item xs>
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
      <Grid item xs={12}>
        <Typography variant="body1">
          {props.classification.sensitivity}% sensitive
        </Typography>
        <LinearProgress
          value={props.classification.sensitivity}
          variant="determinate"
          color={props.classification.sensitive ? "secondary" : "primary"}
        />
      </Grid>
    </>
  );
}

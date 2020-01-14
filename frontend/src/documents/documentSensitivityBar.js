import React from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

export default function SensitivityBar(props) {
  return props.classification ? (
    <LinearProgress
      value={props.classification.sensitivity}
      variant="determinate"
      color={props.classification.sensitive ? "secondary" : "primary"}
    />
  ) : (
    <LinearProgress />
  );
}

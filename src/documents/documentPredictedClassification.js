import React from "react";

import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { Box } from "@material-ui/core";

export default function PredictedClassification(props) {
  return (
    <div>
      <Box display="flex" mx={1}>
        <Chip
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
        <Chip
          label={`${props.classification.sensitivity}% sensitive`}
          color={props.classification.sensitive ? "primary" : "default"}
        />
      </Box>
    </div>
  );
}

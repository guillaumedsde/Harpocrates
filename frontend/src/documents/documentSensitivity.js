import React from "react";

export default function Sensitivity(props) {
  return props.classification
    ? `${props.classification.sensitivity}% Sensitive`
    : "Calculating sensitivity";
}

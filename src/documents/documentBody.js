import React from "react";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import createMarker from "react-content-marker";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5),
    lineHeight: 1.5,
    maxWidth: "210mm",
    margin: "auto",

    // preserve text whitespaces
    whiteSpace: "pre-wrap"
  }
}));

export default function DocumentBody(props) {
  const classes = useStyles();
  var rules = [];

  if (props.showSensitive & (props.classification !== null)) {
    props.classification.sensitiveFeatures.forEach(feature => {
      // TODO varied opacity depending on the weight with a minimum and maximum opacity
      //var opacity = Math.abs(feature.weight);
      var opacity = 1;
      rules.push({
        rule: feature.feature,
        tag: x => (
          <mark style={{ backgroundColor: `rgba(255, 0, 0, ${opacity})` }}>
            {x}
          </mark>
        )
      });
    });
  }

  if (props.showNonSensitive & (props.classification !== null)) {
    props.classification.nonSensitiveFeatures.forEach(feature => {
      // TODO varied opacity depending on the weight with a minimum and maximum opacity
      //var opacity = Math.abs(feature.weight);
      var opacity = 1;
      rules.push({
        rule: feature.feature,
        tag: x => (
          <mark style={{ backgroundColor: `rgba(0, 255, 0, ${opacity})` }}>
            {x}
          </mark>
        )
      });
    });
  }

  const MyMarker = createMarker(rules);
  return (
    <Paper className={classes.root}>
      <MyMarker>{props.documentContent}</MyMarker>
    </Paper>
  );
}

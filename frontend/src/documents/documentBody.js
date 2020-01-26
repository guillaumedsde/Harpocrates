import * as React from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

import { uniqueFeatures } from "./explanationBarChart";

import { DocumentApi } from "@harpocrates/api-client";
import TextContentAnnotator from "./textContentAnnotator";

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
  var annotations = [];

  // display sensitive sections (redactions) if there are any
  if (props.sensitiveSections) {
    props.sensitiveSections.sensitiveSections.forEach(feature => {
      annotations.push({
        start: feature.startOffset,
        end: feature.endOffset,
        tag: feature.name
      });
    });
  }
  // display classification explanations if a classification is defined
  if (props.explanations) {
    uniqueFeatures(props.explanations)
      .slice(0, props.nbrExplanations)
      .forEach(explanation => {
        const sensitive = explanation.weight > 0;
        if (
          explanation.text === props.activeFeature ||
          (!sensitive && props.showNonSensitive) ||
          (sensitive && props.showSensitive)
        ) {
          annotations.push({
            start: explanation.startOffset,
            end: explanation.endOffset,
            tag: sensitive ? "sensitive" : "insensitive"
          });
        }
      });
  }

  var api = new DocumentApi();

  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      style={{ height: "85vh", overflow: "auto" }}
    >
      <Grid container alignItems="center" justify="center">
        {props.document.textContents.map(textContent => (
          <TextContentAnnotator
            key={`${textContent.content.split(" ")[0]}${
              textContent.sensitivity
            }`}
            api={api}
            textContent={textContent}
          />
        ))}
      </Grid>
    </Paper>
  );
}

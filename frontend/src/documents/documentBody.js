import * as React from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

import { TextContentApi } from "@harpocrates/api-client";
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
  var api = new TextContentApi();

  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      style={{ height: "85vh", overflow: "auto" }}
    >
      {props.document.textContents.map((textContent, index) => (
        <TextContentAnnotator
          key={index}
          api={api}
          textContent={textContent}
          activeFeature={props.activeFeature}
          setName={props.setName}
          documentId={props.document.documentId}
          textContentIndex={index}
          tag={props.tag}
          showNonSensitive={props.showNonSensitive}
          showSensitive={props.showSensitive}
          explainer={props.explainer}
          granularity={props.document.textSplitGranularity}
        />
      ))}
    </Paper>
  );
}

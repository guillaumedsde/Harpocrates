import * as React from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

import { TextAnnotator } from "react-text-annotate";
import { Grid } from "@material-ui/core";

import { uniqueFeatures } from "./explanationBarChart";
import SensitivityBar from "./documentSensitivityBar";

import {
  SensitiveSection,
  DocumentApi,
  SensitiveSections
} from "@harpocrates/api-client";
import Sensitivity from "./documentSensitivity";

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
  const theme = useTheme();

  const TAG_STYLES = {
    sensitiveExplanation: {
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      color: "black"
    },
    insensitiveExplanation: {
      backgroundColor: "rgba(0, 0, 255, 0.5)",
      color: "black"
    }
  };

  const TAG_COLORS = {
    sensitive: theme.palette.primary.main,
    insensitive: theme.palette.secondary.main
  };

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

  const handleChange = newAnnotations => {
    var sensitiveSections = [];
    newAnnotations.forEach(newAnnotation => {
      if (
        newAnnotation.tag !== "sensitive" &&
        newAnnotation.tag !== "insensitive"
      ) {
        sensitiveSections.push(
          new SensitiveSection(
            newAnnotation.start,
            newAnnotation.end,
            newAnnotation.tag
          )
        );
      }
    });
    api
      .addSensitiveSections(props.setName, props.document.documentId, {
        sensitiveSections: new SensitiveSections(sensitiveSections)
      })
      .then(sensitiveSections => {
        props.setSensitiveSections(sensitiveSections);
      }, console.error);
  };

  return (
    <Paper
      className={classes.root}
      style={{ height: "85vh", overflow: "auto" }}
    >
      <Grid container alignItems="center" justify="center">
        {props.document.lines.map(line => (
          <>
            <Grid item xs={1}>
              {/* <Sensitivity classification={line.predictedClassification} /> */}
              {line.predictedClassification ? (
                <div style={{ width: "75%" }}>
                  <SensitivityBar
                    classification={line.predictedClassification}
                  />
                </div>
              ) : null}
            </Grid>
            <Grid item xs={11}>
              <TextAnnotator
                content={line.content}
                value={[]}
                onChange={handleChange}
                getSpan={span => ({
                  ...span,
                  tag: props.tag,
                  color: TAG_COLORS[props.tag]
                })}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </Paper>
  );
}

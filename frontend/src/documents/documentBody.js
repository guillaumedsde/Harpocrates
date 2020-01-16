import * as React from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

import { TextAnnotator, TokenAnnotator } from "react-text-annotate";
import { Badge } from "@material-ui/core";

import { uniqueFeatures } from "./explanationBarChart";

import {
  SensitiveSection,
  DocumentApi,
  SensitiveSections
} from "@harpocrates/api-client";

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
  if (props.classification !== null) {
    uniqueFeatures(props.classification)
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
        (newAnnotation.tag !== "sensitive") &
        (newAnnotation.tag !== "insensitive")
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
      <TextAnnotator
        tokens={props.document.content.split(/(?!\n)\s+/)}
        content={props.document.content}
        value={annotations}
        onChange={handleChange}
        getSpan={span => ({
          ...span,
          tag: props.tag,
          color: TAG_COLORS[props.tag]
        })}
        // renderMark={props => (
        //   <Badge
        //     className={classes.margin}
        //     badgeContent={props.tag}
        //     color="primary"
        //     key={props.content + props.tag + props.start + props.end}
        //   >
        //     <mark
        //       style={
        //         TAG_STYLES[props.tag] || {
        //           backgroundColor: props.color || "black",
        //           color: "white"
        //         }
        //       }
        //       data-start={props.start}
        //       data-end={props.end}
        //       onClick={() =>
        //         props.onClick({ start: props.start, end: props.end })
        //       }
        //     >
        //       {props.content}
        //     </mark>
        //   </Badge>
        // )}
      />
    </Paper>
  );
}

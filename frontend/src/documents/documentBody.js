import * as React from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { TextAnnotator, TokenAnnotator } from "react-text-annotate";
import { Badge } from "@material-ui/core";

import {
  SensitiveSection,
  DocumentApi,
  SensitiveSections
} from "@harpocrates/api-client";

const TAG_COLORS = {
  22: "black",
  sensitiveExplanation: "red",
  insensitiveExplanation: "blue"
};

const TAG_STYLES = {
  sensitiveExplanation: {
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    color: "black"
    // padding: "0 4px"
  },
  insensitiveExplanation: {
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    color: "black"
    // padding: "0 4px"
  }
};

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

  if (props.sensitiveSections) {
    props.sensitiveSections.sensitiveSections.forEach(feature => {
      // TODO varied opacity depending on the weight with a minimum and maximum opacity
      annotations.push({
        start: feature.startOffset,
        end: feature.endOffset,
        tag: "21"
      });
    });
  }

  if (props.classification !== null) {
    if (props.showNonSensitive) {
      props.classification.nonSensitiveFeatures.forEach(feature => {
        // TODO varied opacity depending on the weight with a minimum and maximum opacity
        annotations.push({
          start: feature.startOffset,
          end: feature.endOffset,
          tag: "insensitiveExplanation"
        });
      });
    }

    if (props.showSensitive) {
      props.classification.nonSensitiveFeatures.forEach(feature => {
        // TODO varied opacity depending on the weight with a minimum and maximum opacity
        annotations.push({
          start: feature.startOffset,
          end: feature.endOffset,
          tag: "sensitiveExplanation"
        });
      });
    }
  }

  var api = new DocumentApi();

  const classes = useStyles();

  const handleChange = newAnnotations => {
    var sensitiveSections = [];
    newAnnotations.forEach(newAnnotation => {
      if (
        (newAnnotation.tag !== "sensitiveExplanation") &
        (newAnnotation.tag !== "insensitiveExplanation")
      ) {
        sensitiveSections.push(
          new SensitiveSection(newAnnotation.start, newAnnotation.end)
        );
      }
    });
    api
      .addSensitiveSections(props.setName, props.docId, {
        sensitiveSections: new SensitiveSections(sensitiveSections)
      })
      .then(sensitiveSections => {
        console.log(sensitiveSections);
        props.setSensitiveSections(sensitiveSections);
      }, console.error);
  };

  return (
    <>
      {/* <select onChange={handleTagChange} value={state.tag}>
        <option value="ORG">ORG</option>
        <option value="PERSON">PERSON</option>
      </select> */}
      <Paper className={classes.root}>
        <TokenAnnotator
          style={
            {
              // fontFamily: "IBM Plex Sans",
              // maxWidth: 500,
              // lineHeight: 1.5
            }
          }
          tokens={props.document.content.split(/(?!\n)\s+/)}
          // content={props.document.content}
          value={annotations}
          onChange={handleChange}
          getSpan={span => ({
            ...span,
            tag: props.tag,
            color: TAG_COLORS[props.tag] || "black"
          })}
          renderMark={props => (
            <Badge
              className={classes.margin}
              badgeContent={props.tag}
              color="primary"
              key={props.content + props.tag}
            >
              <mark
                style={
                  TAG_STYLES[props.tag] || {
                    backgroundColor: props.color || "black",
                    color: "white"
                    // padding: "0 4px"
                  }
                }
                data-start={props.start}
                data-end={props.end}
                onClick={() =>
                  props.onClick({ start: props.start, end: props.end })
                }
              >
                {props.content}
              </mark>
            </Badge>
          )}
        />
      </Paper>
    </>
  );
}

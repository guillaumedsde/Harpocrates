import React from "react";

import { Grid } from "@material-ui/core";
import { SensitiveSection, SensitiveSections } from "@harpocrates/api-client";
import { TextAnnotator } from "react-text-annotate";

import SensitivityBar from "./documentSensitivityBar";
import Sensitivity from "./documentSensitivity";

export default function TextContentAnnotator(props) {
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
    props.api
      .addSensitiveSections(props.setName, props.document.documentId, {
        sensitiveSections: new SensitiveSections(sensitiveSections)
      })
      .then(sensitiveSections => {
        props.setSensitiveSections(sensitiveSections);
      }, console.error);
  };

  return (
    <>
      <Grid item xs={10}>
        <TextAnnotator
          content={props.textContent.content}
          value={[]}
          onChange={handleChange}
          getSpan={span => ({
            ...span,
            tag: props.tag
            // color: TAG_COLORS[props.tag]
          })}
        />
      </Grid>
      <Grid item xs={2}>
        <Sensitivity
          classification={props.textContent.predictedClassification}
        />
        <SensitivityBar
          classification={props.textContent.predictedClassification}
        />
      </Grid>
    </>
  );
}

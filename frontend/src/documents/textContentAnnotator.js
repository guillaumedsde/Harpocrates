import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { SensitiveSection, SensitiveSections } from "@harpocrates/api-client";
import { TextAnnotator } from "react-text-annotate";

import SensitivityBar from "./documentSensitivityBar";
import Sensitivity from "./documentSensitivity";
import { uniqueFeatures } from "./explanationBarChart";

export default function TextContentAnnotator(props) {
  var annotations = [];

  const [sensitiveSections, setSensitiveSections] = useState(
    props.textContent.sensitiveSections
  );

  // const TAG_COLORS = {};

  // display sensitive sections (redactions) if there are any
  if (sensitiveSections) {
    sensitiveSections.sensitiveSections.forEach(feature => {
      annotations.push({
        start: feature.startOffset,
        end: feature.endOffset,
        tag: feature.name
      });
    });
  }

  // display classification explanations if a classification is defined
  if (props.textContent.predictedClassification && props.explainer) {
    const explainerIndex = props.textContent.predictedClassification.explanations
      .map(e => e.explainer)
      .indexOf(props.explainer);
    uniqueFeatures(
      props.textContent.predictedClassification.explanations[explainerIndex]
    )
      .slice(0, props.nbrExplanations)
      .forEach(explanation => {
        const sensitive = Math.sign(explanation.weight) > 0;
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
      .addSensitiveSections(
        props.setName,
        props.documentId,
        props.textContentIndex,
        {
          sensitiveSections: new SensitiveSections(sensitiveSections)
        }
      )
      .then(sensitiveSections => {
        setSensitiveSections(sensitiveSections);
      }, console.error);
  };

  return (
    <Grid container alignItems="center" justify="center">
      {/* don't display in text classification if granularity is document
      because it is already displayed in DocumentInfo */}
      {props.granularity === "document" ? null : (
        <Grid item xs={2}>
          {props.textContent.predictedClassification ? ( //check if predictedClassification has been calculated
            <div style={{ width: "90%" }}>
              {/* Only display text classification percentage if paragraph level classification
          otherwise lines are spread apart */}
              {props.granularity === "paragraph" ? (
                <Sensitivity
                  classification={props.textContent.predictedClassification}
                />
              ) : null}

              <SensitivityBar
                classification={props.textContent.predictedClassification}
              />
            </div>
          ) : null}
        </Grid>
      )}

      <Grid item xs={10}>
        <TextAnnotator
          content={props.textContent.content}
          value={annotations}
          onChange={handleChange}
          getSpan={span => ({
            ...span,
            tag: props.tag
            // color: TAG_COLORS[props.tag]
          })}
        />
      </Grid>
    </Grid>
  );
}

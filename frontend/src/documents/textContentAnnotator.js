import React from "react";

import { Grid } from "@material-ui/core";
import { SensitiveSection, SensitiveSections } from "@harpocrates/api-client";
import { TextAnnotator } from "react-text-annotate";

import SensitivityBar from "./documentSensitivityBar";
import Sensitivity from "./documentSensitivity";
import { uniqueFeatures } from "./explanationBarChart";

export default function TextContentAnnotator(props) {
  var annotations = [];

  // const [sensitiveSections, setSensitiveSections] = useState(null);

  // // display sensitive sections (redactions) if there are any
  // if (props.sensitiveSections) {
  //   props.sensitiveSections.sensitiveSections.forEach(feature => {
  //     annotations.push({
  //       start: feature.startOffset,
  //       end: feature.endOffset,
  //       tag: feature.name
  //     });
  //   });
  // }

  // display classification explanations if a classification is defined
  if (props.textContent.predictedClassification && props.explainer) {
    const explainerIndex = props.textContent.predictedClassification.explanations
      .map(e => e.explainer)
      .indexOf(props.explainer);
    console.log(
      props.textContent.predictedClassification.explanations[explainerIndex]
    );
    uniqueFeatures(
      props.textContent.predictedClassification.explanations[explainerIndex]
    )
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

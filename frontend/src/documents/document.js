import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import uniqBy from "lodash-es/uniqBy";

import { DocumentApi } from "@harpocrates/api-client";

import DocumentInfo from "./documentInfo";
import DocumentBody from "./documentBody";
import ExplanationChart from "./explanationBarChart";
import CustomizedSnackbar from "./status";
import ExplanationToggles from "./explanationToggles";
import RedactionLabelSelect from "./redactionLabelSelect";
import PredictedClassification from "./documentPredictedClassification";

const labels = ["20", "21", "22", "23", "24"];

function absSort(arr) {
  //build comparison function
  function absoluteValueComparison(a, b) {
    return Math.abs(a.weight) - Math.abs(b.weight);
  }
  //call comparison function as callback in array sort
  return arr.sort(absoluteValueComparison).reverse();
}

export default function Document(props) {
  const [document, setDocument] = useState(null);

  const [classification, setClassification] = useState(null);
  const [sensitiveSections, setSensitiveSections] = useState(null);

  const [nbrExplanations, setNbrExplanations] = useState(10);

  const [redactionLabel, setRedactionLabel] = useState(labels[0]);

  const [showSensitiveExplanations, setShowSensitiveExplanations] = useState(
    false
  );
  const [
    showNonSensitiveExplanations,
    setShowNonSensitiveExplanations
  ] = useState(false);

  var api = new DocumentApi();

  // effect for getting document
  useEffect(() => {
    api
      .getDocument(props.documentSetName, props.documentId)
      .then(apiDocument => {
        setDocument(apiDocument);
      });
  }, []);

  // effect for getting prediction and explanation
  useEffect(() => {
    api
      .getPredictedClassificationWithExplanation(
        props.documentSetName,
        props.documentId
      )
      .then(apiClassification => {
        setClassification(apiClassification);
      });
  }, []);

  // effect for getting sensitive sections
  useEffect(() => {
    api
      .getSensitiveSections(props.documentSetName, props.documentId)
      .then(apiSensitiveSections => {
        setSensitiveSections(apiSensitiveSections);
      });
  }, []);

  var allUniqueFeatures = null;

  if (classification != null) {
    // concatenate all features
    const allFeatures = classification.sensitiveFeatures.concat(
      classification.nonSensitiveFeatures
    );
    // remove duplicate features and sort by absolute value
    allUniqueFeatures = absSort(uniqBy(allFeatures, "text"));
  }

  if (document) {
    return (
      <>
        <Grid container spacing={10}>
          <Grid
            item
            // alignItems="flex-start"
            sm
            alignItems="center"
          >
            <Grid container>
              <Grid item style={{ width: "100%" }}>
                <DocumentInfo document={document} />
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <PredictedClassification classification={classification} />
                <Divider />
                <ExplanationToggles
                  classification={classification}
                  showSensitiveExplanations={showSensitiveExplanations}
                  setShowSensitiveExplanations={setShowSensitiveExplanations}
                  showNonSensitiveExplanations={showNonSensitiveExplanations}
                  setShowNonSensitiveExplanations={
                    setShowNonSensitiveExplanations
                  }
                  nbrExplanations={nbrExplanations}
                  setNbrExplanations={setNbrExplanations}
                />
                <Divider />
                <RedactionLabelSelect
                  redactionLabel={redactionLabel}
                  setRedactionLabel={setRedactionLabel}
                  labels={labels}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <DocumentBody
              document={document}
              docId={props.documentId}
              setName={props.documentSetName}
              sensitiveSections={sensitiveSections}
              setSensitiveSections={setSensitiveSections}
              classification={classification}
              showNonSensitive={showNonSensitiveExplanations}
              showSensitive={showSensitiveExplanations}
              tag={redactionLabel}
            />
          </Grid>
          <Grid item sm>
            <ExplanationChart explanationFeatures={allUniqueFeatures} />
          </Grid>
        </Grid>
        <CustomizedSnackbar
          message="Calculating sensitivity classification with explanation..."
          open={classification == null}
          variant="info"
        />
      </>
    );
  } else {
    return <CircularProgress />;
  }
}

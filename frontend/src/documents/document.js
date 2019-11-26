import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { DocumentApi } from "@harpocrates/api-client";

import PredictedClassification from "./documentPredictedClassification";
import DocumentBody from "./documentBody";

import CustomizedSnackbar from "./status";
import ExplanationToggles from "./explanationToggles";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";

const labels = [20, 21, 22, 23, 24];

export default function Document(props) {
  const [document, setDocument] = useState(null);

  const [classification, setClassification] = useState(null);
  const [sensitiveSections, setSensitiveSections] = useState(null);

  const [redactionLabel, setRedactionLabel] = useState(labels[0]);

  const [showSensitiveExplanations, setShowSensitiveExplanations] = useState(
    true
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

  if (document) {
    return (
      <>
        <Grid>
          <Grid container alignItems="center" spacing={2}>
            {document.name ? (
              <Grid item>
                <h1>{document.name}</h1>
              </Grid>
            ) : null}
            <Grid item>
              <h2>{document.documentId}</h2>
            </Grid>
            {classification ? (
              <Grid item>
                <PredictedClassification classification={classification} />
              </Grid>
            ) : null}
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <ExplanationToggles
                showSensitiveExplanations={showSensitiveExplanations}
                setShowSensitiveExplanations={setShowSensitiveExplanations}
                showNonSensitiveExplanations={showNonSensitiveExplanations}
                setShowNonSensitiveExplanations={
                  setShowNonSensitiveExplanations
                }
              />
            </Grid>
            <Grid item>
              <InputLabel id="demo-simple-select-label">
                Redaction label
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={redactionLabel}
                autoWidth
                onChange={event => {
                  setRedactionLabel(event.target.value);
                }}
              >
                {labels.map(label => (
                  <MenuItem key={label} value={label}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>

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
        <CustomizedSnackbar
          message="Calculating sensitivity classification with explanation..."
          open={classification == null}
          variant="info"
        />
      </>
    );
  } else {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
}

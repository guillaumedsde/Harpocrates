import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import uniqBy from "lodash-es/uniqBy";

import { DocumentApi } from "@harpocrates/api-client";

import DocumentInfo from "./documentInfo";
import PredictedClassification from "./documentPredictedClassification";
import DocumentBody from "./documentBody";
import ExplanationChart from "./explanationBarChart";
import CustomizedSnackbar from "./status";
import ExplanationToggles from "./explanationToggles";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography
} from "@material-ui/core";

const labels = ["20", "21", "22", "23", "24"];

export default function Document(props) {
  const [document, setDocument] = useState(null);

  const [classification, setClassification] = useState(null);
  const [sensitiveSections, setSensitiveSections] = useState(null);

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
    // remove duplicate features
    allUniqueFeatures = uniqBy(allFeatures, "text");
  }

  if (document) {
    return (
      <>
        <Grid container spacing={10}>
          <Grid
            item
            // alignItems="flex-start"
            sm
          >
            <DocumentInfo document={document} classification={classification} />
            <Grid container alignItems="center" spacing>
              <Grid item>
                <ExplanationToggles
                  classification={classification}
                  showSensitiveExplanations={showSensitiveExplanations}
                  setShowSensitiveExplanations={setShowSensitiveExplanations}
                  showNonSensitiveExplanations={showNonSensitiveExplanations}
                  setShowNonSensitiveExplanations={
                    setShowNonSensitiveExplanations
                  }
                />
              </Grid>
              <Grid container alignItems="center">
                <Select
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
                <Typography>Redaction label </Typography>
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

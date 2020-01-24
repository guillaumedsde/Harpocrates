import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { DocumentApi } from "@harpocrates/api-client";

import DocumentInfo from "./documentInfo";
import DocumentBody from "./documentBody";
import ExplanationChart, { uniqueFeatures } from "./explanationBarChart";
import CustomizedSnackbar from "./status";
import ExplanationToggles from "./explanationToggles";
import RedactionLabelSelect from "./redactionLabelSelect";
import PredictedClassification from "./documentPredictedClassification";
import ExportButtons from "./exportButtons";

const labels = ["20", "21", "22", "23", "24"];

export default function Document(props) {
  const [document, setDocument] = useState(null);

  const [activeFeature, setActiveFeature] = useState(null);

  const [classification, setClassification] = useState(null);
  const [sensitiveSections, setSensitiveSections] = useState(null);

  const [explainer, setExplainer] = useState(null);
  const [explainers, setExplainers] = useState([]);

  const [nbrExplanations, setNbrExplanations] = useState(null);
  const [maxExplanations, setMaxExplanations] = useState(null);

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
    api.getDocument(props.documentSetName, props.documentId).then(
      apiDocument => {
        setDocument(apiDocument);
      },
      reason => {
        console.error(reason);
      }
    );
  }, []);

  // effect for getting prediction and explanation
  useEffect(() => {
    api
      .getPredictedClassification(props.documentSetName, props.documentId)
      .then(
        apiClassification => {
          // create list of explainers from API response
          const apiExplainers = apiClassification.explanations.map(
            explanation => explanation.explainer
          );

          // update list of explainers
          setExplainers(apiExplainers);

          // set current explainer to first explainer
          setExplainer(apiExplainers[0]);

          // calculate maximum number of explanation features from
          // number of unique features in first explanation
          const apiMaxClassification = uniqueFeatures(
            apiClassification.explanations[0]
          ).length;

          setMaxExplanations(apiMaxClassification);
          setNbrExplanations(apiMaxClassification);
          setClassification(apiClassification);
        },
        reason => {
          console.error(reason);
        }
      );
  }, []);

  // effect for getting sensitive sections
  useEffect(() => {
    api.getSensitiveSections(props.documentSetName, props.documentId).then(
      apiSensitiveSections => {
        setSensitiveSections(apiSensitiveSections);
      },
      reason => {
        console.error(reason);
      }
    );
  }, []);

  if (document) {
    return (
      <>
        <Grid container spacing={5}>
          <Grid
            item
            // alignItems="flex-start"
            sm
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
                  maxExplanations={maxExplanations}
                  explainer={explainer}
                  setExplainer={setExplainer}
                  explainers={explainers}
                />
                <Divider />
                <RedactionLabelSelect
                  redactionLabel={redactionLabel}
                  setRedactionLabel={setRedactionLabel}
                  labels={labels}
                />
                <Divider />
                <ExportButtons />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <DocumentBody
              document={document}
              setName={props.documentSetName}
              sensitiveSections={sensitiveSections}
              setSensitiveSections={setSensitiveSections}
              explanations={
                classification
                  ? classification.explanations[explainers.indexOf(explainer)]
                  : []
              }
              showNonSensitive={showNonSensitiveExplanations}
              showSensitive={showSensitiveExplanations}
              tag={redactionLabel}
              activeFeature={activeFeature}
              nbrExplanations={nbrExplanations}
            />
          </Grid>
          <Grid item sm>
            <ExplanationChart
              nbrExplanations={nbrExplanations}
              explanations={
                classification
                  ? classification.explanations[explainers.indexOf(explainer)]
                  : []
              }
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
            />
          </Grid>
        </Grid>
        <CustomizedSnackbar
          message="Calculating sensitivity classification with explanation..."
          open={classification === null}
          variant="info"
        />
      </>
    );
  } else {
    return <CircularProgress />;
  }
}

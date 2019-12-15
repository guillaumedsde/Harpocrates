import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";

export default function ExplanationToggles(props) {
  return (
    <>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={props.showSensitiveExplanations}
              disabled={props.classification === null}
              onChange={() => {
                props.setShowSensitiveExplanations(
                  !props.showSensitiveExplanations
                );
              }}
            />
          }
          label={
            <div>
              Why is this{" "}
              <div
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.25)",
                  display: "inline-block"
                }}
              >
                sensitive
              </div>
              ?
            </div>
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={props.showNonSensitiveExplanations}
              disabled={props.classification === null}
              onChange={() => {
                props.setShowNonSensitiveExplanations(
                  !props.showNonSensitiveExplanations
                );
              }}
            />
          }
          label={
            <div>
              Why is this{" "}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 255, 0.25)",
                  display: "inline-block"
                }}
              >
                not sensitive
              </div>
              ?
            </div>
          }
        />
      </Grid>
    </>
  );
}

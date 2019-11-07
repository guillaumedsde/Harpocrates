import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

export default function ExplanationToggles(props) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={props.showSensitiveExplanations}
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
                backgroundColor: "rgba(255, 0, 0, 0.75)",
                display: "inline-block"
              }}
            >
              sensitive
            </div>
            ?
          </div>
        }
      />
      <FormControlLabel
        control={
          <Switch
            checked={props.showNonSensitiveExplanations}
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
                backgroundColor: "rgba(0, 0, 255, 0.75)",
                display: "inline-block"
              }}
            >
              not sensitive
            </div>
            ?
          </div>
        }
      />
    </FormGroup>
  );
}

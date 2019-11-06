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
            Why is this <b>sensitive</b>?
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
            Why is this <b>not sensitive</b>?
          </div>
        }
      />
    </FormGroup>
  );
}

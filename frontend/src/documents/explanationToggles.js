import React from "react";

import Switch from "@material-ui/core/Switch";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";

export default function ExplanationToggles(props) {
  return (
    <List subheader={<ListSubheader>Explanations</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <WarningIcon />
        </ListItemIcon>
        <ListItemText id="switch-sensitive-label" primary="Sensitive" />
        <ListItemSecondaryAction>
          <Switch
            checked={props.showSensitiveExplanations}
            disabled={props.classification === null}
            inputProps={{ "aria-labelledby": "switch-sensitive-label" }}
            onChange={() => {
              props.setShowSensitiveExplanations(
                !props.showSensitiveExplanations
              );
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText id="switch-non-sensitive-label" primary="Not Sensitive" />
        <ListItemSecondaryAction>
          <Switch
            checked={props.showNonSensitiveExplanations}
            disabled={props.classification === null}
            inputProps={{ "aria-labelledby": "switch-non-sensitive-label" }}
            onChange={() => {
              props.setShowNonSensitiveExplanations(
                !props.showNonSensitiveExplanations
              );
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

import React from "react";

import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

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
            color="secondary"
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
            color="primary"
            inputProps={{ "aria-labelledby": "switch-non-sensitive-label" }}
            onChange={() => {
              props.setShowNonSensitiveExplanations(
                !props.showNonSensitiveExplanations
              );
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Typography id="discrete-slider" gutterBottom>
              Explanation features
            </Typography>
          }
          secondary={
            <Slider
              defaultValue={props.nbrExplanations}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={5}
              disabled={true} // enable when implemented in backend
              // disabled={props.classification === null}
              marks
              min={0}
              max={50}
              onChange={event => {
                props.setNbrExplanations(event.target.value);
              }}
            />
          }
        />
      </ListItem>
    </List>
  );
}

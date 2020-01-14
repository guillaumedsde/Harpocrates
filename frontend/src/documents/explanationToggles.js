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
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function ExplanationToggles(props) {
  return (
    <List subheader={<ListSubheader>Explanations</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText
          id="select-explainer"
          primary="Classification Explainer"
        />
        <ListItemSecondaryAction>
          <Select
            value="Lime"
            autoWidth
            disabled
            inputProps={{ "aria-labelledby": "select-explainer" }}
            // onChange={event => {
            //   props.setRedactionLabel(event.target.value);
            // }}
          >
            <MenuItem key="Lime" value="Lime">
              Lime
            </MenuItem>
            {/* {props.labels.map(label => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))} */}
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
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
            <Typography component={"span"} id="discrete-slider" gutterBottom>
              Number of explanation features
            </Typography>
          }
          secondary={
            <Slider
              value={props.nbrExplanations || 0}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              // disabled={true} // enable when implemented in backend
              disabled={
                props.classification === null || props.nbrExplanations === null
              }
              marks
              min={0}
              max={props.maxExplanations || 0}
              onChange={(event, value) => {
                props.setNbrExplanations(value);
              }}
            />
          }
        />
      </ListItem>
    </List>
  );
}

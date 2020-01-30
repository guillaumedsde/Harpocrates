import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import { CircularProgress } from "@material-ui/core";

import SensitivityBar from "./documentSensitivityBar";
import Sensitivity from "./documentSensitivity";

export default function PredictedClassification(props) {
  return (
    <List subheader={<ListSubheader>Classification</ListSubheader>}>
      {props.classification ? (
        <ListItem>
          <ListItemIcon>
            {props.classification.sensitive ? <WarningIcon /> : <CheckIcon />}
          </ListItemIcon>
          <ListItemText
            primary={
              props.classification.sensitive ? "Sensitive" : "Not sensitive"
            }
          />
        </ListItem>
      ) : (
        <ListItem>
          <ListItemIcon>
            <CircularProgress />
          </ListItemIcon>
          <ListItemText primary="Not Yet Classified" />
        </ListItem>
      )}

      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Sensitivity classification={props.classification} />}
          secondary={<SensitivityBar classification={props.classification} />}
          secondaryTypographyProps={{ component: "div" }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <HorizontalSplitIcon />
        </ListItemIcon>
        <ListItemText id="select-granularity" primary="Content split level" />
        <ListItemSecondaryAction>
          <Select
            value={props.granularity}
            autoWidth
            disabled
            inputProps={{ "aria-labelledby": "select-granularity" }}
          >
            <MenuItem key={props.granularity} value={props.granularity}>
              {props.granularity}
            </MenuItem>
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText id="select-classifier" primary="Classifier" />
        <ListItemSecondaryAction>
          <Select
            value={
              props.classification ? props.classification.classifier : "None"
            }
            autoWidth
            disabled
            inputProps={{ "aria-labelledby": "select-classifier" }}
            // onChange={event => {
            //   props.setRedactionLabel(event.target.value);
            // }}
          >
            <MenuItem value="None" disabled>
              None
            </MenuItem>
            {props.classification ? (
              <MenuItem
                key={props.classification.classifier}
                value={props.classification.classifier}
              >
                {props.classification.classifier}
              </MenuItem>
            ) : null}
            {/* {props.labels.map(label => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))} */}
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

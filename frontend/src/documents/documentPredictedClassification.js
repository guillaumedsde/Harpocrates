import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";
import { CircularProgress } from "@material-ui/core";

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
          primary={
            props.classification
              ? `${props.classification.sensitivity}% Sensitive`
              : "Calculating sensitivity"
          }
          secondary={
            props.classification ? (
              <LinearProgress
                value={props.classification.sensitivity}
                variant="determinate"
                color={props.classification.sensitive ? "secondary" : "primary"}
              />
            ) : (
              <LinearProgress />
            )
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText id="select-classifier" primary="Classifier" />
        <ListItemSecondaryAction>
          <Select
            value="Support-vector machine"
            autoWidth
            disabled
            inputProps={{ "aria-labelledby": "select-classifier" }}
            // onChange={event => {
            //   props.setRedactionLabel(event.target.value);
            // }}
          >
            <MenuItem
              key="Support-vector machine"
              value="Support-vector machine"
            >
              Support-vector machine
            </MenuItem>
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

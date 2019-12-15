import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LabelIcon from "@material-ui/icons/Label";

export default function RedactionLabelSelect(props) {
  return (
    <List subheader={<ListSubheader>Redactions</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText id="select-label" primary="Redaction label" />
        <ListItemSecondaryAction>
          <Select
            id="demo-simple-select"
            value={props.redactionLabel}
            autoWidth
            inputProps={{ "aria-labelledby": "select-label" }}
            onChange={event => {
              props.setRedactionLabel(event.target.value);
            }}
          >
            {props.labels.map(label => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

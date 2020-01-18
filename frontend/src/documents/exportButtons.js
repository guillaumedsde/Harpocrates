import React from "react";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function ExportButtons() {
  return (
    <List subheader={<ListSubheader>Export</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <GetAppIcon />
        </ListItemIcon>
        <ListItemText id="select-label" primary="Redacted file" />
        <ListItemSecondaryAction>
          <Button variant="contained" color="primary" disabled={true}>
            Download
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import GetAppIcon from "@material-ui/icons/GetApp";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function ExportButtons(props) {
  const [downloadVersion, setDownloadVersion] = useState("redacted");
  return (
    <List subheader={<ListSubheader>Export</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <GetAppIcon />
        </ListItemIcon>
        <ListItemText
          id="select-explainer"
          primary={
            <Select
              value={downloadVersion}
              autoWidth
              inputProps={{ "aria-labelledby": "select-download-version" }}
              onChange={event => {
                setDownloadVersion(event.target.value);
              }}
            >
              <MenuItem value="redacted">Redacted content</MenuItem>
              <MenuItem value="original">Original content</MenuItem>
            </Select>
          }
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="primary"
            href={`${props.api.apiClient.basePath}/documentSet/${props.setName}/${props.documentId}/${downloadVersion}`}
            download
          >
            Download
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

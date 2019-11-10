import React, { useEffect, useState } from "react";

import { navigate } from "@reach/router";

import { SetApi } from "@harpocrates/api-client";

import { Grid, LinearProgress } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DocumentSetList() {
  const [documentSets, setDocumentSets] = useState(null);
  // TODO find better way to retrigger document list update on document delete
  const [triggerRequest, setTriggerRequest] = useState(false)
  var api = new SetApi();

  useEffect(
    () => {
      api.getSets().then(apiSets => {
        setDocumentSets(apiSets.documentSets);
      });
    },
    [triggerRequest] //dependencies
  );

  const handleListItemClick = (event, index) => {
    navigate(`/documentSet/${index}`);
  };

  const deleteItem = React.useCallback((event, setId) => {
    api.deleteSet(setId).then( response => {
      setTriggerRequest(!triggerRequest);
      console.log("deleted set")})
  })

  if (documentSets === null) {
    return <LinearProgress />;
  }
  // tell if no document Sets
  else if (documentSets.length === 0) {
    return <h1>No Document Sets</h1>;
  }
  // Otherwise display them
  else {
    return (
      <List>
        {documentSets.map(set => (
          <ListItem
            key={set.setId}
            button
            onClick={event => handleListItemClick(event, set.name)}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={set.name}
              secondary={`${set.documentCount} documents (${set.size})`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={event => deleteItem(event,
                  set.name)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

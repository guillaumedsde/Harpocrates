import React, { useEffect, useState } from "react";

import { navigate } from "@reach/router";

import { SetApi } from "@harpocrates/api-client";

import { LinearProgress, Container } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import NewSetForm from "./newSetForm";

export default function DocumentSets() {
  const [documentSets, setDocumentSets] = useState(null);
  // TODO find better way to retrigger document list update on document delete
  const [triggerRequest, setTriggerRequest] = useState(1);

  const [loading, setLoading] = useState(true);

  var api = new SetApi();

  useEffect(
    () => {
      api.getSets().then(apiSets => {
        setDocumentSets(apiSets.documentSets);
        setLoading(false);
      });
    },
    [triggerRequest] //dependencies
  );

  const handleListItemClick = (event, index) => {
    navigate(`/documentSets/${index}`);
  };

  const deleteItem = React.useCallback((event, setId) => {
    setLoading(true);
    api.deleteSet(setId).then(() => {
      setTriggerRequest(Math.random());
    });
  });

  if (documentSets === null) {
    return <LinearProgress />;
  }

  const newSetForm = (
    <NewSetForm setLoading={setLoading} setTriggerRequest={setTriggerRequest} />
  );

  var documentSetList;
  if (documentSets.length === 0) {
    documentSetList = <h1>No Document Sets</h1>;
  } else {
    documentSetList = (
      <List>
        {documentSets.map(set => (
          <ListItem
            key={set.setId}
            button
            onClick={event => handleListItemClick(event, set.name)}
            selected={triggerRequest === set.name}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={set.name}
              secondary={`${set.documentCount} documents`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={event => deleteItem(event, set.name)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <>
      {loading ? <LinearProgress /> : null}
      <Container maxWidth="md">
        {documentSetList}
        {newSetForm}
      </Container>
    </>
  );
}

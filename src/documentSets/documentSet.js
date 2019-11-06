import React, { useEffect, useState } from "react";

import { navigate } from "@reach/router";

import { SetApi } from "@harpocrates/api-client";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from "@material-ui/icons/Delete";

import DocumentUploadForm from "../documents/documentUploadForm";
import { LinearProgress } from "@material-ui/core";

export default function DocumentSet(props) {
  const [documents, setDocuments] = useState(null);

  var api = new SetApi();

  const handleListItemClick = (event, setId, docId) => {
    navigate(`/documentSet/${setId}/${docId}`);
  };

  useEffect(
    () => {
      api.getSet(props.documentSetName).then(apiSet => {
        setDocuments(apiSet.documents);
      });
    },
    [] //dependencies
  );

  if (documents === null) {
    return <LinearProgress />;
  }
  // tell if no document Sets
  else if (documents.length === 0) {
    return (
      <div>
        <h1>No Documents</h1>
        <DocumentUploadForm documentSet={props.documentSetName} />
      </div>
    );
  } else {
    return (
      <div>
        <List>
          {documents.map(document => (
            <ListItem
              key={document.documentId}
              button
              onClick={event =>
                handleListItemClick(
                  event,
                  props.documentSetName,
                  document.documentId
                )
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <InsertDriveFileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={document.documentId}
                // secondary={`${set.documentCount} documents (${set.size})`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <DocumentUploadForm documentSet={props.documentSetName} />
      </div>
    );
  }
}

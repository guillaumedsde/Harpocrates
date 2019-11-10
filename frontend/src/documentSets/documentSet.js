import React, { useEffect, useState } from "react";

import { navigate } from "@reach/router";

import { SetApi, DocumentApi } from "@harpocrates/api-client";

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
  const [loading, setLoading] = useState(true)
  // TODO find better way to retrigger document list update on document delete
  const [triggerListRefresh, setTriggerListRefresh] = useState(1)

  var api = new SetApi();
  var docApi = new DocumentApi();

  const handleListItemClick = (event, setId, docId) => {
    navigate(`/documentSet/${setId}/${docId}`);
  };

  const deleteItem = React.useCallback((event, setId, docId) => {
    setLoading(true)
    docApi.deleteDocument(setId, docId).then( response => {
      setTriggerListRefresh(Math.random());
  })})

  useEffect(
    () => {
      setLoading(true)
      api.getSet(props.documentSetName).then(apiSet => {
        setDocuments(apiSet.documents);
        setLoading(false)
      });
    },
    [triggerListRefresh] //dependencies
  );

  if (documents === null) {
    return <LinearProgress />;
  }

  const documentUploadForm = <DocumentUploadForm documentSet={props.documentSetName} triggerDocListRefresh={setTriggerListRefresh} setLoading={setLoading}/>
  // tell if no document Sets
  if (documents.length === 0) {
    return (
      <div>
        <h1>No Documents</h1>
        {documentUploadForm}
      </div>
    );
  } else {
    return (
      <div>
        {loading? <LinearProgress />:null}
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
                <IconButton edge="end" aria-label="delete" onClick={event => deleteItem(event,
                  props.documentSetName,
                  document.documentId)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {documentUploadForm}
      </div>
    );
  }
}

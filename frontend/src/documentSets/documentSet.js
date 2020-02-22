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
import SensitivityBar from "../documents/documentSensitivityBar";
import Sensitivity from "../documents/documentSensitivity";

import { LinearProgress, Container } from "@material-ui/core";

export default function DocumentSet(props) {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);
  // TODO find better way to retrigger document list update on document delete
  const [triggerListRefresh, setTriggerListRefresh] = useState(1);

  var api = new SetApi();
  var docApi = new DocumentApi();

  const handleListItemClick = (event, setId, documentId) => {
    navigate(`/documentSets/${setId}/${documentId}`);
  };

  const deleteItem = React.useCallback((event, setId, documentId) => {
    setLoading(true);
    docApi.deleteDocument(setId, documentId).then(response => {
      setTriggerListRefresh(Math.random());
    });
  });

  useEffect(
    () => {
      setLoading(true);
      api.getSet(props.documentSetName).then(apiSet => {
        setDocuments(apiSet.documents);
        setLoading(false);
      });
    },
    [triggerListRefresh] //dependencies
  );

  if (documents === null) {
    return <LinearProgress />;
  }

  const documentUploadForm = (
    <DocumentUploadForm
      documentSet={props.documentSetName}
      triggerDocListRefresh={setTriggerListRefresh}
      setLoading={setLoading}
    />
  );

  var documentList;
  if (documents.length === 0) {
    documentList = <h1>No Documents</h1>;
  } else {
    documentList = (
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
              primary={document.name || document.documentId}
              secondary={
                process.env.TEST_MODE < 2 ? (
                  <>
                    <Sensitivity
                      classification={document.predictedClassification}
                    />
                    <SensitivityBar
                      classification={document.predictedClassification}
                    />
                  </>
                ) : null
              }
              secondaryTypographyProps={{ component: "div" }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={event =>
                  deleteItem(event, props.documentSetName, document.documentId)
                }
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
    <div>
      {loading ? <LinearProgress /> : null}
      <Container maxWidth="md">
        {documentList}
        {documentUploadForm}
      </Container>
    </div>
  );
}

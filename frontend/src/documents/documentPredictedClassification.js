import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { LinearProgress } from "@material-ui/core";

export default function PredictedClassification(props) {
  return (
    <List subheader={<ListSubheader>Sensitivity</ListSubheader>}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${
            props.classification ? props.classification.sensitivity : "? "
          }% sensitive`}
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
    </List>
  );
}

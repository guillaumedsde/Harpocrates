import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";

import { Link } from "@reach/router";

//
export const mainListItems = (
  <>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="documentSets">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Document Sets" />
    </ListItem>
  </>
);

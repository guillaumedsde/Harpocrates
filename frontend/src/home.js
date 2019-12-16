import React from "react";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Link } from "@reach/router";

export default function Home() {
  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Grid item xs={5}>
        <Typography component="h1" variant="h1">
          <b>η</b> Harpocrates
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography component="h4" variant="h5">
          Sensitive document redactions powered by Machine Learning
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <List>
          <ListItem button component={Link} to="documentSets">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Document sets" />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

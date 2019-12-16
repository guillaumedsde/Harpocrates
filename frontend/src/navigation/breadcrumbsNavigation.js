import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

export default function BreadcrumbsNavigation(props) {
  const classes = useStyles();

  const urlFragments = props.location.pathname.split("/");
  var locations = [];
  var path = "";
  urlFragments.forEach(location => {
    path = path.concat(location).concat("/");
    const locationObj = { path: path, location: location };
    console.log(locationObj);
    locations.push(locationObj);
  });

  return (
    <Paper elevation={0} className={classes.paper}>
      <Breadcrumbs aria-label="breadcrumb">
        {locations.map(location => (
          <Link key={location} color="inherit" href={location.path}>
            {location.location}
          </Link>
        ))}
      </Breadcrumbs>
    </Paper>
  );
}

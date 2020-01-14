import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(1, 2)
  },
  link: {
    display: "flex"
  }
}));

export default function BreadcrumbsNavigation(props) {
  const classes = useStyles();

  const urlFragments = props.location.pathname.split("/");
  var locations = [];

  locations.push({
    path: "/",
    location: (
      <>
        <HomeIcon />
        Home
      </>
    )
  });
  var path = "";
  urlFragments.forEach(location => {
    if (location) {
      path = path.concat(location).concat("/");
      const locationObj = { path: path, location: location };
      locations.push(locationObj);
    }
  });

  return (
    <Paper elevation={0} className={classes.paper} style={{ maxWidth: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        maxItems={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {locations.map(location => (
          <Link
            key={location}
            color="inherit"
            href={location.path}
            className={classes.link}
          >
            {location.location}
          </Link>
        ))}
      </Breadcrumbs>
    </Paper>
  );
}

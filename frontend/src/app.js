import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./home";

import DocumentSets from "./documentSets/documentSets";
import DocumentSet from "./documentSets/documentSet";
import Document from "./documents/document";
// import Document from "./document";

import Dashboard from "./dashboard";

const App = () => {
  // dark mode
  const [darkTheme, setDarkTheme] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkTheme ? "dark" : "light"
        }
      }),
    [darkTheme, setDarkTheme]
  );
  return (
    // does nothing in production
    // but gives additional warnings in development
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Dashboard darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <Router>
          <Home path="/" />
          <DocumentSets path="documentSets" />
          <DocumentSet path="documentSets/:documentSetName" />
          <Document path="documentSets/:documentSetName/:documentId" />
        </Router>
      </Dashboard>
    </ThemeProvider>
    // </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

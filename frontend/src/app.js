import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Home from "./home";

import DocumentSets from "./documentSets/documentSets";
import DocumentSet from "./documentSets/documentSet";
import Document from "./documents/document";
// import Document from "./document";

import Dashboard from "./dashboard";

const App = () => {
  return (
    // does nothing in production
    // but gives additional warnings in development
    // <React.StrictMode>
      <Dashboard>
        <Router>
          <Home path="/" />
          <DocumentSets path="documentSets" />
          <DocumentSet path="documentSet/:documentSetName" />
          <Document path="documentSet/:documentSetName/:documentId" />
        </Router>
      </Dashboard>
    // </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Home from "./home";
import DocumentSets from "./documentSets/documentSets";
import DocumentSet from "./documentSets/documentSet";
import Document from "./documents/document";
// import Document from "./document";

const App = () => {
  return (
    // does nothing in production
    // but gives additional warnings in development
    <React.StrictMode>
      <nav>
        <Link to="/">Home</Link>
        <Link to="documentSets">Document Sets</Link>
      </nav>
      <Router>
        <Home path="/" />
        <DocumentSets path="documentSets" />
        <DocumentSet path="documentSet/:documentSetName" />
        <Document path="documentSet/:documentSetName/:documentId" />
      </Router>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

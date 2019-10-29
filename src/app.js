import React from "react";
import { render } from "react-dom";
import DocumentSets from "./documentSets";

const App = () => {
  return (
    // does nothing in production
    // but gives additional warnings in development
    <React.StrictMode>
      <div>
        <DocumentSets />
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

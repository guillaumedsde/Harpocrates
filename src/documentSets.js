import React, { useEffect } from "react";

import DocumentSet from "./documentSet";
import { ReactSetApi } from "./ReactApiClient";

export default function DocumentSets() {
  var documentSets = [
    "first document set name",
    "the second document set name"
  ];

  var api = new ReactSetApi();

  useEffect(() => {
    api.documentsetGet().then(({ apiDocumentSets }) => {
      console.log(apiDocumentSets);
    }, console.error);
  });

  return (
    <div>
      {documentSets.map(setName => (
        <DocumentSet key={setName} name={setName} />
      ))}
    </div>
  );
}

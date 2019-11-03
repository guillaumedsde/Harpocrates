import React, { useEffect, useState } from "react";

import { SetApi } from "@harpocrates/api-client";

import DocumentUploadForm from "../documents/documentUploadForm";

export default function DocumentSet(props) {
  const [documents, setDocuments] = useState([]);

  var api = new SetApi();

  useEffect(
    () => {
      api.getSet(props.documentSetName).then(apiSet => {
        setDocuments(apiSet.documents);
      });
    },
    [] //dependencies
  );

  return (
    <div>
      <ul>
        {documents.map(document => (
          // FIXME document name is "NaN"
          <li key={document.name}>{document.name}</li>
        ))}
      </ul>
      <DocumentUploadForm documentSet={props.documentSetName} />
    </div>
  );
}

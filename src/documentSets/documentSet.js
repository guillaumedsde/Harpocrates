import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";

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
  // tell if no document Sets
  if (documents.length == 0) {
    return (
      <div>
        <p>No Documents</p>
        <DocumentUploadForm documentSet={props.documentSetName} />
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          {documents.map(document => (
            // FIXME document name is "NaN"
            <li key={document.documentId}>
              <Link
                to={
                  "/documentSet/" +
                  props.documentSetName +
                  "/" +
                  document.documentId
                }
              >
                {document.documentId}
              </Link>
            </li>
          ))}
        </ul>
        <DocumentUploadForm documentSet={props.documentSetName} />
      </div>
    );
  }
}

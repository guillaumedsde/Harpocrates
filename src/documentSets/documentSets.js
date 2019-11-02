import React from "react";

import NewSetForm from "./newSetForm";
import DocumentSetList from "./documentSetList";

export default function DocumentSets() {
  return (
    <div>
      <DocumentSetList />
      <NewSetForm />
    </div>
  );
}

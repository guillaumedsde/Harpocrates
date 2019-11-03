import React, { useState } from "react";

import HarpocratesApi, { DocumentSet } from "@harpocrates/api-client";

export default function NewSetForm() {
  const [newSetName, setNewSetName] = useState("");

  var api = new HarpocratesApi.SetApi();

  const handleSubmit = event => {
    event.preventDefault();
    const newDocumentSet = new DocumentSet(newSetName);
    // TODO error handling
    api.createSet(newDocumentSet);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newSetName">
        <input
          id="newSetName"
          value={newSetName}
          type="text"
          placeholder="Name of the New Set"
          onChange={event => setNewSetName(event.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

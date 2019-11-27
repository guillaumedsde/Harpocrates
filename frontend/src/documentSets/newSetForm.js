import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { SetApi, DocumentSet } from "@harpocrates/api-client";

export default function NewSetForm(props) {
  const [newSetName, setNewSetName] = useState("");

  var api = new SetApi();

  const handleSubmit = event => {
    event.preventDefault();
    props.setLoading(true);
    const newDocumentSet = new DocumentSet(newSetName);
    // TODO error handling
    api.createSet(newDocumentSet).then(() => {
      props.setTriggerRequest(newDocumentSet.name);
    });
    setNewSetName("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div>
        <TextField
          label="Name of the New Set"
          margin="normal"
          id="newSetName"
          value={newSetName}
          type="text"
          placeholder="sensitive_collection_1"
          onChange={event => setNewSetName(event.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" value="Submit">
        Submit
      </Button>
    </form>
  );
}

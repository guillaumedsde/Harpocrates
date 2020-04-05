import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { SetApi, DocumentSet } from "@harpocrates/api-client";

export default function NewSetForm(props) {
  // initialize name for new set
  const [newSetName, setNewSetName] = useState("");

  // create API client
  var api = new SetApi();

  const handleSubmit = (event) => {
    // prevent trigger until button is pressed
    event.preventDefault();
    // set loading state on parent component
    props.setLoading(true);
    // Create DocumentSet API object
    const newDocumentSet = new DocumentSet(newSetName);
    api.createSet(newDocumentSet).then(() => {
      // trigger refetch of document sets
      props.setTriggerRequest(newDocumentSet.name);
    });
    // reset new set name
    setNewSetName("");
  };

  // set creation form template
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
          onChange={(event) => setNewSetName(event.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" value="Submit">
        Submit
      </Button>
    </form>
  );
}

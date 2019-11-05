import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { DocumentApi } from "@harpocrates/api-client";

export default function DocumentUploadForm(props) {
  var api = new DocumentApi();
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const body = reader.result;
      api.createDocument(props.documentSet, body);
    };

    acceptedFiles.forEach(file => reader.readAsText(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
}

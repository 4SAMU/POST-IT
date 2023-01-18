/** @format */

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.css"

const FileUploader = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Send a POST request to the server
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    // Get the file URL from the response
    const data = await response.json();
    setFileUrl(data.fileUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone-container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {fileUrl ? (
          <img src={fileUrl} alt="uploaded file" width="200" height="200" />
        ) : (
          <p>Drag and drop a file here or click to select a file</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;

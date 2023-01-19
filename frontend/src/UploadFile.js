/** @format */

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.css";

const FileUploader = () => {
  const [fileUrl1, setFileUrl] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    //https://post-it-backend.vercel.app

    // Send a POST request to the server
    const response = await fetch("https://post-it-backend.vercel.app/upload", {
      method: "POST",
      body: formData,
    });

    // Get the file URL from the response
    const data = await response.json();
    setFileUrl(`https://post-it-backend.vercel.app/${data.fileUrl}`);
    console.log(
      "image url\n",
      `https://post-it-backend.vercel.app/${data.fileUrl}`
    );
    // console.log(`http://localhost:5000/${data.fileUrl}`);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone-container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {fileUrl1 ? (
          <img src={fileUrl1} alt="uploaded file" width="200" height="200" />
        ) : (
          <p>Drag and drop a file here or click to select a file</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;

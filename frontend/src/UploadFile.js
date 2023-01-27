/** @format */

import React, { useState } from "react";

function VideoUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("video", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default VideoUploader;

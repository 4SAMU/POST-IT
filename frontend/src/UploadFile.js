/** @format */

// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import "./style.css";

// const FileUploader = () => {
//   const [fileUrl1, setFileUrl] = useState(null);

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     // Create a FormData object to send the file
//     const formData = new FormData();
//     formData.append("file", file);

//     //https://post-it-backend.vercel.app

//     // Send a POST request to the server
//     const response = await fetch("https://post-it-backend.vercel.app/upload", {
//       method: "POST",
//       body: formData,
//     });

//     // Get the file URL from the response
//     const data = await response.json();
//     setFileUrl(`https://post-it-backend.vercel.app/${data.fileUrl}`);
//     console.log(
//       "image url\n",
//       `https://post-it-backend.vercel.app/${data.fileUrl}`
//     );
//     // console.log(`http://localhost:5000/${data.fileUrl}`);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div className="dropzone-container">
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {fileUrl1 ? (
//           <img src={fileUrl1} alt="uploaded file" width="200" height="200" />
//         ) : (
//           <p>Drag and drop a file here or click to select a file</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUploader;

// import React, { useState } from "react";

// function VideoPlayer({ videoUrl }) {
//   return (
//     <video controls>
//       <source src={videoUrl} type="video/mp4" />
//     </video>
//   );
// }

// function VideoUploader() {
//   const [file, setFile] = useState(null);
//   const [videoUrl, setVideoUrl] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     // Create a new form data object
//     const data = new FormData();
//     // Append the file to the form data
//     data.append("video", file);

//     console.log(data);
//     // Make a POST request to the server
//     try {
//       const response = await fetch("http://localhost:4000/upload", {
//         method: "POST",
//         body: data,
//       });
//       const json = await response.json();
//       setVideoUrl(`http://localhost:4000/video/${json.file.filename}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
//     </div>
//   );
// }

// export default VideoUploader;

import React, { useState } from "react";
import EmojiPicker from "react-emoji-picker";
// import EmojiConvertor from "emoji-js";
// const emoji = new EmojiConvertor();
var emoji = require("node-emoji");

function TextArea() {
  const [text, setText] = useState("");

  const handleEmojiSelect = (emojiCode) => {
    const newEmoji = emoji.emojify(emojiCode);
    console.log("here", newEmoji);

    setText(text + newEmoji);
  };

  return (
    <div>
      {" "}
      <div className="emoji">
        <EmojiPicker onSelect={handleEmojiSelect} />
      </div>
      <textarea
        contentEditable={true}
        suppressContentEditableWarning={true}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {console.log(text)}
    </div>
  );
}

export default TextArea;

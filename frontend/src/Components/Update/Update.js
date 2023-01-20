import React from "react";
import THeader from "../THeader/THeader";
import "./Update.css";
const Update = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileImage, setFile] = useState();
//   const [formParams, updateFormParams] = useState({
//     name: "",
//     bio: ""
//   });
//   function inputFileHandler(e) {
//     setSelectedFile(e.target.files[0]);
//     setFile(URL.createObjectURL(e.target.files[0]));
//   }

  return (
    <div className="updateA">
      <THeader />
      <div className="heady">Update yor Profile</div>
      <div className="labeln">Upload Photo</div>
      <div className="labeln1">Add Name</div>
      <input type="text" className="txtarea1"></input>
      <div className="labeln2">Add Bio </div>
      <input type="text" className="txtarea2"></input>
      <button className="updateButton">Update</button>
    </div>
  );
};

export default Update;

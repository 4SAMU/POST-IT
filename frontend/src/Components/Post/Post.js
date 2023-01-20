import React, { useState } from "react";
import "./Post.css";
import Navbar from "../../Components/Navbar/Navbar";
import THeader from "../THeader/THeader";

const Post = () => {
  const [imageSrc, setImageSrc] = useState("");

  function handleChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="contain">
      <Navbar />
      <THeader />
      {/* <div className="header">Good morning user</div> */}
      {/* <div className="time">12 Jan 14:52:06</div> */}
      <div className="container1">
        <label className="label">Add Post Caption</label>
        <label className="header1">Create a Post</label>
        <label className="header2">Browser image</label>
        <input
          type="file"
          className="field1"
          onChange={handleChange}
          required
        ></input>
        <input
          type="text"
          className="field"
          placeholder="enter your post"
          required
        />
        <button className="button">Post</button>
        <div className="container2"></div>
      </div>
    </div>
  );
};

export default Post;

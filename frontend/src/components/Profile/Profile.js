import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="container">
      <div className="header">Good morning user</div>
      <div className="time">12 Jan 14:52:06</div>
      <div className="container1">
        <label className="label">Add Post Caption</label>
        <label className="header1">Create a Post</label>
        <label className="header2">Browser image</label>
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

export default Profile;

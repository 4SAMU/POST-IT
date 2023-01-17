import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="body">
      <div className="header">Good morning user</div>
      <div className="date">12 Jan 14:52:06</div>
      <div className="container">
        <div className="header2">My Profile</div>
        <div className="container1">
          <div className="img1"></div>
          <div className="name1">SAMUEL</div>
          <div className="label1">Software engineer</div>
          <div className="label3">n Posts</div>
        </div>
        <div className="container2">
          <div className="labeln">Hello guys is my Birthday</div>
          <div className="date1">13 Jan 14:52:06</div>

          <div className="name">SAMUEL</div>
          <div className="img2"></div>
          <div className="container3"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

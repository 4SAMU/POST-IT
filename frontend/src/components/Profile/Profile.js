import React from "react";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";

const Profile = () => {
  return (
    <div className="body1">
      <Navbar />
      <div className="header">Good morning user</div>
      <div className="date">12 Jan 14:52:06</div>
      <div className="contain0">
        <div className="head2">My Profile</div>
        <div className="contain1">
          <div className="img1"></div>
          <div className="name1">SAMUEL</div>
          <div className="label1">Software engineer</div>
          <div className="label3">n Posts</div>
        </div>
        <div className="contain2">
          <div className="labeln">Hello guys is my Birthday</div>
          <div className="date1">13 Jan 14:52:06</div>

          <div className="jina">SAMUEL</div>
          <div className="img2"></div>
          <div className="container3"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from 'react'
import "./navbar.css";


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="userImage"></div>
      <div className="userName">Samuel</div>
      <div className="userBio">software dev</div>
      <button className="homeButton">Home</button>
      <button className="myProfileBtn">My Profile</button>
      <button className="myProfileBtn">Create Post</button>
      <button className="myProfileBtn">Messages</button>
    </div>
  );
}

export default Navbar
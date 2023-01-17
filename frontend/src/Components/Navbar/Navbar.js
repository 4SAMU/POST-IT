import React from 'react'
import "./navbar.css";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="userImage"></div>
      <div className="userName">Samuel</div>
      <div className="userBio">software dev</div>
      <button className="homeButton">Home</button>
     
      {/* <button className="myProfileBtn">My Profile</button> */}
      <NavLink to="/myProfile">
        <button className="myProfileBtn">My Profile</button>
      </NavLink>
      <NavLink to="/createPost">
        <button className="myProfileBtn">Create Post</button>
      </NavLink>
      <button className="myProfileBtn">Messages</button>
    </div>
  );
}

export default Navbar
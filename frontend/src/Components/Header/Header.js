/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerComponent">
      <div className="greetings">Good Morning, user</div>
      <div className="timeTime">12 Jan 10:52:06</div>
      <div className="connectComponent">
        <div className="connectText">
          Connect to the world, get updates, share whats happening
        </div>
        {/* <button className="createPostBtn">Create Post</button> */}
        <NavLink to="/createPost">
          <button className="createPostBtn">Create Post</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

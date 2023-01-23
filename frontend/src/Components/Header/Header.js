/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import THeader from "../THeader/THeader";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="headerComponent">
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
      <THeader />
    </div>
  );
};

export default Header;

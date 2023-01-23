/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import THeader from "../THeader/THeader";
import "./Profile.css";

const Profile = () => {
  const im =
    "https://post-it-backend.vercel.app/files/63cab429245ca518f51f6f16";
  return (
    <div>
      <Navbar />
      <THeader />
      <div className="profilePage">
        <div className="MyProfileContainer">
          <img className="MyProfileContainer_image" src={im} alt="" />
          <div className="MyProfileContainer_name">Max</div>
          <div className="MyProfileContainer_name">software dev</div>
          <div className="MyProfileContainer_name">10 posts</div>
          <NavLink to={`/editProfile`}>
            <button className="editProfileBtn">Edit profile</button>
          </NavLink>
        </div>
        <div className="profilePage_container">
          <div className="profilePage_container_posts">
            <img className="profilePage_image" src={im} alt="" />
            <div className="profilePage_name">Maxiwell</div>
            <div className="profilePage_caption">Hello</div>
            <div className="profilePage_postTime">
              Thur Jan 20 2023 15:40:25
            </div>
            <img className="profilePage_postImage" src={im} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

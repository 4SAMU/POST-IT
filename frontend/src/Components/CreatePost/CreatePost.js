/** @format */

import React from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import "./CreatePost.css";

const CreatePost = () => {
  return (
    <div>
      <div className="Page">
        <div className="posts">
          <div className="getAllPosts">
            <div className="name">Samuel</div>
            <div className="userImagePost"></div>
            <div className="postImage">
              <div className="caption">Happy Sato</div>
              <div className="postTime">12 Jan 10:52:06</div>
            </div>
          </div>
          <div className="getAllPosts">
            <div className="name">Samuel</div>
            <div className="userImagePost"></div>
            <div className="postImage">
              <div className="caption">Happy Sato</div>
              <div className="postTime">12 Jan 10:52:06</div>
            </div>
          </div>
          <div className="endOfPosts"> seems u have reached end of posts!!
            <button className="refreshBtn">Refresh Page</button>
          </div>
        </div>
      </div>
      <Header />
      <Navbar />
    </div>
  );
};

export default CreatePost;

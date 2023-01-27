/** @format */

import React from "react";
import CreatePost from "./Components/CreatePost/CreatePost";
import "./App.css";
import First from "./Components/Landingpage/First";
import Landing from "./Components/Landingpage/Landing";
import { Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Post from "./Components/Post/Post";
import Update from "./Components/Update/Update";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/createprofile" element={<First />} />
        <Route path="/Home" element={<CreatePost />} />
        <Route path="/createPost" element={<Post />} />
        <Route path="/myProfile" element={<Profile />} />
        <Route path="/editProfile" element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;

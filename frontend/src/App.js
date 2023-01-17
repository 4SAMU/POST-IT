/** @format */

import React from "react";
import CreatePost from "./Components/CreatePost/CreatePost";
import "./App.css";
import First from "./Components/Landingpage/First";
import Landing from "./Components/Landingpage/Landing";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/createprofile" element={<First />} />
        <Route path="/Home" element={<CreatePost />} />
      </Routes>
    </div>
  );
};

export default App;

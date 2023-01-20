import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import THeader from "../THeader/THeader";

const Profile = () => {
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  function getTime() {
    const currentTime = new Date();
    let thisTime = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    });
    setTime(thisTime);
    setDate(currentTime.toDateString());
  }
  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="body1">
      <THeader />
      <Navbar />

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
          <div className="date1">
            {date}&nbsp;&nbsp;&nbsp;&nbsp; {time}
          </div>

          <div className="jina">SAMUEL</div>
          <div className="img2"></div>
          <div className="container3"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

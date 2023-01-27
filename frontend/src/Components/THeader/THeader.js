import React, { useState, useEffect } from "react";
import "./THeader.css";

const THeader = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [greeting, setGreeting] = useState();

  function getTime() {
    const currentTime = new Date();

    // console.log(currentTime.toLocaleTimeString());

    let thisTime = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    });
    setTime(thisTime);
    setDate(currentTime.toDateString());
    if (thisTime >= "00:00:00" && thisTime <= "12:00:00") {
      setGreeting("Good Morning");
    } else if (thisTime >= "12:00:00" && thisTime <= "18:00:00") {
      setGreeting("Good Afternoon");
    } else if (thisTime >= "18:00:00" && thisTime <= "20:00:00") {
      setGreeting("Good evening");
    } else if (thisTime >= "20:00:00" && thisTime <= "22:00:00") {
      setGreeting("seems to get really dark");
    } else if (thisTime >= "22:00:00" && thisTime <= "00:00:00") {
      setGreeting("Good night");
    }
  }

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="t">
      <div className="thead">{greeting} </div>
      <p className="tdate">
        {date}&nbsp;&nbsp;&nbsp;&nbsp; {time}
      </p>
      {/* <div className="tdate">20 Jan 14:52:06</div> */}
    </div>
  );
};

export default THeader;

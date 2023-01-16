/** @format */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connectWallet } from "../../utils/ConnectWallet";
import "./styles.css";

const Landing = () => {
  const [walletAdd, setWalletAdd] = useState();

  const connectWebsite = async () => {
    const walletAddress = await connectWallet();
    setWalletAdd(
      String(walletAddress.address).substring(0, 5) +
        "..." +
        String(walletAddress.address).substring(38)
    );
  };
  return (
    <div className="landing">
      <div className="body">
        <div className="top">
          <h1 className="title1">POST-IT</h1>

          {walletAdd ? (
            <button className="btn" onClick={connectWebsite}>
              connected :{walletAdd}
            </button>
          ) : (
            <button className="btn" onClick={connectWebsite}>
              Connect Wallet
            </button>
          )}
        </div>
        <div className="text">
          <div className="p">
            Welcome to POST-IT, a revolutionary new social platform built on the
            power of Web3 technology.
          </div>
          <div className="p">
            On POST-IT, you can share your thoughts, ideas, and experiences with
            the world. Create a profile, make new friends, and discover a new
            level of freedom in social networking.
          </div>
          <div className="p">
            Join us today and be a part of the future of social media. Welcome
            to POST-IT!
          </div>
        </div>
        <div className="group"></div>
        <div>
          <NavLink className={"active"} to="/Home">
            <button className="btn exp">Explore Now</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;

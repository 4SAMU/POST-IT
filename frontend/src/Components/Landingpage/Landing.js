/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { connectWallet } from "../../utils/ConnectWallet";
import socialApp from "../../utils/socialApp.json";
import "./styles.css";

const Landing = () => {
  const [walletAdd, setWalletAdd] = useState();
  const [userExistence, setUserExistence] = useState(false);

  //function fron Utils to coonect to metamask wallet
  const connectWebsite = async () => {
    const walletAddress = await connectWallet();
    setWalletAdd(
      String(walletAddress.address).substring(0, 5) +
        "..." +
        String(walletAddress.address).substring(38)
    );
  };

  //check if connected wallet addrress has a profile
  async function getUserProfile() {
    const walletAddress = await connectWallet();

    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance

    let contract = new ethers.Contract(
      socialApp.address,
      socialApp.abi,
      signer
    );
    let userProfile = await contract.getProfile(walletAddress.address);
    setUserExistence(userProfile.includes(""));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      connectWebsite();
      getUserProfile();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">
      <div className="body">
        <div className="top">
          <h1 className="title1">POST-IT</h1>

          {walletAdd ? (
            <button className="btn">connected :{walletAdd}</button>
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
          {!userExistence && walletAdd ? (
            <NavLink className={"active"} to="/Home">
              <button className="btn exp">Explore Now</button>
            </NavLink>
          ) : (
            <NavLink className={"active"} to="/createprofile">
              <button className="btn exp">create profile</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;

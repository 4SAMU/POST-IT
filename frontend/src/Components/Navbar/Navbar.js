/** @format */

import React, { useEffect, useState } from "react";
import { connectWallet } from "../../utils/ConnectWallet";
import socialApp from "../../utils/socialApp.json";
import "./navbar.css";

const Navbar = () => {
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [userBio, setUserBio] = useState();

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
    // setUserExistence(userProfile);
    const [name, url, profession] = userProfile;
    setUserName(name);
    setUserImage(url);
    setUserBio(profession);
    // console.log("ui", url);
  }

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="navbar">
      <img className="userImage" src={userImage} alt="" />
      <div className="userName">{userName}</div>
      <div className="userBio">{userBio}</div>
      <button className="homeButton">Home</button>
      <button className="myProfileBtn">My Profile</button>
      <button className="myProfileBtn">Create Post</button>
      <button className="myProfileBtn">Messages</button>
    </div>
  );
};

export default Navbar;

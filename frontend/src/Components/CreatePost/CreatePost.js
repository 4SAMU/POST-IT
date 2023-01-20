/** @format */
import React, { useEffect, useState } from "react";
import { connectWallet } from "../../utils/ConnectWallet";
import socialApp from "../../utils/socialApp.json";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
// import { NavLink } from "react-router-dom";
// import { ethers } from "ethers";
import "./CreatePost.css";

const CreatePost = () => {
  const [userExistence, setUserExistence] = useState(false);
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
    setUserExistence(userProfile);
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
    <div>
      <div className="Page">
        <div className="posts">
          <div className="getAllPosts">
            <div className="name">{userName}</div>
            <img src={userImage} alt="" className="userImagePost" />
            <div className="postImage">
              <div className="caption">Happy Sato</div>
              <div className="postTime">12 Jan 10:52:06</div>
            </div>
          </div>
          <div className="getAllPosts">
            <div className="name">{userName}</div>
            <div className="userImagePost"></div>
            <div className="postImage">
              <div className="caption">Happy Sato</div>
              <div className="postTime">12 Jan 10:52:06</div>
            </div>
          </div>
          <div className="endOfPosts">
            {" "}
            seems u have reached end of posts!!
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

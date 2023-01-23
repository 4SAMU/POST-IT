/** @format */

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { connectWallet } from "../../utils/ConnectWallet";
import Navbar from "../Navbar/Navbar";
import THeader from "../THeader/THeader";
import "./Profile.css";
import socialApp from "../../utils/socialApp.json";

const Profile = () => {
  const [addressCheck, setAddressCheck] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [userBio, setUserBio] = useState();

  const [data, setData] = useState([]);
  const [dataFetched, updateDataFetched] = useState(false);

  /*=============reading from the current location link================*/
  const location = useLocation();
  const search = location.search;
  const UserAddress = new URLSearchParams(search).get("Address");
  const query = new URLSearchParams(search).get("q");

  //contract instant
  const ethers = require("ethers");
  //After adding your Hardhat network to your metamask, this code will get providers and signers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //Pull the deployed contract instance
  let contract = new ethers.Contract(socialApp.address, socialApp.abi, signer);

  //check if connected wallet addrress has a profile
  async function getUserProfile() {
    const walletAddress = await connectWallet();
    setAddressCheck(
      walletAddress.address.toUpperCase() === UserAddress.toUpperCase()
    );

    let userProfile = await contract.getProfile(UserAddress);
    // console.log(userProfile);
    const [myName, imageUrl, bio] = userProfile;
    setUserName(myName);
    setUserImage(imageUrl);
    setUserBio(bio);
  }

  //function to get specific userPosts
  async function getUserPosts() {
    let allUserPosts = await contract.getUserPosts(UserAddress);
    console.log(allUserPosts);

    // let allUserPosts = UnreversedPosts.reverse();

    const postData = await Promise.all(
      allUserPosts.map(async (index) => {
        const [userAddress, text, fileHash, timestamp] = index;
        let userProfile = await contract.getProfile(userAddress);
        const [name, url, profession] = userProfile;
        let dateTime = ethers.utils.formatUnits(timestamp.toString(), "ether");
        let date = new Date(dateTime * 10e18 * 100).toDateString();
        let time = new Date(dateTime * 10e18 * 100).toLocaleTimeString();
        // console.log(`${date}, ${time}`);

        const postingTime = `${date}, ${time}`;

        const arrayPosts = {
          name,
          url,
          profession,
          userAddress,
          text,
          fileHash,
          postingTime,
        };
        return arrayPosts;
      })
    );
    setData(postData.reverse());
    updateDataFetched(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      search;
      getUserProfile();
      getUserPosts();
    }, 1000);
    return () => clearInterval(interval);
  }, [location]);
  return (
    <div>
      <Navbar />
      <THeader />
      <div className="profilePage">
        <div className="MyProfileContainer">
          <img className="MyProfileContainer_image" src={userImage} alt="" />
          <div className="MyProfileContainer_name">{userName}</div>
          <div className="MyProfileContainer_name">{userBio}</div>
          <div className="MyProfileContainer_name">10 posts</div>
          {query === "myProfile" && addressCheck ? (
            <NavLink to={`/editProfile/?name=${userName}&bio=${userBio}`}>
              <button className="editProfileBtn">Edit profile</button>
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="profilePage_container">
          {data.map((post, index) => (
            <div key={index}>
              <div className="profilePage_container_posts">
                <img className="profilePage_image" src={post.url} alt="" />
                <div className="profilePage_name">{post.name}</div>
                <div className="profilePage_caption">{post.text}</div>
                <div className="profilePage_postTime">
                  Thur Jan 20 2023 15:40:25
                </div>
                <img
                  className="profilePage_postImage"
                  src={post.fileHash}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

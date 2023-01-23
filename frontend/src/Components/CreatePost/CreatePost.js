/** @format */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import socialApp from "../../utils/socialApp.json";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
// import { NavLink } from "react-router-dom";
// import { ethers } from "ethers";
import "./CreatePost.css";

const CreatePost = () => {
  const [data, setData] = useState([]);
  const [dataFetched, updateDataFetched] = useState(false);

  async function getAllPosts() {
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
    let allPosts = await contract.getAllPosts();

    // let allPosts = UnreversedPosts.reverse();

    const postData = await Promise.all(
      allPosts.map(async (index) => {
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

  function refreshPage() {
    location.reload();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getAllPosts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="Page">
        <div className="posts">
          {data.map((post, index) => (
            <div key={index} className="getAllPosts">
              <div>
                <NavLink to={`/myProfile/?Address=${post.userAddress}&q=${post.name}`}>
                  <div className="name">{post.name}</div>
                  <img src={post.url} alt="" className="userImagePost" />
                </NavLink>
                <div className="postImage_content">
                  <div className="caption">{post.text}</div>
                  <div className="postTime">{post.postingTime}</div>
                </div>
                <img className="postImage" src={post.fileHash} />
              </div>
            </div>
          ))}

          <div className="endOfPosts">
            {" "}
            seems u have reached end of posts!!
            <button className="refreshBtn" onClick={refreshPage}>
              Refresh Page
            </button>
          </div>
        </div>
      </div>
      <Header />
      <Navbar />
    </div>
  );
};

export default CreatePost;

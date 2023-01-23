/** @format */

import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Post.css";
import socialApp from "../../utils/socialApp.json";
import THeader from "../THeader/THeader";

const Post = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileImage, setFile] = useState();
  const [busy, setBusy] = useState();
  const [formParams, updateFormParams] = useState({
    caption: "",
  });

  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  async function uploadImage() {
    const file = selectedFile;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://post-it-backend.vercel.app/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    const imageHash = `https://post-it-backend.vercel.app/${data.fileUrl}`;
    console.log(imageHash);

    // console.log("form data\n", formData);
    return imageHash;
  }
  async function createPost() {
    const { caption } = formParams;
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
    setBusy(true);

    const imageUrl = await uploadImage();
    try {
      let tx = await contract.createPost(caption, imageUrl);
      const hash = await tx.wait();
      if (hash.transactionHash) {
        window.location.replace("/Home");
      }
      // console.log("createPost successfully", hash.transactionHash);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="contain">
      <Navbar />
      <THeader />
      {/* <div className="header">Good morning user</div> */}
      {/* <div className="time">12 Jan 14:52:06</div> */}
      <div className="container1">
        <label className="labelADD">Add Post Caption</label>
        <label className="header1">Create a Post</label>
        <label className="header2">Browser image</label>
        <input
          type="file"
          className="field1"
          onChange={inputFileHandler}
          required
        ></input>
        <textarea
          type="text"
          className="field"
          placeholder="enter your caption"
          value={formParams.caption}
          id={formParams.caption}
          onChange={(e) =>
            updateFormParams({ ...formParams, caption: e.target.value })
          }
          required
        />
        <button className="Postbutton" onClick={createPost}>
          {busy ? "loading..." : "Post"}
        </button>
        <img className="container2" src={fileImage} atl="no post " />
      </div>
    </div>
  );
};

export default Post;

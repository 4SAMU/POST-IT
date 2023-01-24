/** @format */

import React, { useState } from "react";
import socialApp from "../../utils/socialApp.json";
import { useLocation } from "react-router-dom";
import THeader from "../THeader/THeader";
import "./Update.css";
const Update = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [fileImage, setFile] = useState();

  /*=============reading from the current location link================*/
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let PreviousName = params.get("name");
  let previousBio = params.get("bio");

  const [formParams, updateFormParams] = useState({
    name: PreviousName,
    bio: previousBio,
  });

  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  async function uploadImage() {
    if (!selectedFile) {
      alert("please enter photo");
    } else {
      const file = selectedFile;
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://post-it-backend.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const imageHash = `https://post-it-backend.vercel.app/${data.fileUrl}`;
      // console.log(imageHash);

      return imageHash;
    }
  }
  async function editUserProfile() {
    const { name, bio } = formParams;
    console.log(name);
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
      let tx = await contract.editProfile(name, bio, imageUrl);
      const hash = await tx.wait();
      if (hash.transactionHash) {
        window.location.replace("/Home");
      }

      // console.log("createProfile successfully", txHash);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="updateA">
      <THeader />
      <div className="head7">
        <p className="wording">
          Connect to the world, get updates,show what's happening
        </p>
      </div>
      <div>
        <div className="labeln">Upload Photo</div>
        {fileImage ? (
          <img className="po" src={fileImage} alt="" />
        ) : (
          <div className="po">
            <input
              className="ip"
              type={"file"}
              onChange={inputFileHandler}
            ></input>
          </div>
        )}
      </div>

      <div className="labeln1">Edit Name</div>
      <input
        type="text"
        className="txtarea1"
        placeholder="enter your name"
        value={formParams.name}
        id={formParams.name}
        onChange={(e) =>
          updateFormParams({ ...formParams, name: e.target.value })
        }
      ></input>
      <div className="labeln2">Edit Bio </div>
      <input
        type={"text"}
        placeholder="enter your bio"
        className="txtarea2"
        value={formParams.bio}
        id={formParams.bio}
        onChange={(e) =>
          updateFormParams({ ...formParams, bio: e.target.value })
        }
      ></input>
      <button className="updateButton" onClick={editUserProfile}>
        {busy ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default Update;

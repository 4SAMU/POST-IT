/** @format */

import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Post.css";
import socialApp from "../../utils/socialApp.json";
import THeader from "../THeader/THeader";
// import Emojis from "../Emojis/Emojis";

import BLUSH from "../../assets/Emojis/blush.png";
import CAR from "../../assets/Emojis/car.png";
import LAUGHING from "../../assets/Emojis/laughing.png";
import CRYING from "../../assets/Emojis/crying.png";
import HEART_EYES from "../../assets/Emojis/heart_eyes.png";
import TWO_LOVE_HEARTS from "../../assets/Emojis/two_hearts.png";
import SUNGLASSES from "../../assets/Emojis/sunglasses.png";
import LOVE_HEART from "../../assets/Emojis/love_heart.png";
import YELLOW_THINKING from "../../assets/Emojis/yellow_thinking.png";

const Post = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileImage, setFile] = useState();
  const [busy, setBusy] = useState();
  const [caption, setCaption] = useState("");

  //function to set emoji to text area on emoji click
  const handleEmojiClick = (e) => {
    // const { caption } = formParams;
    const clickedEmoji = e.target.src; // get the src of the clicked image
    const reducedString = clickedEmoji.substring(
      clickedEmoji.indexOf("/static/")
    );

    try {
      if (reducedString === LAUGHING) {
        setCaption((prevValue) => prevValue + "😂");
      } else if (reducedString === CRYING) {
        setCaption((prevValue) => prevValue + "😢");
      } else if (reducedString === CAR) {
        setCaption((prevValue) => prevValue + "🚗");
      } else if (reducedString === BLUSH) {
        setCaption((prevValue) => prevValue + "😁");
      } else if (reducedString === HEART_EYES) {
        setCaption((prevValue) => prevValue + "😍");
      } else if (reducedString === TWO_LOVE_HEARTS) {
        setCaption((prevValue) => prevValue + "💕");
      } else if (reducedString === SUNGLASSES) {
        setCaption((prevValue) => prevValue + "😎");
      } else if (reducedString === LOVE_HEART) {
        setCaption((prevValue) => prevValue + "❤️");
      } else if (reducedString === YELLOW_THINKING) {
        setCaption((prevValue) => prevValue + "🤔");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formParams.caption);

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
  // console.log(caption);
  return (
    <div className="contain">
      <Navbar />
      <THeader />

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
          value={caption}
          id={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />

        {/*emojis onClick code*/}

        <div className="emojis">
          <img
            className="emojis_img"
            src={BLUSH}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={CAR}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={LAUGHING}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={CRYING}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={HEART_EYES}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={TWO_LOVE_HEARTS}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={LOVE_HEART}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={SUNGLASSES}
            alt=""
            onClick={handleEmojiClick}
          />
          <img
            className="emojis_img"
            src={YELLOW_THINKING}
            alt=""
            onClick={handleEmojiClick}
          />
        </div>

        <button className="Postbutton" onClick={createPost}>
          {busy ? "loading..." : "Post"}
        </button>
        <img className="container2" src={fileImage} atl="no post " />
      </div>
    </div>
  );
};

export default Post;

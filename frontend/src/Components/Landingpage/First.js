/** @format */

import React, { useEffect, useState } from "react";
import socialApp from "../../utils/socialApp.json";

const First = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const inputFileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [fileImage, setFile] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [greeting, setGreeting] = useState();

  const [formParams, updateFormParams] = useState({
    name: "",
    bio: "",
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

  async function createUserProfile() {
    const { name, bio } = formParams;
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
      let tx = await contract.createProfile(name, bio, imageUrl);
      tx.wait();

      console.log("createProfile successfully", tx.wait());
    } catch (error) {
      console.log(error);
    }
  }

  function getTime() {
    const currentTime = new Date();
    setTime(currentTime.toLocaleTimeString());
    setDate(currentTime.toDateString());
    if (
      currentTime.toLocaleTimeString() >= "00:00:00" &&
      currentTime.toLocaleTimeString() <= "12:00:00"
    ) {
      setGreeting("Good Morning");
    } else if (
      currentTime.toLocaleTimeString() >= "12:00:00" &&
      currentTime.toLocaleTimeString() <= "18:00:00"
    ) {
      setGreeting("Good Afternoon");
    } else if (
      currentTime.toLocaleTimeString() >= "18:00:00" &&
      currentTime.toLocaleTimeString() <= "20:00:00"
    ) {
      setGreeting("Good evening");
    } else if (
      currentTime.toLocaleTimeString() >= "20:00:00" &&
      currentTime.toLocaleTimeString() <= "22:00:00"
    ) {
      setGreeting("seems to get really dark");
    } else if (
      currentTime.toLocaleTimeString() >= "22:00:00" &&
      currentTime.toLocaleTimeString() <= "00:00:00"
    ) {
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
    <div className="firstpage">
      <div className="top top2">
        <h1 className="title2">{greeting}, user</h1>
        <div className="title2 ">
          {date},&nbsp;&nbsp;&nbsp;&nbsp; {time}
        </div>
      </div>

      <div className="fdiv">
        <p>Connect to the world, get updates, share whats happening</p>
        <button className="btn crt">Create Profile</button>
      </div>
      <div>
        <div className="p p2 l">
          Seems u dont have an account, create one now!
        </div>
        <div className="p p2 l3">
          Upload Photo
          <br />
          <br />
          <input type={"file"} onChange={inputFileHandler}></input>
        </div>
      </div>
      {fileImage ? <img src={fileImage} className="photo"></img> : ""}
      <div className="p2">Add Name</div>
      <input
        type={"text"}
        className="input_entry"
        value={formParams.name}
        id={formParams.name}
        onChange={(e) =>
          updateFormParams({ ...formParams, name: e.target.value })
        }
      ></input>
      <div className="p2">Add Bio</div>
      <input
        type={"text"}
        className="input_entry"
        value={formParams.bio}
        id={formParams.bio}
        onChange={(e) =>
          updateFormParams({ ...formParams, bio: e.target.value })
        }
      ></input>
      <div className="p2"></div>
      <button className="createButton_" onClick={createUserProfile}>
        {busy ? "loadind..." : "Create now"}
      </button>
    </div>
  );
};

export default First;

/** @format */

import React, { useEffect, useRef, useState } from "react";
import { NFTStorage, File } from "nft.storage/dist/bundle.esm.min.js";

const NEW_TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5MjRBNGI4MzRGMWZDMjg1MzA2QTU1MTllMTBBRDAzZTRFRkFkNjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3Mzg3ODk4MjY1MSwibmFtZSI6IlNvY2lhbEFwcCJ9.ixJtHq5-qX-NKfwtmWZ9HfIWfLAdHZgnWDcXRepPZ80";

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
    description: "",
  });

  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function IPFSupload(data, file) {
    try {
      setBusy(true);
      // setIPFSerror(null);
      // setIPFSuploading(true);
      const client = new NFTStorage({
        token: NEW_TOKEN_KEY,
      });

      const metadata = await client.store({
        name: data.name,
        description: data.description,
        image: new File([file], file.name, { type: file.type }),
      });
      console.log("IPFS URL for the metadata:", metadata.url);
      console.log("metadata.json contents:\n", metadata.data);
      console.log("metadata.json with IPFS gateway URLs:\n", metadata.embed());
      setBusy(false);
      return metadata.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function mintNFThandler() {
    const { name, description } = formParams;

    if (!name || !description) {
      return alert("all field are required");
    }

    try {
      const url = await IPFSupload(
        {
          name,
          description,
        },
        selectedFile
      );
      //  await MintNfts(url);
      console.log(url);

      //fetching image data
      const imageUri = url.slice(7);
      const metadata = await fetch(`https://nftstorage.link/ipfs/${imageUri}`);
      const json = await metadata.json();
      const str = json.image;
      const mylink = str.slice(7);
      const imageX =
        "https://nftstorage.link/ipfs/" + mylink.replace("#", "%23");

      console.log(imageX);
    } catch (error) {
      console.log(error);
      setBusy(false);
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
      setGreeting("Good evining");
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
        <p className="date">
          {date},&nbsp;&nbsp;&nbsp;&nbsp; {time}
        </p>
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
        value={formParams.description}
        id={formParams.description}
        onChange={(e) =>
          updateFormParams({ ...formParams, description: e.target.value })
        }
      ></input>
      <div className="p2"></div>
      <button className="createButton_" onClick={mintNFThandler}>
        {busy ? "loadind..." : "Create now"}
      </button>
    </div>
  );
};

export default First;

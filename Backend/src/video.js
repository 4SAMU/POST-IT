/** @format */

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const app = express();

// Connect to the MongoDB database
mongoose.connect(
  "mongodb+srv://sam4:samuonfleek@userauth.ruoedti.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

let gfs;

mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("videos");
});

const storage = new GridFsStorage({
  url: "mongodb+srv://sam4:samuonfleek@userauth.ruoedti.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    return {
      filename: file.originalname,
    };
  },
});

const upload = multer({ storage });

// Create a route for uploading video
app.post("/upload", upload.single("video"), (req, res) => {
  const videoUrl = `http://localhost:4000/video/${req.file.filename}`;
  res.status(200).json({ videoUrl });
});

// Create a route for streaming video
app.get("/video/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    if (file.contentType === "video/mp4" || file.contentType === "video/webm") {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not a video",
      });
    }
  });
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});

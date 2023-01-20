/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const gridfs = require("gridfs-stream");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sam4:samuonfleek@userauth.ruoedti.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
let gfs;

mongoose.connection.once("open", () => {
  gfs = gridfs(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create Multer storage instance
const storage = new GridFsStorage({
  url: "mongodb+srv://sam4:samuonfleek@userauth.ruoedti.mongodb.net/?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});
const upload = multer({ storage });

// File Upload API
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json({
    file: req.file,
  });
});

// Video Retrieval API
app.get("/video/:id", (req, res) => {
  gfs.find({ _id: req.params.id }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    if (file.contentType === "video/mp4" || file.contentType === "video/webm") {
      const readstream = gfs.createReadStream({
        _id: req.params.id,
      });
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not a video",
      });
    }
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

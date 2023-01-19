/** @format */

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const process = require("process");

require("dotenv").config();

const app = express();
const upload = multer();
const File = require("./Model/fileModel.js");
// mongoose.set("strictQuery", false);

// Connect to MongoDB Atlas
const db = process.env.MONGODB_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB...");
  });

app.post(
  "/upload",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  upload.single("file"),
  (req, res) => {
    const file = req.file;

    // Create a new MongoDB document with the file data
    const newFile = new File({
      contentType: file.mimetype,
      data: file.buffer,
    });

    // Save the document in the "files" collection
    newFile.save((err, savedFile) => {
      if (err) throw err;
      console.log("File inserted into MongoDB");
      const fileUrl = `files/${savedFile._id}`;
      console.log(fileUrl);
      res.status(200).json({ fileUrl });
    });
  }
);

app.get("/files/:id", (req, res) => {
  const id = req.params.id;

  File.findById(id, (err, file) => {
    if (err) throw err;
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.contentType(file.contentType);
    res.send(file.data);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

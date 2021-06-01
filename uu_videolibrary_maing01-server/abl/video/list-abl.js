"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// video list - accepts only video.name parameter
async function ListAbl(req, res) {
  let { title } = req;

  if (!title || (title && typeof title === "string" && title.length < 100)) {
    try {
      let videoList = await dao.listVideos(title);
      res.status(200).json(videoList);
    } catch (e) {
      res.status(500).json({ error_message: e });
    }
  } else {
    res.status(400).json({
      error_message: "Invalid dtoIn",
    });
  }
}

module.exports = ListAbl;

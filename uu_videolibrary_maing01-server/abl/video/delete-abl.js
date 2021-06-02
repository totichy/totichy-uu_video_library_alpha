"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// delete video - accepts only video.code parameter
async function DeleteAbl(req, res) {
  // 1.
  let { code } = req;
  // 2.A.
  if (code && typeof code === "string" && code.length < 25) {
    try {
      await dao.deleteVideo(code);
      res.status(200).json({});
    } catch (e) {
      if (e.code === "DELETE_FAILED") {
        res.status(500).json({ error_message: e });
      } else {
        res.status(500).json({ error_message: e });
      }
    }
  }
  // 2.B.
  else {
    res.status(400).json({
      error_message: "Invalid dtoIn",
    });
  }
}

module.exports = DeleteAbl;

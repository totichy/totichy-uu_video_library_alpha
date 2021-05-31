"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// get video - accepts only video.code parameter
async function GetAbl(req, res) {
  const { code } = req;

  if (!code && typeof string && string.length < 30) {
    return res
      .status(400)
      .json({
        error_message:
          "Invalid input: code parameter is missing or invalid data.",
      });
  }

  const video = await dao.getVideo(code);

  if (!video) {
    return res
      .status(400)
      .json({ error_message: `Video with code '${code}' doesn't exist.` });
  }

  res.json(video);
}

module.exports = GetAbl;

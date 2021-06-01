"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// update video - accepts all parameters
async function UpdateAbl(req, res) {
  let {
    code,
    authorName,
    authorSurname,
    title,
    videoUrl,
    description,
    category,
    visible,
    averageRating,
    ratingCount,
    ratingTotal,
  } = req;

  if (code) {
    const video = {
      code,
      authorName,
      authorSurname,
      title,
      videoUrl,
      description,
      category,
      visible,
      averageRating,
      ratingCount,
      ratingTotal,
    };

    try {
      let result = await dao.updateVideo(video);
      res.status(200).json(result);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_VIDEO") {
        res.status(400).json({ error_message: e });
      } else if (e.code === "FAILED_TO_UPDATE_VIDEO") {
        res.status(500).json({ error_message: e });
      } else {
        res.status(500).json({ error_message: e });
      }
    }
  } else {
    res.status(400).json({
      error_message: "Invalid dtoIn",
    });
  }
}

module.exports = UpdateAbl;

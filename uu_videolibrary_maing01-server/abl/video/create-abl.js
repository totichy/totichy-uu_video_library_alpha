"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);
const CategoryDao = require("../../dao/category-dao");
let categoryDao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// load validation schema
const Ajv = require("ajv").default;
const { createVideoSchema } = require("../../schemas/video-schemas");

// accepts object as parameter
async function CreateAbl(req, res) {
  // let { category } = req;
  const ajv = new Ajv();
  const valid = ajv.validate(createVideoSchema, req);
  // validation TODO: zajistit validaci - pole kategorii vetsi nez 0 a mensi nez stanovene cislo
  if (!valid) {
    return res.status(400).json({ error: ajv.errors });
  }

  const video = {
    code: req.code,
    authorName: req.authorName,
    authorSurname: req.authorSurname,
    title: req.title,
    videoUrl: req.videoUrl,
    description: req.description,
    category: req.category,
    visible: req.visible,
    averageRating: req.averageRating,
    ratingCount: req.ratingCount,
    ratingTotal: req.ratingTotal,
  };

  try {
    await dao.addVideo(video);
  } catch (e) {
    if (e.code === "DUPLICATE_CODE" || e.code === "DUPLICATE_URL") {
      res.status(400).json({ error: e });
    } else if (e.code === "FAILED_TO_STORE_VIDEO") {
      res.status(500).json({ error: e });
    } else {
      res.status(500).json({ error: e });
    }
  }
  res.status(200).json(video);
}

module.exports = CreateAbl;

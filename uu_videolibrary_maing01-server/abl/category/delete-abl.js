"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

const LibraryDao = require("../../dao/video-library-dao");
let libraryDao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// delete category - accepts only category.code parameter
async function DeleteAbl(req, res) {
  let { categoryId } = req;

  let videoList = await libraryDao.listVideos();
  let result = [];

  for (let i = 0; i < videoList.length; i++) {
    if (videoList[i].category.includes(categoryId)) {
      result.push(videoList[i]);
    }
  }

  if (result.length > 0) {
    res.status(400).json({
      error_message: `Category is included in ${result.length} videos and can't be deleted.`,
    });
  } else if (
    categoryId &&
    typeof categoryId === "string" &&
    categoryId.length === 3
  ) {
    try {
      await dao.deleteCategory(categoryId);
      res.status(200).json({});
    } catch (e) {
      if (e.code === "FAILED_TO_DELETE_CATEGORY") {
        res.status(400).json({ error_message: e });
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

module.exports = DeleteAbl;

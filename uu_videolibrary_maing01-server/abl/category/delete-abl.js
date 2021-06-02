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

  //let categoryList = await CategoryDao.categoryList();
  let videoList = await libraryDao.listVideos();
  let result = [];
  let categoryCheck = await dao.getCategory(categoryId); //Checks all categories by categoryID

  for (let i = 0; i < videoList.length; i++) {
    if (videoList[i].category.includes(categoryId)) {
      result.push(videoList[i]);
    }
  }

  if (!categoryCheck) {
    //if falsy throw error. This means that the categoryCheck returned empty === no category with req ID exists
    return res.status(400).json({
      error_message: `Category with Id ${categoryId} does NOT exist!`,
    });
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

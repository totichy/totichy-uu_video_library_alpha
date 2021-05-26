"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// update category - accepts all parameters
async function UpdateAbl(req, res) {
  let { categoryId, categoryName } = req;

  if (categoryId) {
    const category = { categoryId, categoryName };
    try {
      let result = await dao.updateCategory(category);
      res.status(200).json(result);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_CATEGORY") {
        res.status(400).json({ error_message: e });
      } else if (e.code === "FAILED_TO_UPDATE_CATEGORY") {
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

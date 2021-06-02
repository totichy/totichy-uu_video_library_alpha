"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// caetgory list - accepts only category.name parameter
async function ListAbl(req, res) {
  let { categoryName } = req;

  if (
    !categoryName ||
    (categoryName &&
      typeof categoryName === "string" &&
      categoryName.length < 30)
  ) {
    try {
      let categoryList = await dao.listCategories(categoryName);
      res.status(200).json(categoryList);
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

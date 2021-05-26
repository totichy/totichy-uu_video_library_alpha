"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// get category - accepts only category.code parameter
async function GetAbl(req, res) {
  categoryId = req.categoryId;

  if (!categoryId) {
    return res
      .status(400)
      .json({ error_message: "Invalid input: code parameter is missing." });
  }

  const category = await dao.getCategory(categoryId);

  if (!category) {
    return res
      .status(400)
      .json({
        error_message: `Category with code '${categoryId}' doesn't exist.`,
      });
  }
  res.json(category);
}

module.exports = GetAbl;

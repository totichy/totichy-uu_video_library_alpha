"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// load validation schema
const Ajv = require("ajv").default;
const { createCategorySchema } = require("../../schemas/category-schemas");

// accepts object as parameter
async function CreateAbl(req, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(createCategorySchema, req);

  if (!valid) {
    return res.status(400).json({ error: ajv.errors });
  }

  const category = {
    categoryId: req.categoryId,
    categoryName: req.categoryName,
  };

  try {
    await dao.addCategory(category);
  } catch (e) {
    if (e.code == "DUPLICATE_CODE" || e.code == "DUPLICATE_CATEGORY") {
      res.status(400);
    } else if (e.code === "FAILED_TO_SAVE_CATEGORY") {
      res.status(500).json({ error: e });
    } else {
      res.status(500);
    }
    return res.json({ error_message: e.message });
  }

  res.json(category);
}

module.exports = CreateAbl;

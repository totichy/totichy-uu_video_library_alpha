const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// delete category - accepts only category.code parameter
async function DeleteAbl(req, res) {
  let { categoryId } = req;

  if (categoryId && typeof categoryId === "string" && categoryId.length < 25) {
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

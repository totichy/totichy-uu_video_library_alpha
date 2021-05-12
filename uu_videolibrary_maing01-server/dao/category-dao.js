"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// objects storage path
const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "..",
  "storage",
  "categories.json"
);

class CategoryDao {
  constructor(storagePath) {
    this.categoryStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  // add category - accepts object as parameter
  async addCategory(category) {
    const categories = await this._loadAllCategories();

    if (this._isDuplicate(categories, category.categoryId)) {
      const e = new Error(
        `Category with code '${category.categoryId}' already exists.`
      );
      e.code = "DUPLICATE_CODE";
      throw e;
    }

    categories.push(category);

    try {
      await wf(this._getStorageLocation(), JSON.stringify(categories, null, 2));
      return { status: "OK", data: category };
    } catch (e) {
      return { status: "ERROR", error: e };
    }
  }

  // get category - accepts only category.code parameter
  async getCategory(code) {
    let categories = await this._loadAllCategories();

    const result = categories.find((b) => {
      return b.categoryId === code;
    });

    return result;
  }

  async _loadAllCategories() {
    let categories;
    try {
      categories = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        categories = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return categories;
  }
  // update category - accepts object as parameter
  async updateCategory(category) {
    let categories = await this._loadAllCategories();

    let updatedCategory = categories.find((c) => {
      return c.categoryId === category.categoryId;
    });

    if (updatedCategory) {
      let index = categories.indexOf(updatedCategory);
      categories[index] = category;

      try {
        await wf(
          this._getStorageLocation(),
          JSON.stringify(categories, null, 2)
        );
        return category;
      } catch (error) {
        const e = new Error(
          `Failed to update category with code ${category.code} in local storage.`
        );
        e.code = "VIDEO";
        throw e;
      }
    } else {
      new Error(`Category with code ${category.code} does not exist.`);
      e.code = "VIDEO";
      throw e;
    }
  }
  // delete category - accepts only category.code parameter
  async deleteCategory(categoryCode) {
    const categories = await this._loadAllCategories();
    categories.forEach((category, i) => {
      if (category.categoryId === categoryCode) {
        categories.splice(i, 1);
      }
    });

    try {
      await wf(this._getStorageLocation(), JSON.stringify(categories, null, 2));
      return undefined;
    } catch (error) {
      const e = new Error(
        `Failed to delete category with id '${category}' in local storage.`
      );
      e.code = "VIDEO";
      throw e;
    }
  }
  // category list - accepts only category.name parameter
  async listCategories(name) {
    const categories = await this._loadAllCategories();
    let categoryList = [];

    for (let id in categories) {
      if (
        !name ||
        categories[id].categoryName.toLowerCase().includes(name.toLowerCase())
      ) {
        categoryList.push(categories[id]);
      }
    }
    return categoryList;
  }

  _isDuplicate(categories, code) {
    const result = categories.find((b) => {
      return b.categoryId === code;
    });
    return result ? true : false;
  }

  _getStorageLocation() {
    return this.categoryStoragePath;
  }
}

module.exports = CategoryDao;

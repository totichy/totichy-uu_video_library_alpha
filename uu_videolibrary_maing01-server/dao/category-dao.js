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

    if (this._isDuplicateId(categories, category.categoryId)) {
      const e = new Error(
        `Category with Id '${category.categoryId}' already exists.`
      );
      e.code = "DUPLICATE_CODE";
      throw e;
    }

    if (this._isDuplicateName(categories, category.categoryName)) {
      const e = new Error(
        `Category with name '${category.categoryName}' already exists.`
      );
      e.code = "DUPLICATE_CATEGORY";
      throw e;
    }

    categories.push(category);

    try {
      await wf(this._getStorageLocation(), JSON.stringify(categories, null, 2));
      return category;
    } catch (e) {
      e = new Error(
        `Failed to save category with id '${category.id}' to local storage.`
      );
      e.code = "FAILED_TO_SAVE_CATEGORY";
      throw e;
    }
  }

  // get category - accepts only category.code parameter
  async getCategory(id) {
    let categories = await this._loadAllCategories();

    let result;

    if (id) {
      result = await categories.find((b) => {
        return b.categoryId === id;
      });
    } else {
      const e = new Error(`Category with id '${id}' does not exist.`);
      e.code = "FAILED_TO_LOAD_CATEGORY";
      throw e;
    }

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
          `Failed to update category with code ${category.Id} in local storage.`
        );
        e.code = "FAILED_TO_UPDATE_CATEGORY";
        throw e;
      }
    } else {
      new Error(`Category with id ${category.categoryId} does not exist.`);
      e.code = "FAILED_TO_GET_CATEGORY";
      throw e;
    }
  }
  // delete category - accepts only category.code parameter
  async deleteCategory(id) {
    const categories = await this._loadAllCategories();

    await categories.forEach((category, i) => {
      if (category.categoryId === id) {
        categories.splice(i, 1);
      }
    });

    try {
      await wf(this._getStorageLocation(), JSON.stringify(categories, null, 2));

      return undefined;
    } catch (error) {
      const e = new Error(
        `Failed to delete category with id '${id}' in local storage.`
      );
      e.code = "FAILED_TO_DELETE_CATEGORY";
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

  _isDuplicateId(categories, id) {
    const result = categories.find((b) => {
      return b.categoryId === id;
    });
    return result ? true : false;
  }

  _isDuplicateName(categories, name) {
    const result = categories.find((b) => {
      return b.categoryName.toLowerCase() === name.toLowerCase();
    });
    return result ? true : false;
  }

  _getStorageLocation() {
    return this.categoryStoragePath;
  }
}

module.exports = CategoryDao;

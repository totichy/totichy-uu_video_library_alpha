"use strict";

const createCategorySchema = {
  type: "object",
  properties: {
    categoryId: { type: "string", minLength: 1, maxLength: 3 },
    categoryName: { type: "string", maxLength: 30 },
  },

  required: ["categoryId", "categoryName"],
};

const getCategorySchema = {
  type: "object",
  properties: {
    categoryId: { type: "string", minLength: 1, maxLength: 3 },
  },

  required: ["categoryId"],
};

module.exports = {
  getCategorySchema,
  createCategorySchema,
};

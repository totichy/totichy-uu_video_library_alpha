"use strict";

const createVideoSchema = {
  type: "object",
  properties: {
    code: { type: "string", minLength: 1, maxLength: 30 },
    authorName: { type: "string", minLength: 1, maxLength: 30 },
    authorSurname: { type: "string", minLength: 1, maxLength: 30 },
    title: { type: "string", minLength: 3, maxLength: 100 },
    videoUrl: { type: "string", minLength: 8, maxLength: 250 },
    description: { type: "string", minLength: 3, maxLength: 500 },
    category: { type: "array", uniqueItems: true, maxItems: 10 },
    visible: { type: "boolean" },
    averageRating: { type: "integer", maximum: 5 },
    ratingCount: { type: "integer" },
    ratingTotal: { type: "integer" },
  },

  required: [
    "code",
    "authorName",
    "authorSurname",
    "title",
    "videoUrl",
    "description",
  ],
};

const getVideoSchema = {
  type: "object",
  properties: {
    code: { type: "string", minLength: 1, maxLength: 30 },
  },

  required: ["code"],
};
const ratingVideoSchema = {
  type: "object",
  properties: {
    code: { type: "string", minLength: 1, maxLength: 30 },
    mrating: { type: "integer" },
  },

  required: ["code"],
};
module.exports = {
  getVideoSchema,
  ratingVideoSchema,
  createVideoSchema,
};

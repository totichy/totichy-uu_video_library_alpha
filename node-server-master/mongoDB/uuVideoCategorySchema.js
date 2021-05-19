const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryId: { type: String, maxLength: 3, required: true },
    categoryName: { type: String, minLength: 1, maxLength: 30, required: true }
})
CategorySchema.index({ name: "text", "$**": "text" });
const categoryModel = mongoose.model('uuVideoCategory', CategorySchema);

module.exports = categoryModel;
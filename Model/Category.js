const mongoose = require("mongoose");
const category_schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "400 Please enter category name"] },
    is_publish: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, timestamps: true, versionKey: false }
);

const Categories = mongoose.model("category", category_schema);
module.exports = Categories;

const mongoose = require("mongoose");
const subcategory_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "400 Please enter subcategory name"],
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "400 Please enter category id"],
    },
    is_publish: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, versionKey: false, timestamps: true }
);

const SubCategories = mongoose.model("subcategory", subcategory_schema);
module.exports = SubCategories;

const mongoose = require("mongoose");
const brand_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, versionKey: false, timestamps: true }
);

const Brand = mongoose.model("brand", brand_schema);
module.exports = Brand;

const mongoose = require("mongoose");
const tax_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, versionKey: false, timestamps: true }
);

const Tax = mongoose.model("tax", tax_schema);
module.exports = Tax;

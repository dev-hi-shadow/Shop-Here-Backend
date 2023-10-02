const mongoose = require("mongoose");
const attribute_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    attribute_id: { type: mongoose.Schema.Types.ObjectId, ref: "attribute" },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, timestamps: true, versionKey: false }
);
const Attribute = mongoose.model("attribute", attribute_schema);
module.exports = Attribute;

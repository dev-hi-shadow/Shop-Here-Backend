const mongoose = require("mongoose");
const role_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, versionKey: false, timestamps: true }
);

const Role = mongoose.model("role", role_schema);
module.exports = Role;

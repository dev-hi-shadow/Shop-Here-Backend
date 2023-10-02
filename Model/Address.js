const mongoose = require("mongoose");
const address_schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: { type: String, required: true },
    age: { type: String, required: true },
    phone: { type: Number, required: true },
    second_phone: { type: Number },
    profession: { type: String },
    flat_block_no: { type: String, required: true },
    building: { type: String },
    society: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String },
    is_deleted: { type: Boolean, default: false },
  },
  {
    autoCreate: true,
    versionKey: false,
    timestamps: true,
  }
);

const Address = mongoose.model("address", address_schema);
module.exports = Address;

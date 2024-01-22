const mongoose = require("mongoose");
const address_schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: { type: String, default: "Delivery" },
    is_pickup_address: { type: Boolean, default: false },
    second_phone_no: { type: Number },
    primary_phone_no: { type: Number, required: true },
    flat_block_no: { type: String, required: true },
    society: { type: String, required: true },
    building: { type: String },
    city: { type: String, required: true },
    landmark: { type: String },
    country: { type: String },
    state: { type: String, required: true },
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

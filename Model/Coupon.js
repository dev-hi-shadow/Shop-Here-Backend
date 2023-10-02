const mongoose = require("mongoose");
const coupon_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    discount: { type: Number, required: true },
    discount_type: { type: String, required: true },
    min_order_amount: { type: String, required: true },
    max_discount: { type: String, required: true },
    is_repeatable: { type: boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, timestamps: true, versionKey: false }
);

const Coupon = mongoose.model("coupon", coupon_schema);
module.exports = Coupon;

const mongoose = require("mongoose");
const product_schema = new mongoose.Schema(
  {

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    extra_description: { type: String },
    product_type: {
      type: String, required: true, enum: ["Variable", "Standard"],
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "unit",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
      required: true,
    },
    min_order_quantity: { type: Number, default: 1 },
    max_order_quantity: { type: Number },
    attributes: [{
      attribute_id: { type: mongoose.Schema.Types.ObjectId, ref: "attribute" },
      values: { type: [], ref: "attribute" }
    }],
    images: { type: [] },
    SKU: { type: String, required: true },
    freshness: {
      type: String,
      default: "New",
      enum: ["New", "Second Hand", "Refurbished"],
    },
    type: {
      type: String,
      default: "Standard",
      enum: ["Standard", "Pack Of"],
    },
    returnable: { type: Boolean, required: true },
    cancellable: { type: Boolean, required: true },
    replaceable: { type: Boolean, required: true },
    friendly_url: { type: String, required: true },
    meta_title: { type: String },
    meta_description: { type: String },
    price: [
      {
        attribute_ids: { type: [] },
        variation: String,
        manufacture_price: Number,
        retail_price: Number,
        is_publish: { type: Boolean, default: false }
      }
    ],
    guarantee: { type: String },
    warranty: { type: String },
    is_publish: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, versionKey: false, timestamps: true }
);

const Product = mongoose.model("product", product_schema);
module.exports = Product;

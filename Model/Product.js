const mongoose = require("mongoose");
const product_schema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    pickup_locations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "address" },
    ],
    short_description: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    extra_description: { type: String },
    product_type: {
      type: String,
      required: true,
      enum: ["Digital", "Physical"],
    },
    made_in: { type: Object, required: true },
    assembled_in: { type: Object },
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
    attributes: [
      {
        attribute_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "attribute",
        },
        values: { type: [], ref: "attribute" },
      },
    ],
    images: [
      {
        attribute_ids: Array,
        image_url: Number,
      },
    ],

    SKU: { type: String, required: true },
    freshness: {
      type: String,
      default: "New",
      enum: ["New", "Second Hand", "Refurbished"],
    },
    returnable: { type: Boolean, required: true },
    cancellable: {
      is_cancellable: { type: Boolean, required: true },
      cancellable_till: { type: String },
    },
    is_tax_included: { type: Boolean, required: true },
    tax_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tax",
    },
    is_cod_allowed: { type: Boolean, required: true },
    replaceable: { type: Boolean, required: true },
    friendly_url: { type: String, required: true },
    meta_title: { type: String },
    meta_description: { type: String },
    variation: [
      {
        attribute_ids: { type: [] },
        variation: String,
        manufacture_price: { type: Number, required: true },
        retail_price: { type: Number, required: true },
        tax_amount: { type: Number, required: true },
        special_price: Number,
        weight: Number,
        height: Number,
        length: Number,
        depth: Number,
        is_publish: { type: Boolean, default: false },
      },
    ],
    guarantee_period: { type: String },
    warranty_period: { type: String },
    is_publish: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { autoCreate: true, versionKey: false, timestamps: true }
);

const Product = mongoose.model("product", product_schema);
module.exports = Product;

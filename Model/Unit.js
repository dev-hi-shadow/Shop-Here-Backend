const mongoose = require("mongoose");
const unit_schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        unit_code: { type: String, required: true },
        is_deleted: { type: Boolean, default: false },
    },
    { autoCreate: true, versionKey: false, timestamps: true }
);

const Unit = mongoose.model("unit", unit_schema);
module.exports = Unit;

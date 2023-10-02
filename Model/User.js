const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const User_Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  }
);

User_Schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hash(this.password, 12);
    this.password = hashPassword;
  }
  next();
});

User_Schema.methods.GetAuthToken = async function () {
  const token = JWT.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

User_Schema.methods.ComparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword.toString(), this.password);
  return isMatch;
};

const User = mongoose.model("user", User_Schema);
module.exports = User;

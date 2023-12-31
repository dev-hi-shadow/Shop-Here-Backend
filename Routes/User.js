const express = require("express");
const {
  createUser,
  loginUser,
  UpdateProfile,
  DeleteAndRecoverProfile,
  GetProfile,
  logoutUser,
} = require("../Controller/User");
const { isAuth } = require("../Utils/isAuth");
const router = express.Router();
router.route("/profile").get(isAuth, GetProfile);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").put(logoutUser);
router.route("/profile/update/:id").put(isAuth, UpdateProfile);
router.route("/profile/delete/:id").delete(isAuth, DeleteAndRecoverProfile);

module.exports = router;

const express = require("express");
const {
  CreateCategory,
  UpdateCategory,
  DeleteAndRecoverCategory,
  GetCategory,
} = require("../Controller/Category");
const { isAuth } = require("../Utils/isAuth");
const router = express.Router();

router.route("/create").post(isAuth ,CreateCategory);
router.route("/").get(GetCategory);
router.route("/update/:id").put(isAuth ,UpdateCategory);
router.route("/delete-recover/:id").put(isAuth ,DeleteAndRecoverCategory);

module.exports = router;

const express = require("express");
const {
  CreateSubCategory,
  GetSubCategory,
  UpdateSubCategory,
  DeleteAndRecoverSubCategory,
} = require("../Controller/SubCategory");
const { isAuth } = require("../Utils/isAuth");
const router = express.Router();

router.route("/create").post(isAuth ,CreateSubCategory);
router.route("/").get(GetSubCategory);
router.route("/update/:id").put(isAuth ,UpdateSubCategory);
router.route("/delete-recover/:id").put(isAuth ,DeleteAndRecoverSubCategory);

module.exports = router;

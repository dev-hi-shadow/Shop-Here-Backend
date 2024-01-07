const express = require("express");
const { isAuth } = require("../Utils/isAuth");
const {
  BrandCreate,
  GetBrand,
  UpdateBrand,
  DeleteAndRecoverBrand,
} = require("../Controller/Brand");
const router = express.Router();

router.route("/create").post(isAuth, BrandCreate);
router.route("/").get(GetBrand);
router.route("/update/:id").put(isAuth ,UpdateBrand);
router.route("/delete-recover/:id").put(isAuth ,DeleteAndRecoverBrand);

module.exports = router;

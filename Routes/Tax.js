const express = require("express");
const { isAuth } = require("../Utils/isAuth");
const {
  TaxCreate,
  GetTax,
  UpdateTax,
  DeleteAndRecoverTax,
} = require("../Controller/Tax");
const router = express.Router();

router.route("/create").post(isAuth, TaxCreate);
router.route("/").get(GetTax);
router.route("/update/:id").put(isAuth, UpdateTax);
router.route("/delete-recover/:id").put(isAuth, DeleteAndRecoverTax);

module.exports = router;

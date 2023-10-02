const express = require("express");
const {
  CreateProduct,
  GetProduct,
  UpdateProduct,
  DeleteAndRecoverProduct,
} = require("../Controller/Product");
const { isAuth } = require("../Utils/isAuth");
const router = express.Router();

router.route("/create").post(isAuth ,CreateProduct);
router.route("/").get(GetProduct);
router.route("/update/:id").put(isAuth ,UpdateProduct);
router.route("/delete-recover/:id").delete(isAuth ,DeleteAndRecoverProduct);

module.exports = router;

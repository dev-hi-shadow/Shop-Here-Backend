const express = require("express");
const {
  CreateAttribute,
  GetAttributes,
  UpdateAttribute,
  DeleteAndRecoverAttribute,
  DeleteValue,
  AddValue,
} = require("../Controller/Attribute");
const { isAuth } = require("../Utils/isAuth");
const router = express.Router();

router.route("/create").post(isAuth , CreateAttribute);
router.route("/").get(GetAttributes);
router.route("/update/:id").put(isAuth ,UpdateAttribute);
router.route("/delete-recover/:id").delete(isAuth ,DeleteAndRecoverAttribute);
router.route("/value/delete/:id").put(isAuth ,DeleteValue);
router.route("/value/add/:id").post(isAuth ,AddValue);

module.exports = router;

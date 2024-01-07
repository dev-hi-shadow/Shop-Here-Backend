const express = require("express");
const {
  CreateAttribute,
  GetAttributes,
  UpdateAttribute,
  DeleteAndRecoverAttribute,
 } = require("../Controller/Attribute");
const { isAuth } = require("../Utils/isAuth");
const router = express.Router();

router.route("/create").post(isAuth , CreateAttribute);
router.route("/").get(GetAttributes);
router.route("/update/:id").put(isAuth ,UpdateAttribute);
router.route("/delete-recover/:id").put(isAuth ,DeleteAndRecoverAttribute);
  
module.exports = router;

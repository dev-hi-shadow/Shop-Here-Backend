const express = require("express");
const { isAuth } = require("../Utils/isAuth");
const {
  AddressCreate,
  GetAddress,
  UpdateAddress,
  DeleteAndRecoverAddress,
} = require("../Controller/Address");
const router = express.Router();

router.route("/create").post(isAuth, AddressCreate);
router.route("/").get(GetAddress);
router.route("/update/:id").put(isAuth , UpdateAddress);
router.route("/delete-recover/:id").delete(isAuth , DeleteAndRecoverAddress);

module.exports = router;

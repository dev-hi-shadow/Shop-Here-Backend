const express = require("express");
const { isAuth } = require("../Utils/isAuth");
const {
  RoleCreate,
  GetRole,
  UpdateRole,
  DeleteAndRecoverRole,
} = require("../Controller/Role");
const router = express.Router();

router.route("/create").post(isAuth, RoleCreate);
router.route("/").get(GetRole);
router.route("/update/:id").put(isAuth ,UpdateRole);
router.route("/delete-recover/:id").delete(isAuth ,DeleteAndRecoverRole);

module.exports = router;

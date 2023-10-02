const express = require("express");
const { isAuth } = require("../Utils/isAuth");
const {
    UnitCreate,
    GetUnit,
    UpdateUnit,
    DeleteAndRecoverUnit,
} = require("../Controller/Unit");
const router = express.Router();

router.route("/create").post(isAuth, UnitCreate);
router.route("/").get(GetUnit);
router.route("/update/:id").put(isAuth ,UpdateUnit);
router.route("/delete-recover/:id").delete(isAuth ,DeleteAndRecoverUnit);

module.exports = router;

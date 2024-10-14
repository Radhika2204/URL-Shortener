const express = require("express");
const router = express.Router();
const { handlesignupuser, handleloginuser } = require("../controllers/user");

router.post("/", handlesignupuser);
router.post("/login", handleloginuser);

module.exports = router;

const express = require("express");
const { genertaeshortURl, handlegetanayltics } = require("../controllers/url");
const router = express.Router();

router.post("/", genertaeshortURl);

router.get("/analytics/:shortid", handlegetanayltics);
module.exports = router;

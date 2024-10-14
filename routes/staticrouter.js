const express = require("express");
const router = express.Router();
const url = require("../models/url");
const { rstrictTo } = require("../middleware/auth");
router.get("/admin/urls", rstrictTo(["ADMIN"]), async (req, res) => {
  const g = await url.find({});
  return res.render("home", {
    urls: g,
  });
});
router.get("/", rstrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  //  if(!req.user) return res.redirect("/login")
  const g = await url.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: g,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
module.exports = router;

const shortid = require("shortid");
const URL = require("../models/url");
async function genertaeshortURl(req, res) {
  const body = req.body;
  if (!body.url) {
    console.log(body.url);
    return res.status(400).json({ error: "Please enter a valid URL" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visithistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortID,
  });
}
async function handlegetanayltics(req, res) {
  const shortid = req.params.shortid;
  const c = await URL.findOne({
    shortId: shortid,
  });
  return res.json({
    totalclick: c.visithistory.length,
    analytics: c.visithistory,
  });
}
module.exports = {
  genertaeshortURl,
  handlegetanayltics,
};

const user = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setuser, getuser } = require("../service/auth");
async function handlesignupuser(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleloginuser(req, res) {
  const { email, password } = req.body;
  const userr = await user.findOne({ email, password });
  if (!userr) {
    res.render("login", {
      error: "Invalid username or password",
    });
  }
  //const sessionID = uuidv4();
  const token = setuser(userr);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = { handlesignupuser, handleloginuser };

// const { get } = require("mongoose");
const { getuser } = require("../service/auth");

function checkforauthentication(req, res, next) {
  req.user = null;
  const tokencookie = req.cookies?.token;
  if (!tokencookie )
    return next();

  const token = tokencookie
  const user = getuser(token);
  req.user = user;
  return next();
}

function rstrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    //if(roles.includes )
    if (!roles.includes(req.user.role)) {
      res.end("you are unauthorized ");
    }
    return next();
  };
}
// async function restricttologeedinuseronly(req,res,next) {
//     const userid = req.cookies?.uid;
//     if(!userid){
//         return res.redirect("/login")
//     }

//     const x = getuser(userid);
//     if(!x){
//         return res.redirect("/login")
//     }
//     req.user = x;
//     next();
// }

// async function checkAuth(req,res,next) {
//     const userid = req.cookies?.uid;

//     const x = getuser(userid);

//     req.user = x;
//     next();
// }

module.exports = { checkforauthentication, rstrictTo };

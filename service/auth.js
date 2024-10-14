/////-stateful--const sessionidtousermap = new Map();
const jwt = require("jsonwebtoken");
const secret = "radhika";

function setuser(user) {
  // Make sure to use only necessary user information
  // if (typeof user !== 'object' || user === null || Array.isArray(user)) {
  //     throw new Error('Expected "user" to be a plain object.');
  // }
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getuser(token) {
  if (!token) return null;

  // Check if token format is valid
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) return null;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("JWT verification error:", err);
    return null; // or handle error as needed
  }
}

module.exports = {
  setuser,
  getuser,
};

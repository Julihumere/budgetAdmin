const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1w" });
};

module.exports = { generateToken };

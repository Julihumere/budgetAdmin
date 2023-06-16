const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).send({ message: "NOT_AUTHORIZED" });
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwt = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "NOT_AUTHORIZED" });
  }
};

module.exports = checkJWT;

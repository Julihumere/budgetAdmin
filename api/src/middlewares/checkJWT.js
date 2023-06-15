import jwt from "jsonwebtoken";

export const checkJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
};

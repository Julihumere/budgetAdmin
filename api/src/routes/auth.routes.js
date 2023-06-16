const { Router } = require("express");
const authController = require("../Controllers/auth.controller.js");
const authRoutes = Router();

authRoutes.post("/register", authController.register);

authRoutes.post("/login", authController.login);

//USER LOGOUT
authRoutes.put("/logout", async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await logout(email);
    res.status(200).send("Usar has closed session");
  } catch (error) {
    next(error);
  }
});

module.exports = authRoutes;

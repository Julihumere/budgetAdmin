const { Router } = require("express");
const authController = require("../Controllers/auth.controller.js");
const authRoutes = Router();

authRoutes.post("/register", authController.registerController);

authRoutes.post("/login", authController);

authRoutes.post("/auth", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await authentication(email);
    if (user === "User not found") {
      res.send("User not found");
    } else {
      const checkPassword = await compare(password, user.password);
      if (checkPassword || !checkPassword) {
        if (checkPassword === true) {
          res.send("User has started session");
        }
        if (checkPassword === false) {
          res.send("Password incorrect");
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

//USER LOGIN
authRoutes.put("/login", async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await login(email);
    res.status(200).send("Usar has started session");
  } catch (error) {
    next(error);
  }
});

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

const { Router } = require("express");
const userRoutes = Router();

const userController = require("../Controllers/user.controller.js");

// GET USERS
userRoutes.get("/users", userController.getUsers);

//GET USER
userRoutes.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    let user = await getUser(email);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRoutes;

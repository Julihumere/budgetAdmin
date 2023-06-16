const { Router } = require("express");
const userRoutes = Router();
const checkJWT = require("../middlewares/checkJWT.js");
const userController = require("../Controllers/user.controller.js");

// GET USERS
userRoutes.get("/users", userController.getUsers);

//GET USER
userRoutes.get("/:email", checkJWT, userController.getUser);

module.exports = userRoutes;

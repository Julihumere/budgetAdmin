const { Router } = require("express");
const router = Router();
const {
  getUsers,
  postUsers,
  authentication,
  login,
  logout,
} = require("../Controllers/ControllesUser.js");

// GET USERS
router.get("/users", async (req, res, next) => {
  const allUsers = await getUsers();
  res.status(200).json(allUsers);
});

//POST USERS
router.post("/creationUser", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let newUser = await postUsers(firstName, lastName, email, password);
    if (newUser) {
      res.status(200).send("user created");
    }
  } catch (error) {
    next(error);
  }
});

//USER AUTHENTICATION
router.get("/authentication", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userAuthentication = await authentication(email, password);
    res.status(200).send("User has started session");
  } catch (error) {
    next(error);
  }
});

//USER LOGIN
router.put("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await login(email, password);
    res.status(200).send("Usar has started session");
  } catch (error) {
    next(error);
  }
});

//USER LOGOUT
router.put("/logout", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await logout(email, password);
    res.status(200).send("Usar has closed session");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

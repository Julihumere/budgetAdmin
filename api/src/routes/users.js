const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUser,
  postUsers,
  authentication,
  login,
  logout,
  compare,
} = require("../Controllers/ControllesUser.js");

// GET USERS
router.get("/users", async (req, res, next) => {
  const allUsers = await getUsers();
  res.status(200).json(allUsers);
});

//GET USER
router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    let user = await getUser(email);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
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
router.post("/auth", async (req, res, next) => {
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
router.put("/login", async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await login(email);
    res.status(200).send("Usar has started session");
  } catch (error) {
    next(error);
  }
});

//USER LOGOUT
router.put("/logout", async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await logout(email);
    res.status(200).send("Usar has closed session");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

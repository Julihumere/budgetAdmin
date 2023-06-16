const authService = require("../services/auth.service.js");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let newUser = await authService.register(
      firstName,
      lastName,
      email,
      password
    );
    if (newUser) {
      return res.status(201).send("USER_CREATED");
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let auth = await authService.login(email, password);
    if (auth) {
      return res.status(200).send({ msg: "USER_LOGGED", auth });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };

const authService = require("../services/auth.service.js");

const registerController = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let newUser = await authService.registerService(
      firstName,
      lastName,
      email,
      password
    );
    if (newUser) {
      return res.status(200);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let auth = await authService;
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController };

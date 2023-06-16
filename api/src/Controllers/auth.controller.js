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

//Controller Logout User
const logout = async (email) => {
  console.log("LOGOUT", email);
  let userLogout = await await User.findOne({
    where: {
      email: { [Op.iLike]: `${email}` },
    },
  });
  userLogout.update({ status: "Logout" });
  userLogout.save();
  return userLogout;
};

module.exports = { register, login };

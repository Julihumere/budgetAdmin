const { User, Incom, Expense } = require("../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const userServices = require("../services/user.service");

// Controller GetUsers.
const getUsers = async (req, res, next) => {
  const users = await userServices.getUsers();
  if (users) {
    return res.status(200).json(users);
  } else {
    return res.status(400).json({ message: "NO_USERS" });
  }
};
//Controller GetUser.
const getUser = async (email) => {
  const user = await User.findByPk(email, {
    include: [
      { model: Incom, through: { attributes: [] } },
      { model: Expense, through: { attributes: [] } },
    ],
  });
  return user;
};

// Controller Authentication User.
const authentication = async (email) => {
  let user = await User.findOne({
    where: {
      email: { [Op.iLike]: `${email}` },
    },
  });
  console.log("PRUEBA", user);
  if (user === null) {
    return "User not found";
  }
  return user;
};

//Controller Login User
const login = async (email) => {
  let userLogin = await await User.findOne({
    where: {
      email: { [Op.iLike]: `${email}` },
    },
  });
  userLogin.update({ status: "Login" });
  userLogin.save();
  return userLogin;
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

// Encriptacion
const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

// Comparacion
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = {
  getUsers,
  getUser,
  authentication,
  login,
  logout,
  compare,
};

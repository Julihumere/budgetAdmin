const { User, Incom, Expense } = require("../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

// Controller GetUsers.
const getUsers = async () => {
  const allUsers = await User.findAll({
    include: [
      { model: Incom, through: { attributes: [] } },
      { model: Expense, through: { attributes: [] } },
    ],
  });
  return allUsers;
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

// Controller PostUsers.
const postUsers = async (firstName, lastName, email, password) => {
  const passwordHash = await encrypt(password);
  const newUser = await User.findOrCreate({
    where: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    },
  });
  return newUser;
};

// Controller Authentication User.
const authentication = async (email) => {
  let user = await User.findOne({
    where: { email: email },
  });
  return user;
};

//Controller Login User
const login = async (email, password) => {
  let userLogin = await await User.findOne({
    where: {
      email: { [Op.iLike]: `${email}` },
      password: { [Op.iLike]: `${password}` },
    },
  });
  userLogin.update({ status: "Login" });
  userLogin.save();
  return userLogin;
};

//Controller Logout User

const logout = async (email, password) => {
  let userLogout = await await User.findOne({
    where: {
      email: { [Op.iLike]: `${email}` },
      password: { [Op.iLike]: `${password}` },
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
  postUsers,
  authentication,
  login,
  logout,
  compare,
};

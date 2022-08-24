const { User, Incom, Expense } = require("../db.js");
const { Op } = require("sequelize");

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

// Controller PostUsers.
const postUsers = async (firstName, lastName, email, password) => {
  const newUser = await User.findOrCreate({
    where: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  });

  return newUser;
};

// Controller Authentication User.
const authentication = async (email, password) => {
  console.log(email, password);
  let user = await User.findOne({
    where: {
      email: { [Op.iLike]: `${email}` },
      password: { [Op.iLike]: `${password}` },
    },
    include: [{ model: Incom }, { model: Expense }],
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

module.exports = {
  getUsers,
  postUsers,
  authentication,
  login,
  logout,
};

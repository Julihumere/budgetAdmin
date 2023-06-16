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
const getUser = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await userServices.getUser(email);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "NO_USER" });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { email } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const userUpdate = await userServices.update(email, firstName, lastName);
    return res.status(200).send("USER_UPDATE");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { email } = req.params;
  try {
    const userDelete = await userServices.deleteUser(email);
    return res.status(200).send("USER_DELETE");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  update,
  deleteUser,
};

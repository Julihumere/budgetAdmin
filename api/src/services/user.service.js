const { User, Incom, Expense } = require("../db.js");

const getUsers = async () => {
  const allUsers = await User.findAll({
    include: [
      { model: Incom, through: { attributes: [] } },
      { model: Expense, through: { attributes: [] } },
    ],
  });
  return allUsers;
};

const getUser = async (email) => {
  const user = await User.findByPk(email, {
    include: [
      { model: Incom, through: { attributes: [] } },
      { model: Expense, through: { attributes: [] } },
    ],
  });
  return user;
};

module.exports = { getUsers, getUser };

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

module.exports = { getUsers };

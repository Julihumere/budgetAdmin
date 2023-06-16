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

  if (!user) return new Error("USER_NOT_EXIST");

  return user;
};

const update = async (email, firstName, lastName) => {
  const user = await getUser(email);

  if (!user) return new Error("USER_NOT_EXIST");

  if (firstName) {
    await user.update({ firstName: firstName });
    await user.save();
  }
  if (lastName) {
    await user.update({ lastName: lastName });
    await user.save();
  }

  return user;
};

const deleteUser = async (email) => {
  const user = await getUser(email);

  if (!user) return new Error("USER_NOT_EXIST");

  await user.destroy();

  return;
};
module.exports = { getUsers, getUser, update, deleteUser };

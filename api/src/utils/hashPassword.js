const bcrypt = require("bcryptjs");

const encrypt = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const compare = () => {};

module.exports = { encrypt, compare };

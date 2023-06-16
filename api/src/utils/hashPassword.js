const bcrypt = require("bcryptjs");

const encrypt = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const compare = async (bodyPassword, userPassword) => {
  const compare = await bcrypt.compare(bodyPassword, userPassword);
  return compare;
};

module.exports = { encrypt, compare };

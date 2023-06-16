const { User } = require("../db.js");
const { generateToken } = require("../utils/generateToken");
const { encrypt, compare } = require("../utils/hashPassword");

const register = async (firstName, lastName, email, password) => {
  const passwordHash = await encrypt(password);
  const newUser = await User.findOrCreate({
    where: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    },
  });

  return { newUser, token: generateToken(newUser) };
};

const login = async (email, password) => {
  const user = await User.findByPk(email);
  const comparePassword = await compare(password, user.password);
  if (!user) throw new Error("Invalid email");
  if (comparePassword === false) throw new Error("Invalid password");

  return { user, token: generateToken(user) };
};

module.exports = { register, login };

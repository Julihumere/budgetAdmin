const { compare } = require("bcryptjs");
const { User } = require("../db.js");
const { generateToken } = require("../utils/generateToken");
const { encrypt } = require("../utils/hashPassword");

const registerService = async (firstName, lastName, email, password) => {
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
  const compare = await compare(password);
};

module.exports = { registerService };

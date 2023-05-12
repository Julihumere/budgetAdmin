require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Incom, Expense } = sequelize.models;

User.belongsToMany(Incom, { through: "User__Incom" });
Incom.belongsToMany(User, { through: "User__Incom" });
User.belongsToMany(Expense, { through: "User__Expense" });
Expense.belongsToMany(User, { through: "User__Expense" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

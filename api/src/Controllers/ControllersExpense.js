const { Expense } = require("../db.js");

//Controller GetExpense.
const getExpense = async () => {
  const allExpenses = await Expense.findAll();
  return allExpenses;
};

//Controller PostExpense.
const postExpense = async (concept, amount, category) => {
  let newExpense = await Expense.create({
    concept: concept,
    amount: amount,
    type: "Expense",
    category: category,
  });
  return newExpense;
};

//Controller UpdateExpense.
const updateExpense = async (id, concept, amount, category) => {
  let expenseUpdated = await Expense.findByPk(id);
  if (concept) {
    expenseUpdated.update({ concept: concept });
    expenseUpdated.save();
  }
  if (amount) {
    expenseUpdated.update({ amount: amount });
    expenseUpdated.save();
  }
  if (category) {
    expenseUpdated.update({ category: category });
    expenseUpdated.save();
  }
  return expenseUpdated;
};

//Controller DeleteExpense
const deleteExpense = async (id) => {
  let expenseDeleted = await Expense.findByPk(id);
  return expenseDeleted;
};

module.exports = {
  getExpense,
  postExpense,
  updateExpense,
  deleteExpense,
};

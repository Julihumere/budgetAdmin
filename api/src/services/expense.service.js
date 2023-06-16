const { Expense } = require("../db.js");

const getExpense = async (id) => {
  const expense = await Expense.findByPk(id);
  return expense;
};

const creationExpense = async (concept, amount, category, date) => {
  let newExpense = await Expense.create({
    concept: concept,
    amount: amount,
    type: "Expense",
    category: category,
    date: date,
  });
  return newExpense;
};

const updateExpense = async (id, concept, amount, category) => {
  let expenseUpdated = await getExpense(id);

  console.log(expenseUpdated);

  if (concept) {
    await expenseUpdated.update({ concept: concept });
    await expenseUpdated.save();
  }
  if (amount) {
    await expenseUpdated.update({ amount: amount });
    await expenseUpdated.save();
  }
  if (category) {
    await expenseUpdated.update({ category: category });
    await expenseUpdated.save();
  }
  return expenseUpdated;
};

const deleteExpense = async (id) => {
  let expenseDeleted = await getExpense(id);
  await expenseDeleted.destroy();
  return expenseDeleted;
};

module.exports = {
  getExpense,
  creationExpense,
  updateExpense,
  deleteExpense,
};

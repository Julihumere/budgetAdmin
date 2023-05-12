const { Expense } = require("../db.js");

//Controller GetExpenseById
const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id)
  console.log(expense)
  return expense
}


//Controller PostExpense.
const postExpense = async (concept, amount, category, date) => {
  let newExpense = await Expense.create({
    concept: concept,
    amount: amount,
    type: "Expense",
    category: category,
    date: date,
  });
  return newExpense;
};

//Controller UpdateExpense.
const updateExpense = async (id, concept, amount, category) => {
  let expenseUpdated = await Expense.findByPk(id);
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

//Controller DeleteExpense
const deleteExpense = async (id) => {
  let expenseDeleted = await Expense.findByPk(id);
  return expenseDeleted;
};

module.exports = {
  getExpenseById,
  postExpense,
  updateExpense,
  deleteExpense,
};

const expenseServices = require("../services/expense.service.js");

const creationExpense = async (req, res, next) => {
  const { concept, amount, category, email, date } = req.body;
  try {
    let newExpense = await expenseServices.creationExpense(
      concept,
      amount,
      category,
      date
    );
    await newExpense.addUser(email);
    res.status(201).send("EXPENSE_CREATED");
  } catch (error) {
    next(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await expenseServices.getExpense(id);

    if (expense) {
      return res.status(200).json(expense);
    } else {
      return res.status(400).json("EXPENSE_NOT_EXIST");
    }
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  const { id } = req.params;
  const { concept, amount, category } = req.body;
  try {
    let expenseUpdated = await expenseServices.updateExpense(
      id,
      concept,
      amount,
      category
    );
    res.status(200).send("EXPENSE_UPDATED");
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    let expenseDeleted = await expenseServices.deleteExpense(id);
    res.status(200).send("EXPENSE_DELETED");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  creationExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};

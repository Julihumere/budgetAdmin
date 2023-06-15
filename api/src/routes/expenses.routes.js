const { Router } = require("express");
const expenseRoutes = Router();
const { Expense } = require("../db.js");
const {
  postExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
} = require("../Controllers/ControllersExpense.js");

expenseRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await getExpenseById(id);
    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
});

expenseRoutes.post("/creationExpense", async (req, res, next) => {
  const { concept, amount, category, email, date } = req.body;
  try {
    let newExpense = await postExpense(concept, amount, category, date);
    await newExpense.addUser(email);
    console.log(newExpense);
    res.status(201).send("Expense created!");
  } catch (error) {
    next(error);
  }
});

expenseRoutes.put("/updateExpense", async (req, res, next) => {
  const { id, concept, amount, category } = req.body;
  try {
    let expenseUpdated = await updateExpense(id, concept, amount, category);
    res.status(200).send("Expense update");
  } catch (error) {
    next(error);
  }
});

expenseRoutes.delete("/deleteExpense", async (req, res, next) => {
  const { id } = req.body;
  try {
    let expenseDeleted = await deleteExpense(id);
    await expenseDeleted.destroy();
    res.status(200).send("Expense deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = expenseRoutes;

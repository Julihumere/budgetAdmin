const { Router } = require("express");
const router = Router();
const { Expense } = require("../db.js");
const {
  getExpense,
  postExpense,
  updateExpense,
  deleteExpense,
} = require("../Controllers/ControllersExpense.js");

router.get("/expenses", async (req, res, next) => {
  try {
    const allExpenses = await getExpense();
    res.send(allExpenses);
  } catch (error) {
    next(error);
  }
});

router.post("/creationExpense", async (req, res, next) => {
  const { concept, amount, category, email, date } = req.body;
  try {
    let newExpense = await postExpense(concept, amount, category, date);
    await newExpense.addUser(email);
    res.json(newExpense);
  } catch (error) {
    next(error);
  }
});

router.put("/updateExpense", async (req, res, next) => {
  const { id, concept, amount, category } = req.body;
  try {
    let expenseUpdated = await updateExpense(id, concept, amount, category);
    res.send(expenseUpdated);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteExpense", async (req, res, next) => {
  const { id } = req.body;
  try {
    let expenseDeleted = await deleteExpense(id);
    await expenseDeleted.destroy();
    res.send(expenseDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

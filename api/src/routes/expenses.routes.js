const { Router } = require("express");
const expenseRoutes = Router();
const { Expense } = require("../db.js");
const expenseController = require("../Controllers/expense.controller.js");
const checkJWT = require("../middlewares/checkJWT.js");

expenseRoutes.post(
  "/creationExpense",
  checkJWT,
  expenseController.creationExpense
);

expenseRoutes.get("/:id", checkJWT, expenseController.getExpense);

expenseRoutes.put("/:id", checkJWT, expenseController.updateExpense);

expenseRoutes.delete("/:id", checkJWT, expenseController.deleteExpense);

module.exports = expenseRoutes;

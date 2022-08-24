
const { Router } = require("express");
const users = require("./users.js");
const incoms = require("./incoms.js");
const expenses = require("./expenses.js");
const router = Router();

router.use("/user", users);
router.use("/incom", incoms);
router.use("/expense", expenses);

module.exports = router;

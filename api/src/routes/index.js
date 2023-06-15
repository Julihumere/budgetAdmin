const { Router } = require("express");
const auth = require("./auth.routes.js");
const users = require("./users.routes.js");
const incoms = require("./incoms.routes.js");
const expenses = require("./expenses.routes.js");
const router = Router();

router.use("/auth", auth);
router.use("/user", users);
router.use("/incom", incoms);
router.use("/expense", expenses);

module.exports = router;

const { Router } = require("express");
const router = Router();
const { Incom, User } = require("../db.js");
const {
  getIncoms,
  postIncoms,
  updateIncoms,
  deleteIncoms,
} = require("../Controllers/ControllerIncom.js");

router.get("/incoms", async (req, res, next) => {
  try {
    const allIncoms = await getIncoms();
    res.send(allIncoms);
  } catch (error) {
    next(error);
  }
});

router.post("/creationIncom", async (req, res, next) => {
  const { concept, amount, type, category, email, date } = req.body;
  try {
    let newIncom = await postIncoms(concept, amount, category, date);
    await newIncom.addUser(email);
    res.json(newIncom);
  } catch (error) {
    next(error);
  }
});

router.put("/updateIncom", async (req, res, next) => {
  const { id, concept, amount, category } = req.body;
  try {
    let incomUpdated = await updateIncoms(id, concept, amount, category);
    res.send(incomUpdated);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteIncom", async (req, res, next) => {
  const { id } = req.body;
  try {
    let incomDeleted = await deleteIncoms(id);
    await incomDeleted.destroy();
    res.send(incomDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

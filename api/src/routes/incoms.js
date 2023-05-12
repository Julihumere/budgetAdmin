const { Router } = require("express");
const router = Router();
const {
  postIncoms,
  updateIncoms,
  deleteIncoms,
  getIncomById,
} = require("../Controllers/ControllerIncom.js");



router.get('/:id', async(req, res, next)=>{
  try {
    const {id} = req.params
    const incom = await getIncomById(id)
    res.status(200).json(incom)
  } catch (error) {
    next(error)
  }
})

router.post("/creationIncom", async (req, res, next) => {
  const { concept, amount, type, category, email, date } = req.body;
  try {
    let newIncom = await postIncoms(concept, amount, category, date);
    await newIncom.addUser(email);
    res.status(201).send("Incom created!");
  } catch (error) {
    next(error);
  }
});

router.put("/updateIncom/:id", async (req, res, next) => {
  const { id } = req.params
  const { concept, amount, category } = req.body;
  try {
    let incomUpdated = await updateIncoms(id, concept, amount, category);
    res.status(200).send("Incom updated!");
  } catch (error) {
    next(error);
  }
});



router.delete("/deleteIncom/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let incomDeleted = await deleteIncoms(id);
    await incomDeleted.destroy();
    res.status(200).send("Incom deleted!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

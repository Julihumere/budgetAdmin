const incomService = require("../services/incom.service");

const creationIncom = async (req, res, next) => {
  const { concept, amount, category, email, date } = req.body;
  try {
    let newIncom = await incomService.creationIncom(
      concept,
      amount,
      category,
      date
    );
    await newIncom.addUser(email);
    res.status(201).send("INCOM_CREATED");
  } catch (error) {
    next(error);
  }
};

const getIncom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const incom = await incomService.getIncomById(id);
    res.status(200).json(incom);
  } catch (error) {
    next(error);
  }
};

const updateIncom = async (req, res, next) => {
  const { id } = req.params;
  const { concept, amount, category } = req.body;
  try {
    let incomUpdated = await incomService.updateIncoms(
      id,
      concept,
      amount,
      category
    );
    res.status(200).send("INCOM_UPDATED");
  } catch (error) {
    next(error);
  }
};

const deleteIncom = async (req, res, next) => {
  const { id } = req.params;
  try {
    let incomDeleted = await deleteIncoms(id);
    await incomDeleted.destroy();
    res.status(200).send("Incom deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = { getIncom, creationIncom, updateIncom, deleteIncom };

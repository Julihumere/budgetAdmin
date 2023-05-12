const { Incom } = require("../db.js");


//Controller GetIncomById

const getIncomById = async (id) => {
  const incom = await Incom.findByPk(id)
  return incom
}

//Controller PostIncoms
const postIncoms = async (concept, amount, category, date) => {
  let newIncom = await Incom.create({
    concept: concept,
    amount: amount,
    type: "Incom",
    category: category,
    date: date,
  });
  return newIncom;
};

//Controller UpdateIncoms
const updateIncoms = async (id, concept, amount, category) => {
  let incomUpdated = await Incom.findByPk(id);
  if (concept) {
    await incomUpdated.update({ concept: concept });
    await incomUpdated.save();
  }
  if (amount) {
    await incomUpdated.update({ amount: amount });
    await incomUpdated.save();
  }
  if (category) {
    await incomUpdated.update({ category: category });
    await incomUpdated.save();
  }
  return incomUpdated;
};

//Controller DeleteIncoms
const deleteIncoms = async (id) => {
  let incomDeleted = await Incom.findByPk(id);
  return incomDeleted;
};

module.exports = {
  getIncomById,
  postIncoms,
  updateIncoms,
  deleteIncoms,
};

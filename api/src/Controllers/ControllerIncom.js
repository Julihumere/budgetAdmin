const { Incom } = require("../db.js");

//Controller GetIncoms.
const getIncoms = async () => {
  const allIncoms = await Incom.findAll();
  return allIncoms;
};

//Controller PostIncoms
const postIncoms = async (concept, amount, category, date) => {
  let newIncom = await Incom.create({
    concept: concept,
    amount: amount,
    type: "Incom",
    category: category,
    date: date,
  });
  console.log(newIncom);
  return newIncom;
};

//Controller UpdateIncoms
const updateIncoms = async (id, concept, amount, category) => {
  let incomUpdated = await Incom.findByPk(id);
  if (concept) {
    incomUpdated.update({ concept: concept });
    incomUpdated.save();
  }
  if (amount) {
    incomUpdated.update({ amount: amount });
    incomUpdated.save();
  }
  if (category) {
    incomUpdated.update({ category: category });
    incomUpdated.save();
  }
  return incomUpdated;
};

//Controller DeleteIncoms
const deleteIncoms = async (id) => {
  let incomDeleted = await Incom.findByPk(id);
  return incomDeleted;
};

module.exports = {
  getIncoms,
  postIncoms,
  updateIncoms,
  deleteIncoms,
};

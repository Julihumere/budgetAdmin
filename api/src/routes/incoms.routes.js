const { Router } = require("express");
const incomRoutes = Router();
const incomController = require("../Controllers/incom.controller.js");
const checkJWT = require("../middlewares/checkJWT.js");

incomRoutes.post("/creationIncom", checkJWT, incomController.creationIncom);

incomRoutes.get("/:id", checkJWT, incomController.getIncom);

incomRoutes.put("/updateIncom/:id", checkJWT, incomController.updateIncom);

incomRoutes.delete("/deleteIncom/:id", checkJWT, incomController.deleteIncom);

module.exports = incomRoutes;

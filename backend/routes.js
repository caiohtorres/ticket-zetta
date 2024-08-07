const express = require("express");
const routes = express.Router();

const TicketController = require("./controllers/TicketController");

routes.post("/ticket", TicketController.create);
routes.get("/ticket", TicketController.read);
routes.put("/ticket/:id", TicketController.update);
routes.delete("/ticket/:id", TicketController.delete);

module.exports = routes;

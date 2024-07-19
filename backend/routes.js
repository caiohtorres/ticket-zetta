const express = require("express");
const routes = express.Router();

const TicketController = require("./controllers/TicketController");

// Rotas para Ticket
routes.post("/ticket", TicketController.create);
routes.get("/ticket", TicketController.read);
routes.delete("/ticket/:id", TicketController.delete);

module.exports = routes;

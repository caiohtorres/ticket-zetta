const express = require("express");
const routes = express.Router();

const TicketController = require("./controllers/TicketController");

// Rotas para Ticket
routes.post("/ticket", TicketController.create);
routes.get("/ticket", TicketController.read); // A rota correta para buscar todos os tickets
routes.put("/ticket/:id", TicketController.update); // Adicione esta linha
routes.delete("/ticket/:id", TicketController.delete);

module.exports = routes;

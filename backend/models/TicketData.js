const mongoose = require("mongoose");

const TicketDataSchema = new mongoose.Schema({
  nome: String,
  local: String,
  tipoPedido: String,
  descricao: String,
  data: String,
});

module.exports = mongoose.model("Ticket", TicketDataSchema);

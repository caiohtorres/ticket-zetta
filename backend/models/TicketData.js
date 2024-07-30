const mongoose = require("mongoose");

const TicketDataSchema = new mongoose.Schema({
  nome: String,
  local: String,
  tipoPedido: String,
  descricao: String,
  data: String,
  status: { type: String, default: "a-fazer" },
});

module.exports = mongoose.model("Ticket", TicketDataSchema);

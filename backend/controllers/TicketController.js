const Ticket = require("../models/TicketData");

module.exports = {
  async read(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: "ID do ticket não preenchido!" });
    }
    const ticket = await Ticket.findOne({ _id: id });

    if (ticket) {
      return res.json(ticket);
    }
    return res.status(401).json({ error: "Ticket não encontrado!" });
  },

  async create(req, res) {
    const { nome, local, data, tipoPedido, descricao } = req.body;

    if (!nome || !local || !tipoPedido || !descricao) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      const ticketCreated = await Ticket.create({
        nome,
        local,
        data,
        tipoPedido,
        descricao,
      });

      return res.status(201).json({
        success: true,
        message: "Ticket criado com sucesso!",
        ticket: ticketCreated,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar ticket." });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const ticketDeleted = await Ticket.findOneAndDelete({ _id: id });

    if (ticketDeleted) {
      return res.json(ticketDeleted);
    }

    return res.status(401).json({ error: "Ticket não encontrado!" });
  },
};

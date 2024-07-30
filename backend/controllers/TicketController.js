const Ticket = require("../models/TicketData");

module.exports = {
  async read(req, res) {
    try {
      const tickets = await Ticket.find({});
      return res.json(tickets);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar tickets." });
    }
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

  async update(req, res) {
    const { id } = req.params;
    const { nome, local, data, tipoPedido, descricao, status } = req.body;

    try {
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket não encontrado!" });
      }

      ticket.nome = nome !== undefined ? nome : ticket.nome;
      ticket.local = local !== undefined ? local : ticket.local;
      ticket.data = data !== undefined ? data : ticket.data;
      ticket.tipoPedido =
        tipoPedido !== undefined ? tipoPedido : ticket.tipoPedido;
      ticket.descricao = descricao !== undefined ? descricao : ticket.descricao;
      ticket.status = status !== undefined ? status : ticket.status;

      await ticket.save();
      return res.json(ticket);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar ticket." });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const ticketDeleted = await Ticket.findByIdAndDelete(id);

      if (ticketDeleted) {
        return res.json(ticketDeleted);
      }

      return res.status(404).json({ error: "Ticket não encontrado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar ticket." });
    }
  },
};

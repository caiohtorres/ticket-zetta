import React, { useEffect, useState } from "react";
import Api from "../api";
import "../index.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await Api.get("/ticket");
      console.log("Tickets recebidos:", response.data);
      setTickets(response.data);
    } catch (err) {
      console.error("Erro ao buscar os tickets:", err);
    }
  };

  const moveTicket = async (id, direction) => {
    const ticket = tickets.find((t) => t._id === id);
    if (ticket) {
      let newStatus;


      if (direction === "right") {
        newStatus =
          ticket.status === "a-fazer"
            ? "em-andamento"
            : ticket.status === "em-andamento"
            ? "concluidos"
            : ticket.status;
      } else if (direction === "left") {
        newStatus =
          ticket.status === "concluidos"
            ? "em-andamento"
            : ticket.status === "em-andamento"
            ? "a-fazer"
            : ticket.status;
      }

      try {
        await Api.put(`/ticket/${id}`, { ...ticket, status: newStatus });
        fetchTickets();
      } catch (err) {
        console.error("Erro ao mover ticket:", err);
      }
    }
  };

  const deleteTicket = async (id) => {
    try {
      await Api.delete(`/ticket/${id}`);
      fetchTickets();
    } catch (err) {
      console.error("Erro ao deletar ticket:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const columns = {
    "a-fazer": [],
    "em-andamento": [],
    concluidos: [],
  };

  tickets.forEach((ticket) => {
    const ticketStatus = ticket.status || "a-fazer";
    if (!columns[ticketStatus]) {
      console.warn(
        `Status inválido para o ticket com ID ${ticket._id}: ${ticketStatus}`
      );
      ticket.status = "a-fazer";
    }
    columns[ticketStatus].push(
      <div key={ticket._id} className="kanban-item">
        <p>
          <strong>Nome:</strong> {ticket.nome}
        </p>
        <p>
          <strong>Local:</strong> {ticket.local}
        </p>
        <p>
          <strong>Data e Hora:</strong> {ticket.data}
        </p>
        <p>
          <strong>Tipo de Pedido:</strong> {ticket.tipoPedido}
        </p>
        <p>
          <strong>Descrição:</strong> {ticket.descricao}
        </p>

        <button onClick={() => moveTicket(ticket._id, "left")}>Voltar</button>
        <button onClick={() => moveTicket(ticket._id, "right")}>Avançar</button>
        <button className="delete-btn" onClick={() => deleteTicket(ticket._id)}>
          Excluir
        </button>
      </div>
    );
  });

  return (
    <div className="kanban">
      {Object.entries(columns).map(([status, items]) => (
        <div key={status} className="kanban-column">
          <h2>{status.replace("-", " ").toUpperCase()}</h2>
          <div className="kanban-items">
            {items.length > 0 ? items : <p>Nenhum ticket</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

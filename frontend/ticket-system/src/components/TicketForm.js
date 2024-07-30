import React, { useState } from "react";
import Api from "../api";
import "../index.css";

const TicketForm = () => {
  const [form, setForm] = useState({
    nome: "",
    local: "",
    tipoPedido: "",
    descricao: "",
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.local || !form.tipoPedido || !form.descricao) {
      setMensagem("Ticket inválido. Preencha todos os campos.");
    } else {
      const ticket = {
        ...form,
        data: new Date().toLocaleString(),
        status: "a-fazer",
      };
      try {
        const response = await Api.post("/ticket", ticket);
        console.log(response); // Adicione este log para depuração
        if (response.status >= 200 && response.status < 300) {
          // Verifica se o status é de sucesso
          setMensagem("Ticket gerado com sucesso!");
          setForm({ nome: "", local: "", tipoPedido: "", descricao: "" });
        } else {
          setMensagem("Erro ao gerar o ticket.");
        }
      } catch (err) {
        console.error(err); // Adicione este log para depuração
        setMensagem("Erro ao gerar o ticket.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Gerar Ticket de Assistência</h1>
      <form id="ticketForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">
            Nome: <span className="obrigatorio">*</span>
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="local">
            Local: <span className="obrigatorio">*</span>
          </label>
          <input
            type="text"
            id="local"
            name="local"
            value={form.local}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoPedido">
            Tipo de Pedido: <span className="obrigatorio">*</span>
          </label>
          <select
            id="tipoPedido"
            name="tipoPedido"
            value={form.tipoPedido}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Escolha o tipo de pedido
            </option>
            <option value="Emergência">Emergência</option>
            <option value="Muito Urgente">Muito Urgente</option>
            <option value="Urgente">Urgente</option>
            <option value="Pouco Urgente">Pouco Urgente</option>
            <option value="Não Urgente">Não Urgente</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="descricao">
            Descrição do Problema: <span className="obrigatorio">*</span>
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="button-group">
          <button
            type="button"
            className="cancelar"
            onClick={() =>
              setForm({ nome: "", local: "", tipoPedido: "", descricao: "" })
            }
          >
            Cancelar
          </button>
          <button type="submit">Gerar</button>
        </div>
        {mensagem && (
          <div
            id="mensagem"
            style={{
              backgroundColor: mensagem.includes("sucesso")
                ? "#ccffcc"
                : "#ffcccc",
            }}
          >
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
};

export default TicketForm;

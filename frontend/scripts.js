import Api from "./api.js"; // Certifique-se de que o caminho está correto

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ticketForm");
  const mensagem = document.getElementById("mensagem");
  const cancelarButton = document.querySelector("button.cancelar");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("Formulário enviado!");
      const nome = form.nome.value;
      const local = form.local.value;
      const data = new Date().toLocaleString();
      const tipoPedido = form.tipoPedido.value;
      const descricao = form.descricao.value;

      if (!nome || !local || !tipoPedido || !descricao) {
        mensagem.textContent = "Ticket inválido. Preencha todos os campos.";
        mensagem.style.display = "block";
        mensagem.style.backgroundColor = "#ffcccc";
      } else {
        const ticket = {
          nome,
          local,
          data,
          tipoPedido,
          descricao,
          status: "a-fazer",
        };

        try {
          const response = await Api.post("/tickets", ticket); // Certifique-se de que o caminho está correto

          if (response.status === 200) {
            mensagem.textContent = "Ticket gerado com sucesso!";
            mensagem.style.display = "block";
            mensagem.style.backgroundColor = "#ccffcc";
            form.reset();
          } else {
            mensagem.textContent = "Erro ao gerar o ticket.";
            mensagem.style.display = "block";
            mensagem.style.backgroundColor = "#ffcccc";
          }
        } catch (err) {
          mensagem.textContent = "Erro ao gerar o ticket.";
          mensagem.style.display = "block";
          mensagem.style.backgroundColor = "#ffcccc";
        }
      }
    });

    cancelarButton.addEventListener("click", function () {
      form.reset();
      mensagem.style.display = "none";
    });
  }

  if (window.location.pathname.includes("admin.html")) {
    const columns = {
      "a-fazer": document
        .getElementById("a-fazer")
        .querySelector(".kanban-items"),
      "em-andamento": document
        .getElementById("em-andamento")
        .querySelector(".kanban-items"),
      concluidos: document
        .getElementById("concluidos")
        .querySelector(".kanban-items"),
    };

    async function fetchTickets() {
      try {
        const response = await Api.get("/tickets"); // Ajuste o caminho se necessário
        console.log("Tickets:", response.data);
        return response.data;
      } catch (err) {
        console.error("Erro ao buscar os tickets:", err);
        return [];
      }
    }

    async function renderTickets() {
      const tickets = await fetchTickets();
      Object.keys(columns).forEach(
        (column) => (columns[column].innerHTML = "")
      );

      tickets.forEach((ticket) => {
        const ticketElement = document.createElement("div");
        ticketElement.className = "kanban-item";
        ticketElement.innerHTML = `
          <p><strong>Nome:</strong> ${ticket.nome}</p>
          <p><strong>Local:</strong> ${ticket.local}</p>
          <p><strong>Data e Hora:</strong> ${ticket.data}</p>
          <p><strong>Tipo de Pedido:</strong> ${ticket.tipoPedido}</p>
          <p><strong>Descrição:</strong> ${ticket.descricao}</p>
          <button onclick="moveLeft('${ticket._id}')">Voltar</button>
          <button onclick="moveRight('${ticket._id}')">Avançar</button>
          <button class="delete-btn" onclick="deleteTicket('${ticket._id}')">Excluir</button>
        `;
        columns[ticket.status].appendChild(ticketElement);
      });
    }

    window.moveLeft = async function (id) {
      try {
        const response = await Api.get(`/tickets/${id}`);
        const ticket = response.data;

        if (ticket) {
          if (ticket.status === "em-andamento") {
            ticket.status = "a-fazer";
          } else if (ticket.status === "concluidos") {
            ticket.status = "em-andamento";
          }
          await Api.put(`/tickets/${id}`, ticket);
          renderTickets();
        }
      } catch (err) {
        console.error("Erro ao mover ticket:", err);
      }
    };

    window.moveRight = async function (id) {
      try {
        const response = await Api.get(`/tickets/${id}`);
        const ticket = response.data;

        if (ticket) {
          if (ticket.status === "a-fazer") {
            ticket.status = "em-andamento";
          } else if (ticket.status === "em-andamento") {
            ticket.status = "concluidos";
          }
          await Api.put(`/tickets/${id}`, ticket);
          renderTickets();
        }
      } catch (err) {
        console.error("Erro ao mover ticket:", err);
      }
    };

    window.deleteTicket = async function (id) {
      try {
        await Api.delete(`/tickets/${id}`);
        renderTickets();
      } catch (err) {
        console.error("Erro ao deletar ticket:", err);
      }
    };

    renderTickets();

    const loginForm = document.getElementById("loginForm");
    const loginMensagem = document.getElementById("loginMensagem");

    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const password = document.getElementById("password").value;
        const correctPassword = "adminSenha";

        if (password === correctPassword) {
          localStorage.setItem("authenticated", "true");
          console.log(localStorage.getItem("authenticated"));
          window.location.href = "admin.html";
        } else {
          loginMensagem.textContent = "Senha incorreta.";
          loginMensagem.style.display = "block";
          loginMensagem.style.backgroundColor = "#ffcccc";
        }
      });
    }

    if (window.location.pathname.includes("admin.html")) {
      const isAuthenticated = localStorage.getItem("authenticated") === "true";
      if (!isAuthenticated) {
        window.location.href = "login.html";
      }
    }
  }
});

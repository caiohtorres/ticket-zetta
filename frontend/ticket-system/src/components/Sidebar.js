import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Sidebar = () => (
  <nav className="sidebar">
    <img src={require("../img/planejazetta.png")} alt="Logo" />
    <ul>
      <li>
        <Link to="/admin">Administrador</Link>
      </li>
      <li>
        <Link to="/">Gerar Ticket</Link>
      </li>
    </ul>
  </nav>
);

export default Sidebar;

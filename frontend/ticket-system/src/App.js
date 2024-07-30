import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import KanbanBoard from "./components/KanbanBoard";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import TicketForm from "./components/TicketForm";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <Routes>
            <Route
              path="/admin"
              element={<ProtectedRoute element={<KanbanBoard />} />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<TicketForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

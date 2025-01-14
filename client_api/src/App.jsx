import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Especialidades from "./components/Especialidades";
import Medicos from "./components/Medicos";
import Enfermarias from "./components/Enfermarias";
import Prontuarios from "./components/Prontuarios";
import Pacientes from "./components/Pacientes";
import Equipamentos from "./components/Equipamentos";

function App() {
  
  const [paginaAtual, setPaginaAtual] = useState("inicio");

  
  const renderPagina = () => {
    switch (paginaAtual) {
      case "inicio":
        return <h1 className="text-center text-primary">Bem-vindo ao Sistema Hospitalar!</h1>;
      case "especialidades":
        return <Especialidades />;
      case "medicos":
        return <Medicos />;
      case "enfermarias":
        return <Enfermarias />;
      case "prontuarios":
        return <Prontuarios />;
      case "pacientes":
        return <Pacientes />;
      case "equipamentos":
        return <Equipamentos />;
      default:
        return <h1 className="text-danger">Página não encontrada</h1>;
    }
  };


  const criarItemMenu = (pagina, label) => (
    <li className="nav-item">
      <button
        className={`nav-link ${paginaAtual === pagina ? "active" : ""}`}
        onClick={() => setPaginaAtual(pagina)}
      >
        {label}
      </button>
    </li>
  );

  return (
    <div>
      <ul className="nav nav-tabs bg-light">
        {criarItemMenu("inicio", "Início")}
        {criarItemMenu("especialidades", "Especialidades")}
        {criarItemMenu("medicos", "Médicos")}
        {criarItemMenu("enfermarias", "Enfermarias")}
        {criarItemMenu("prontuarios", "Prontuários")}
        {criarItemMenu("pacientes", "Pacientes")}
        {criarItemMenu("equipamentos", "Equipamentos")}
      </ul>
      <div className="container mt-4">{renderPagina()}</div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Personagens from "./components/personagens";
import Filmes from "./components/Filmes";
import Cenarios from "./components/Cenarios";
import Musicas from "./components/Musicas";
import Roupas from "./components/Roupas";
import Acessorios from "./components/Acessorios"


function App() {
  const [paginaAtual, setPaginaAtual] = useState("inicio");

  const renderPagina = () => {
    switch (paginaAtual) {
      case "inicio":
        return <h1>Bem-vindo à aplicação!</h1>;
      case "personagens":
        return <Personagens />;
      case "filmes":
        return <Filmes />;
      case "cenarios":
        return <Cenarios />;
      case "musicas":
        return <Musicas />;
      case "roupas":
        return <Roupas />;
      case "acessorios":
        return <Acessorios />
      default:
        return <h1>Página não encontrada</h1>;
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "inicio" ? "active" : ""}`}
            onClick={() => setPaginaAtual("inicio")}
          >
            Início
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "personagens" ? "active" : ""}`}
            onClick={() => setPaginaAtual("personagens")}
          >
            Personagens
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "filmes" ? "active" : ""}`}
            onClick={() => setPaginaAtual("filmes")}
          >
            Filmes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "cenarios" ? "active" : ""}`}
            onClick={() => setPaginaAtual("cenarios")}
          >
            Cenários
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "musicas" ? "active" : ""}`}
            onClick={() => setPaginaAtual("musicas")}
          >
            Músicas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "roupas" ? "active" : ""}`}
            onClick={() => setPaginaAtual("roupas")}
          >
            Roupas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${paginaAtual === "acessorios" ? "active" : ""}`}
            onClick={() => setPaginaAtual("acessorios")}
          >
            Acessórios
          </button>
        </li>
      </ul>
      <div className="container mt-4">{renderPagina()}</div>
    </div>
  );
}

export default App;

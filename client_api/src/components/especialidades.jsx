import { useState, useEffect } from 'react';
import { fetchEspecialidade } from '../../wrapper.js';

function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEspecialidades = async () => {
    setLoading(true);
    try {
      const data = await fetchEspecialidade(); // Busca os dados das especialidades
      setEspecialidades(data);
    } catch (error) {
      alert('Erro ao carregar as especialidades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEspecialidades();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Especialidades</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(especialidades) && especialidades.length > 0 ? (
          <div className="row">
            {especialidades.map((especialidade) => (
              <div className="col-md-4 mb-4" key={especialidade.id}>
                <div className="card" style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{especialidade.nome}</h5>
                    <p className="card-text"><strong>Descrição:</strong> {especialidade.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem especialidades disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Especialidades;

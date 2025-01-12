import { useState, useEffect } from 'react';
import { fetchCenario } from '../../wrapper.js';

function Cenarios() {
  const [cenarios, setCenarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCenarios = async () => {
    setLoading(true);
    try {
      const data = await fetchCenario();
      setCenarios(data);
    } catch (error) {
      alert('Erro ao carregar os cenários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCenarios();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cenários</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(cenarios) && cenarios.length > 0 ? (
          <div className="row">
            {cenarios.map((cenario, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <img
                    src={cenario.foto}
                    className="card-img-top"
                    alt={cenario.nome}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cenario.nome}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem cenários disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Cenarios;

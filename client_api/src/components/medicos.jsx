import { useState, useEffect } from 'react';
import { fetchMedico } from '../../wrapper.js';

function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMedicos = async () => {
    setLoading(true);
    try {
      const data = await fetchMedico(); // Busca os dados dos médicos
      setMedicos(data);
    } catch (error) {
      alert('Erro ao carregar os médicos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicos();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Médicos</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(medicos) && medicos.length > 0 ? (
          <div className="row">
            {medicos.map((medico) => (
              <div className="col-md-4 mb-4" key={medico.id}>
                <div className="card" style={{ width: '18rem' }}>
                  {medico.foto && (
                    <img
                      src={medico.foto}
                      className="card-img-top"
                      alt={medico.nome}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{medico.nome}</h5>
                    <p className="card-text"><strong>Especialidade:</strong> {medico.especialidade.nome}</p>
                    <p className="card-text"><strong>CRM:</strong> {medico.crm}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem médicos disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Medicos;

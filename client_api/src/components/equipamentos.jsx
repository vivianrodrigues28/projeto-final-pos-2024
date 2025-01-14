import { useState, useEffect } from 'react';
import { fetchEquipamentos } from '../../wrapper.js';

function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEquipamentos = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipamentos(); // Busca os equipamentos
      setEquipamentos(data);
    } catch (error) {
      alert('Erro ao carregar os equipamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipamentos();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Equipamentos</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(equipamentos) && equipamentos.length > 0 ? (
          <div className="row">
            {equipamentos.map((equipamento, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  {equipamento.foto && (
                    <img
                      src={equipamento.foto}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                      alt="Imagem do Equipamento"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{equipamento.nome}</h5>
                    <p className="card-text"><strong>Descrição:</strong> {equipamento.descricao}</p>
                    {equipamento.enfermaria ? (
                      <p className="card-text">
                        <strong>Enfermaria:</strong> {equipamento.enfermaria}
                      </p>
                    ) : (
                      <p className="card-text">Enfermaria não especificada</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem equipamentos disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Equipamentos;

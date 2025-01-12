import { useState, useEffect } from 'react';
import { fetchRoupa } from '../../wrapper.js';

function Roupas() {
  const [roupas, setRoupa] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRoupas = async () => {
    setLoading(true);
    try {
      const data = await fetchRoupa();
      setRoupa(data);
    } catch (error) {
      alert('Erro ao carregar os roupas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoupas();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Roupas</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(roupas) && roupas.length > 0 ? (
          <div className="row">
            {roupas.map((roupa, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <img
                    src={roupa.foto}
                    className="card-img-top"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <p className="card-text"><strong>Descrição:</strong> {roupa.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem roupas disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Roupas;

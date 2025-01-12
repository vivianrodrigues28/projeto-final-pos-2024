import { useState, useEffect } from 'react';
import { fetchAcessorio } from '../../wrapper.js';

function Acessorios() {
  const [acessorios, setAcessorio] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAcessorios = async () => {
    setLoading(true);
    try {
      const data = await fetchAcessorio();
      setAcessorio(data);
    } catch (error) {
      alert('Erro ao carregar os acessorios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAcessorios();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Acessórios</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(acessorios) && acessorios.length > 0 ? (
          <div className="row">
            {acessorios.map((acessorio, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <img
                    src={acessorio.foto}
                    className="card-img-top"
                    alt={acessorio.nome}
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{acessorio.nome}</h5>
                    <p className="card-text"><strong>Descrição:</strong> {acessorio.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem acessórios disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Acessorios;

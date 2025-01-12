import { useState, useEffect } from 'react';
import { fetchPersonagem } from '../../wrapper.js';

function Personagens() {
  const [personagens, setPersonagem] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPersonagens = async () => {
    setLoading(true);
    try {
      const data = await fetchPersonagem();
      setPersonagem(data);
    } catch (error) {
      alert('Erro ao carregar os personagens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPersonagens();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Personagens</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(personagens) && personagens.length > 0 ? (
          <div className="row">
            {personagens.map((personagem, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <img
                    src={personagem.foto}
                    className="card-img-top"
                    alt={personagem.nome}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{personagem.nome}</h5>
                    <p className="card-text"><strong>Descrição:</strong> {personagem.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem personagens disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Personagens;

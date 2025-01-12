import { useState, useEffect } from 'react';
import { fetchMusica, fetchFilmesMusica } from '../../wrapper.js';

function Musicas() {
  const [musicas, setMusica] = useState([]);
  const [filmes, setFilmes] = useState({}); // Armazenar filmes em um objeto para buscar por ID
  const [loading, setLoading] = useState(false);

  const loadMusicas = async () => {
    setLoading(true);
    try {
      const data = await fetchMusica();
      setMusica(data);
      console.log(data); 

      // Extrair os IDs dos filmes associados às músicas
      const filmeIds = data
        .filter(musica => musica.filme) // Filtra as músicas que possuem um ID de filme
        .map(musica => musica.filme);

      // Buscar os nomes dos filmes usando os IDs
      const filmeData = await Promise.all(
        filmeIds.map(id => fetchFilmesMusica(id))
      );

      // Criar um mapa de filmeID -> nomeFilme
      const filmesMap = filmeIds.reduce((acc, id, index) => {
        acc[id] = filmeData[index];
        return acc;
      }, {});

      setFilmes(filmesMap); // Atualiza o estado com os filmes

    } catch (error) {
      alert('Erro ao carregar as Musicas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMusicas();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Músicas</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(musicas) && musicas.length > 0 ? (
          <div className="row">
            {musicas.map((musica, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{musica.nome}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{musica.duracao} segundos</h6>
                    <a href={musica.url} target="_blank">Ouça a música</a>

                    {musica.filme && filmes[musica.filme] ? (
                      <p className="card-text"> <strong>Filme: </strong>
                        {filmes[musica.filme]?.nome || 'Filme desconhecido'}
                      </p>
                    ) : (
                      <p className="card-text">Filme desconhecido</p>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem músicas disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Musicas;

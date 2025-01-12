import { useState, useEffect } from 'react';
import { fetchFilmes, fetchFilmeCenario, fetchFilmePersonagens, fetchFilmeAcessorio } from '../../wrapper.js';

function Filmes() {
  const [filmes, setFilmes] = useState([]);
  const [cenarios, setCenarios] = useState([]);
  const [personagens, setPerson] = useState([]);
  const [acessorios, setAcessorio] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFilmes = async () => {
    setLoading(true);
    try {
      const data = await fetchFilmes();
      setFilmes(data);

      const cenarioIds = data.flatMap(filme => filme.cenarios);
      const cenariosData = await Promise.all(cenarioIds.map(id => fetchFilmeCenario(id)));
      setCenarios(cenariosData);

      const personiD = data.flatMap(filme => filme.personagens);
      const personData = await Promise.all(personiD.map(id => fetchFilmePersonagens(id)));
      setPerson(personData);

      const acessorioID = data.flatMap(filme => filme.acessorio);
      const acessorioData = await Promise.all(acessorioID.map(id => fetchFilmeAcessorio(id)));
      setAcessorio(acessorioData);

    } catch (error) {
      alert('Erro ao carregar os filmes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFilmes();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Filmes</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(filmes) && filmes.length > 0 ? (
          <div className="row">
            {filmes.map((filme, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={filme.capa}
                        className="img-fluid rounded-start"
                        alt={filme.nome}
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{filme.nome}</h5>
                        <p className="card-text">
                          Duração: {filme.duracao} <br />
                          Lançado em {filme.ano}
                        </p>

                        {/* Accordion Detalhes */}
                        <div className="accordion" id={`accordion-detalhes-${index}`}>
                          <div className="accordion-item">
                            <h2 className="accordion-header" id={`heading-detalhes-${index}`}>
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-detalhes-${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse-detalhes-${index}`}
                              >
                                Detalhes
                              </button>
                            </h2>
                            <div
                              id={`collapse-detalhes-${index}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`heading-detalhes-${index}`}
                              data-bs-parent={`#accordion-detalhes-${index}`}
                            >
                              <div className="accordion-body">
                                {/* Cenários */}
                                {filme.cenarios && filme.cenarios.length > 0 && (
                                  <div>
                                    <strong>Cenários:</strong>
                                    <div className="accordion" id={`accordion-cenarios-${index}`}>
                                      {filme.cenarios.map((cenarioId, i) => {
                                        const cenario = cenarios.find(c => c.id === cenarioId);
                                        return cenario ? (
                                          <div className="accordion-item" key={i}>
                                            <h2 className="accordion-header" id={`heading-cenario-${index}-${i}`}>
                                              <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-cenario-${index}-${i}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse-cenario-${index}-${i}`}
                                              >
                                                <strong>{cenario.nome}</strong>
                                              </button>
                                            </h2>
                                            <div
                                              id={`collapse-cenario-${index}-${i}`}
                                              className="accordion-collapse collapse"
                                              aria-labelledby={`heading-cenario-${index}-${i}`}
                                              data-bs-parent={`#accordion-cenarios-${index}`}
                                            >
                                              <div className="accordion-body">
                                                <img
                                                  src={cenario.foto}
                                                  alt={cenario.nome}
                                                  style={{
                                                    width: '100%',
                                                    height: '150px',
                                                    objectFit: 'cover',
                                                    marginTop: '5px',
                                                    borderRadius: '5px',
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div key={i} className="accordion-item">
                                            <h2 className="accordion-header">
                                              <button className="accordion-button" type="button">
                                                Cenário não encontrado
                                              </button>
                                            </h2>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Acessórios */}
                                {filme.acessorio && filme.acessorio.length > 0 && (
                                  <div>
                                    <strong>Acessórios:</strong>
                                    <div className="accordion" id={`accordion-acessorios-${index}`}>
                                      {filme.acessorio.map((acessorioID, i) => {
                                        const acessorio = acessorios.find(a => a.id === acessorioID);
                                        return acessorio ? (
                                          <div className="accordion-item" key={i}>
                                            <h2 className="accordion-header" id={`heading-acessorios-${index}-${i}`}>
                                              <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-acessorios-${index}-${i}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse-acessorios-${index}-${i}`}
                                              >
                                                <strong>{acessorio.nome}</strong>
                                              </button>
                                            </h2>
                                            <div
                                              id={`collapse-acessorios-${index}-${i}`}
                                              className="accordion-collapse collapse"
                                              aria-labelledby={`heading-acessorios-${index}-${i}`}
                                              data-bs-parent={`#accordion-acessorios-${index}`}
                                            >
                                              <div className="accordion-body">
                                                <img
                                                  src={acessorio.foto}
                                                  alt={acessorio.nome}
                                                  style={{
                                                    width: '100%',
                                                    height: '150px',
                                                    objectFit: 'cover',
                                                    marginTop: '5px',
                                                    borderRadius: '5px',
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div key={i} className="accordion-item">
                                            <h2 className="accordion-header">
                                              <button className="accordion-button" type="button">
                                                Acessórios não encontrados
                                              </button>
                                            </h2>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Personagens */}
                                {filme.personagens && filme.personagens.length > 0 && (
                                  <div>
                                    <strong>Personagens:</strong>
                                    <div className="accordion" id={`accordion-personagens-${index}`}>
                                      {filme.personagens.map((personiD, i) => {
                                        const person = personagens.find(p => p.id === personiD);
                                        return person ? (
                                          <div className="accordion-item" key={i}>
                                            <h2 className="accordion-header" id={`heading-personagem-${index}-${i}`}>
                                              <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-personagem-${index}-${i}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse-personagem-${index}-${i}`}
                                              >
                                                <strong>{person.nome}</strong>
                                              </button>
                                            </h2>
                                            <div
                                              id={`collapse-personagem-${index}-${i}`}
                                              className="accordion-collapse collapse"
                                              aria-labelledby={`heading-personagem-${index}-${i}`}
                                              data-bs-parent={`#accordion-personagens-${index}`}
                                            >
                                              <div className="accordion-body">
                                                <img
                                                  src={person.foto}
                                                  alt={person.nome}
                                                  style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    marginTop: '5px',
                                                    borderRadius: '5px',
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div key={i} className="accordion-item">
                                            <h2 className="accordion-header">
                                              <button className="accordion-button" type="button">
                                                Personagens não encontrados
                                              </button>
                                            </h2>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Fim do Accordion Detalhes */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem filmes disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Filmes;

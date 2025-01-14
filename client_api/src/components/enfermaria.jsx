import { useState, useEffect } from 'react';
import { fetchEnfermarias, fetchEnfermariaSalas, fetchEnfermariaEquipamentos, fetchEnfermariaPacientes } from '../../wrapper.js';

function Enfermarias() {
  const [enfermarias, setEnfermarias] = useState([]);
  const [salas, setSalas] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEnfermarias = async () => {
    setLoading(true);
    try {
      const data = await fetchEnfermarias();
      setEnfermarias(data);

      // Carregar as salas, equipamentos e pacientes de forma eficiente com IDs
      const salaIds = data.flatMap(enfermaria => enfermaria.salas);
      const salasData = await Promise.all(salaIds.map(id => fetchEnfermariaSalas(id)));
      setSalas(salasData);

      const equipamentoIds = data.flatMap(enfermaria => enfermaria.equipamentos);
      const equipamentosData = await Promise.all(equipamentoIds.map(id => fetchEnfermariaEquipamentos(id)));
      setEquipamentos(equipamentosData);

      const pacienteIds = data.flatMap(enfermaria => enfermaria.pacientes);
      const pacientesData = await Promise.all(pacienteIds.map(id => fetchEnfermariaPacientes(id)));
      setPacientes(pacientesData);

    } catch (error) {
      alert('Erro ao carregar as enfermarias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnfermarias();
  }, []);

  // Criar mapas de id para busca eficiente
  const salaMap = Object.fromEntries(salas.map(sala => [sala.id, sala]));
  const equipamentoMap = Object.fromEntries(equipamentos.map(equipamento => [equipamento.id, equipamento]));
  const pacienteMap = Object.fromEntries(pacientes.map(paciente => [paciente.id, paciente]));

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Enfermarias</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(enfermarias) && enfermarias.length > 0 ? (
          <div className="row">
            {enfermarias.map((enfermaria, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={enfermaria.foto}
                        className="img-fluid rounded-start"
                        alt={enfermaria.nome}
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{enfermaria.nome}</h5>
                        <p className="card-text">
                          Localização: {enfermaria.localizacao} <br />
                          Capacidade: {enfermaria.capacidade} leitos <br />
                          Descrição: {enfermaria.descricao}
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
                                {/* Salas */}
                                {enfermaria.salas && enfermaria.salas.length > 0 && (
                                  <div>
                                    <strong>Salas:</strong>
                                    <ul>
                                      {enfermaria.salas.map(salaId => {
                                        const sala = salaMap[salaId];
                                        return (
                                          <li key={salaId}>
                                            {sala ? sala.nome : 'Sala não encontrada'}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}

                                {/* Equipamentos */}
                                {enfermaria.equipamentos && enfermaria.equipamentos.length > 0 && (
                                  <div>
                                    <strong>Equipamentos:</strong>
                                    <ul>
                                      {enfermaria.equipamentos.map(equipamentoId => {
                                        const equipamento = equipamentoMap[equipamentoId];
                                        return (
                                          <li key={equipamentoId}>
                                            {equipamento ? equipamento.nome : 'Equipamento não encontrado'}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}

                                {/* Pacientes */}
                                {enfermaria.pacientes && enfermaria.pacientes.length > 0 && (
                                  <div>
                                    <strong>Pacientes:</strong>
                                    <ul>
                                      {enfermaria.pacientes.map(pacienteId => {
                                        const paciente = pacienteMap[pacienteId];
                                        return (
                                          <li key={pacienteId}>
                                            {paciente ? paciente.nome : 'Paciente não encontrado'}
                                          </li>
                                        );
                                      })}
                                    </ul>
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
          <div className="text-center">Sem enfermarias disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Enfermarias;

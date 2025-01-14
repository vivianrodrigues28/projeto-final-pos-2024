import { useState, useEffect } from 'react';
import { fetchProntuarios, fetchMedico } from '../../wrapper.js';

function Prontuarios() {
  const [prontuarios, setProntuarios] = useState([]);
  const [medicos, setMedicos] = useState({}); // Armazenar dados dos médicos por ID
  const [loading, setLoading] = useState(false);

  const loadProntuarios = async () => {
    setLoading(true);
    try {
      const data = await fetchProntuarios(); // Carrega os prontuários
      setProntuarios(data);

      // Extrair IDs de médicos associados aos prontuários
      const medicoIds = data
        .filter(prontuario => prontuario.medico) // Verifica se o prontuário tem médico
        .map(prontuario => prontuario.medico);

      // Buscar detalhes dos médicos
      const medicoData = await Promise.all(
        medicoIds.map(id => fetchMedico(id))
      );

      // Criar um mapa de medicoID -> detalhes
      const medicosMap = medicoIds.reduce((acc, id, index) => {
        acc[id] = medicoData[index];
        return acc;
      }, {});

      setMedicos(medicosMap); // Atualiza o estado com os médicos

    } catch (error) {
      alert('Erro ao carregar os prontuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProntuarios();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Prontuários</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(prontuarios) && prontuarios.length > 0 ? (
          <div className="row">
            {prontuarios.map((prontuario, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{prontuario.paciente.nome}</h5>
                    <p className="card-text">
                      <strong>Data do Atendimento:</strong> {new Date(prontuario.data_atendimento).toLocaleString()}
                    </p>
                    <p className="card-text">
                      <strong>Descrição:</strong> {prontuario.descricao}
                    </p>
                    {prontuario.medico && medicos[prontuario.medico] ? (
                      <p className="card-text">
                        <strong>Médico Responsável:</strong> {medicos[prontuario.medico]?.nome || 'Desconhecido'}
                      </p>
                    ) : (
                      <p className="card-text">Médico Responsável não disponível</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem prontuários disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Prontuarios;

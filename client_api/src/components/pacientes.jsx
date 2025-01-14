import { useState, useEffect } from 'react';
import { fetchPacientes } from '../../wrapper.js';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPacientes = async () => {
    setLoading(true);
    try {
      const data = await fetchPacientes(); // Busca os dados dos pacientes
      setPacientes(data);
    } catch (error) {
      alert('Erro ao carregar os pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pacientes</h1>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        Array.isArray(pacientes) && pacientes.length > 0 ? (
          <div className="row">
            {pacientes.map((paciente, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  {paciente.foto && (
                    <img
                      src={paciente.foto}
                      className="card-img-top"
                      alt={paciente.nome}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{paciente.nome}</h5>
                    {paciente.data_nascimento && (
                      <p className="card-text">
                        <strong>Data de Nascimento:</strong> {new Date(paciente.data_nascimento).toLocaleDateString()}
                      </p>
                    )}
                    {paciente.endereco && (
                      <p className="card-text">
                        <strong>Endereço:</strong> {paciente.endereco}
                      </p>
                    )}
                    {paciente.telefone && (
                      <p className="card-text">
                        <strong>Telefone:</strong> {paciente.telefone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Sem pacientes disponíveis.</div>
        )
      )}
    </div>
  );
}

export default Pacientes;

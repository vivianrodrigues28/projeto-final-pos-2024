const api_url = 'http://127.0.0.1:8000/';

// Função para buscar pacientes
export async function fetchPacientes() {
  const url = `${api_url}pacientes`; 
  const response = await fetch(url);  
  const data = await response.json();  
  return data;
}

// Função para buscar médicos
export async function fetchMedicos() {
  const url = `${api_url}medicos`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
}

// Função para buscar especialidades de um médico específico
export const fetchMedicoEspecialidades = async (id) => {
  const response = await fetch(`${api_url}medicos/${id}/especialidades`);
  const data = await response.json();
  return data;
};

// Função para buscar salas de atendimento
export async function fetchSalas() {
  const url = `${api_url}salas`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
}

// Função para buscar consultas de um paciente
export const fetchConsultasPaciente = async (id) => {
  const response = await fetch(`${api_url}pacientes/${id}/consultas`);
  const data = await response.json();
  return data;
};

// Função para buscar tratamentos de um paciente
export const fetchTratamentosPaciente = async (id) => {
  const response = await fetch(`${api_url}pacientes/${id}/tratamentos`);
  const data = await response.json();
  return data;
};

// Função para buscar todos os tratamentos
export async function fetchTratamentos() {
  const url = `${api_url}tratamentos`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
};

// Função para buscar agendamentos de exames
export async function fetchAgendamentos() {
  const url = `${api_url}agendamentos`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
};

// Função para buscar exames específicos de um paciente
export const fetchExamesPaciente = async (id) => {
  const response = await fetch(`${api_url}pacientes/${id}/exames`);
  const data = await response.json();
  return data;
};

// Função para buscar dados de uma sala específica
export const fetchSala = async (id) => {
  const response = await fetch(`${api_url}salas/${id}`);
  const data = await response.json();
  return data;
};

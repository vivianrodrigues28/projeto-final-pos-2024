const api_url = 'http://127.0.0.1:8000/';

export async function fetchEspecialidades() {
  const url = `${api_url}especialidades`; 
  const response = await fetch(url);  
  const data = await response.json();  
  return data;
}


export async function fetchEquipamentos() {
  const url = `${api_url}equipamentos`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
}

export const fetchProntuarioPacientes = async (id) => {
  const response = await fetch(`${api_url}pacientes/${id}/prontuario`);
  const data = await response.json();
  return data;
};


export async function fetchEnfermarias() {
  const url = `${api_url}enfermarias`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
}

export const fetchEnfermarias = async (id) => {
  const response = await fetch(`${api_url}enfermarias/${id}`);
  const data = await response.json();
  return data;
};


export async function fetchMedicos() {
  const url = `${api_url}medicos`; 
  const response = await fetch(url);  
  const data = await response.json();
  return data;
}


export async function fetchPacientes() {
  const url = `${api_url}pacientes`; 
  const response = await fetch(url);  
  const data = await response.json();  
  return data;
}


export const fetchMedicoEspecialidades = async (id) => {
  const response = await fetch(`${api_url}medicos/${id}/especialidades`);
  const data = await response.json();
  return data;
};


export const fetchPacientesEnfermarias = async (id) => {
  const response = await fetch(`${api_url}enfermarias/${id}/pacientes`);
  const data = await response.json();
  return data;
};

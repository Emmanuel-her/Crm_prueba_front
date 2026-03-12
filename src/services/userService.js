import api from './api';

export const getMiPerfil = async () => {
  const response = await api.get('/usuarios/mi-perfil');
  return response.data;
};

export const updateMiPerfil = async (nombre, correo) => {
  const response = await api.put('/usuarios/mi-perfil', { nombre, correo });
  return response.data;
};

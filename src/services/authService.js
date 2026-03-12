import api from './api';

export const loginUsuario = async (correo, password) => {
  // Let's first try sending as form URL encoded which is common for FastAPI OAuth2 forms.
  // If it's a custom endpoint expecting JSON, this might need to change, but standard OAuth2 expects username/password.
  const formData = new URLSearchParams();
  formData.append('username', correo);
  formData.append('password', password);
  
  try {
    const response = await api.post('/autenticacion/iniciar-sesion', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    // Fallback to JSON if it's a JSON endpoint
    if (error.response?.status === 422) {
      const jsonResponse = await api.post('/autenticacion/iniciar-sesion', { correo, password });
      return jsonResponse.data;
    }
    throw error;
  }
};

export const registerUsuario = async (nombre, correo, password) => {
  const response = await api.post('/autenticacion/registro', { nombre, correo, password });
  return response.data;
};

// src/features/auth/services/authService.js
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar token en cada petición
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      // Guardar token en cookie
      Cookies.set('auth_token', response.data.token, { 
        expires: 7, // 7 días
        sameSite: 'strict',
        secure: false  // En localhost no usamos HTTPS
      });
    }
    return response.data;
  },

  logout: async () => {
    try {
      // Intentar hacer logout en el backend
      await api.delete('/logout');
    } catch (error) {
      // Si falla (401, 403, etc.), no importa, igual limpiamos local
      console.log('Logout del servidor falló, limpiando sesión local');
    } finally {
      // SIEMPRE eliminar el token local
      Cookies.remove('auth_token');
    }
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  }
};
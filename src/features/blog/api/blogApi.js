// src/features/blog/api/blogApi.js
import axios from 'axios';

export const blogApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Obtener todos los posts
export const getPosts = async (limit = 20) => {
  try {
    const response = await blogApi.get('/posts');
    return response.data.slice(0, limit);
  } catch (error) {
    throw new Error('Error al obtener los posts');
  }
};

// Obtener un post por ID
export const getPostById = async (id) => {
  try {
    // Simular error aleatorio (20% de probabilidad)
    if (Math.random() < 0.2) {
      throw new Error('Falla simulada del servicio');
    }
    
    const response = await blogApi.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Post no encontrado');
    }
    throw error;
  }
};

// Obtener comentarios de un post
export const getPostComments = async (postId) => {
  try {
    const response = await blogApi.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener comentarios');
  }
};
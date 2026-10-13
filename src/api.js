import axios from 'axios';

// Toma la variable de entorno en Vercel o usa la URL directa de Render
const API_URL = import.meta.env.VITE_API_URL || 'https://tienda-ropa-backend-34wf.onrender.com';

export const api = axios.create({
  baseURL: API_URL
});

export const API = api;

export default api;
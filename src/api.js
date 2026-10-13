import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://tienda-ropa-backend-34wf.onrender.com'
});

export default API;
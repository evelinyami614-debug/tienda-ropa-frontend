
// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tienda-ropa-backend-34wf.onrender.com'
});

export default API;
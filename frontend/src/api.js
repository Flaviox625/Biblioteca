import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.10:3000/api', // Altere para o endereço da API, se necessário.
});

export default api;

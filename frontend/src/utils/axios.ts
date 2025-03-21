import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL,
  timeout: 60000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export default instance;
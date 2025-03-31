import axios from 'axios';
import supabase from './supabase';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 60000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

instance.interceptors.request.use(
  async function (config) {
    const { data: { session } } = await supabase.auth.getSession();

    const accessToken = session?.access_token;
    const refreshToken = session?.refresh_token;

    config.headers = config.headers ?? {};

    if (accessToken && refreshToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
      config.headers.RefreshToken = refreshToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
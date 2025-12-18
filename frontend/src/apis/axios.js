import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should point to deployed backend
  withCredentials: true,
  timeout: 15000,
});

export default api;

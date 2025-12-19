import axios from "axios";

const api = axios.create({
  baseURL: "https://foodbridge-24wb.onrender.com",
  withCredentials: true, // if backend sets cookies
  timeout: 60000,
});
console.log(import.meta.env.VITE_API_URL);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

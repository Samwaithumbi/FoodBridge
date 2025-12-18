import api from "./axios";

export const login = (data) =>
  api.post("/api/auth/login", data);

export const register = (data) =>
  api.post("/api/auth/register", data);

export const getProfile = () =>
  api.get("/api/profile");

export const updateProfile = (data) =>
  api.put("/api/profile", data);

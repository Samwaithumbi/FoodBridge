import api from "./axios";

export const createDonation = (data) =>
  api.post("/api/donations", data);

export const getMyDonations = () =>
  api.get("/api/donations/my");

export const getAvailableDonations = () =>
  api.get("/api/donations/available");

export const updateDonation = (id, data) =>
  api.put(`/api/donations/${id}`, data);

export const deleteDonation = (id) =>
  api.delete(`/api/donations/${id}`);

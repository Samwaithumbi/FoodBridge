import api from "./axios";

export const getAdminStats = () =>
  api.get("/api/admin/stats");

export const approveDonation = (id) =>
  api.patch(`/api/admin/donations/${id}/approve`);

export const rejectDonation = (id) =>
  api.patch(`/api/admin/donations/${id}/reject`);

export const approveRequest = (id) =>
  api.patch(`/api/admin/requests/${id}/approve`);

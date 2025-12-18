import api from "./axios";

export const getNotifications = () =>
  api.get("/api/notifications");

export const markAsRead = (id) =>
  api.patch(`/api/notifications/${id}/read`);

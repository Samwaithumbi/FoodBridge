import api from "./axios";

export const createRequest = (data) =>
  api.post("/api/requests", data);

export const getMyRequests = () =>
  api.get("/api/requests/my");

export const getPendingRequests = () =>
  api.get("/api/requests/pending");

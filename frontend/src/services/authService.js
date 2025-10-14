import api from "./api";

export const authService = {
  register: (data) => api.post("/api/auth/register", data).then((r) => r.data),
  login: (data) => api.post("/api/auth/login", data).then((r) => r.data),
  profile: () => api.get("/api/auth/profile").then((r) => r.data),
};


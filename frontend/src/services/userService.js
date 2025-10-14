import api from "./api";

export const userService = {
  list: () => api.get("/api/users").then((r) => r.data),
  changeRole: (id, role) =>
    api.put(`/api/users/${id}/role`, { role }).then((r) => r.data),
  remove: (id) => api.delete(`/api/users/${id}`).then((r) => r.data),
};


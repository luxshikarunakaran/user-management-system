import api from "./api";

export const noteService = {
  list: () => api.get("/api/notes").then((r) => r.data),
  create: (data) => api.post("/api/notes", data).then((r) => r.data),
  update: (id, data) => api.put(`/api/notes/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/api/notes/${id}`).then((r) => r.data),
};


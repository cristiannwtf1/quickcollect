import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getDashboard = () => api.get("/dashboard/resumen/");
export const listUsuarios = () => api.get("/usuarios/");
export const listPlanes = () => api.get("/planes/");
export const listSuscripciones = () => api.get("/suscripciones/");
export const listPagos = () => api.get("/pagos/");
export const listNotificaciones = () => api.get("/notificaciones/");
export const simularNotificacion = (payload) =>
  api.post("/notificaciones/simular/", payload);

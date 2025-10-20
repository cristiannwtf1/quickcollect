// src/services/api.js
import axios from "axios";

// Instancia principal de Axios apuntando al backend Django
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

// --- Funciones del backend ---

// Dashboard KPIs
export const getDashboard = () => api.get("/dashboard/resumen/");

// Listar notificaciones
export const listNotificaciones = () => api.get("/notificaciones/");

// Simular notificación (POST)
export const simularNotificacion = (payload) =>
  api.post("/notificaciones/simular/", payload);

// ✅ Solo para depuración
console.log("🌐 API base URL:", import.meta.env.VITE_API_URL);

// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Planes from "../pages/Planes";
import ResumenPlan from "../pages/ResumenPlan";
import Confirmacion from "../pages/Confirmacion";
import PasarelaPago from "../pages/PasarelaPago";
import DashboardSuscripcion from "../pages/DashboardSuscripcion";
import DashboardIndicadores from "../pages/DashboardIndicadores"; // 🆕 importamos el nuevo Dashboard
import Soporte from "../pages/Soporte";
import Portafolio from "../pages/Portafolio";
import Reportes from "../pages/Reportes"; // 🆕 asegúrate de tener este componente
import Layout from "../layout/Layout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/resumen-plan" element={<ResumenPlan />} />
          <Route path="/pasarela" element={<PasarelaPago />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/soporte" element={<Soporte />} />
        </Route>

        {/* Rutas del área autenticada */}
        <Route path="/dashboard-suscripcion" element={<DashboardSuscripcion />} />
        <Route path="/dashboard" element={<DashboardIndicadores />} /> {/* 🟣 NUEVA RUTA */}
        <Route path="/reportes" element={<Reportes />} /> {/* 🟢 Reportes con filtros */}

        {/* Redirección */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// src/layout/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* NAVBAR */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white px-2 py-1 rounded font-bold text-xl">
              $
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              <Link to="/">Quick Collect</Link>
            </h1>
          </div>

          {/* Menú */}
          <nav className="flex items-center gap-6">
            
            <Link to="/soporte" className="text-gray-700 hover:text-indigo-600 font-medium">
              Soporte
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
            >
              Registrarse
            </Link>
            <Link to="/reportes">Reportes</Link>

          </nav>
        </div>
      </header>

      {/* CONTENIDO CENTRAL */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
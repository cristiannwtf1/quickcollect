// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Register() {
  const location = useLocation();
const plan = location.state?.plan;
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmar: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.password || !formData.confirmar) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (formData.password !== formData.confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Aquí luego se conectará al backend (registro real)
    alert("Registro exitoso ✅");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Crear Cuenta
        </h2>

         {plan && (
        <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 p-3 rounded-md text-center mb-4">
          Estás registrándote para el plan <strong>{plan.nombre}</strong> — {plan.precio}
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmar"
              value={formData.confirmar}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Registrarme
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
  ¿Ya tienes cuenta?{" "}
  <Link to="/login" className="text-indigo-600 hover:underline">
    Inicia sesión
  </Link>
</p>
      </div>
    </div>
  );
}

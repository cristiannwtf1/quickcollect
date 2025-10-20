// src/pages/Confirmacion.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Confirmacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  // Si no hay plan, redirige a la página de planes
  if (!plan) {
    navigate("/planes");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>

        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          ¡Suscripción Exitosa!
        </h2>

        <p className="text-gray-600 mb-6">
          Te has suscrito al plan{" "}
          <strong className="text-indigo-700">{plan.nombre}</strong> por{" "}
          <span className="text-indigo-600 font-semibold">{plan.precio}</span>.
        </p>

        <p className="text-gray-500 mb-8">
          Gracias por confiar en <span className="font-semibold">QuickCollect</span>.
          Pronto recibirás un correo de confirmación con los detalles del pago.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="block bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Ir al Inicio
          </Link>

       <Link
  to="/dashboard-suscripcion"
  state={{ plan }}
  className="block border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition"
>
  Ir al Panel / Dashboard
</Link>

        </div>
      </div>
    </div>
  );
}


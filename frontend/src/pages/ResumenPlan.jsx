// src/pages/ResumenPlan.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumenPlan() {
  const location = useLocation();
  const navigate = useNavigate();

  // Si el usuario llega sin seleccionar plan, redirigirlo
  const plan = location.state?.plan;
  if (!plan) {
    navigate("/planes");
    return null;
  }

  const handleConfirm = () => {
  navigate("/pasarela", { state: { plan } });
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Resumen de tu Plan
        </h2>

        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{plan.nombre}</h3>
          <p className="text-indigo-600 font-bold text-lg mb-2">{plan.precio}</p>
          <p className="text-gray-600 mb-4">{plan.descripcion}</p>
          <ul className="text-gray-500 text-left list-disc list-inside">
            {plan.beneficios.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Confirmar Suscripción
        </button>

        <button
          onClick={() => navigate("/planes")}
          className="w-full mt-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cambiar Plan
        </button>
        
      </div>
    </div>
  );
}

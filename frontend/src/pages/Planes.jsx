// src/pages/Planes.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Planes() {
  const navigate = useNavigate();
    const planes = [
        {
      nombre: "Básico",
      precio: "$49.000 / mes",
      descripcion: "Ideal para pequeñas empresas que inician su gestión de cobros.",
      beneficios: ["Hasta 100 facturas/mes", "Soporte por correo", "Reportes básicos"],
    },
    {
      nombre: "Profesional",
      precio: "$99.000 / mes",
      descripcion: "Perfecto para Pymes en crecimiento con más volumen de clientes.",
      beneficios: [
        "Hasta 500 facturas/mes",
        "Soporte prioritario",
        "Integración con contabilidad",
      ],
    },
    {
      nombre: "Empresarial",
      precio: "$199.000 / mes",
      descripcion: "Para empresas que requieren automatización avanzada y soporte dedicado.",
      beneficios: [
        "Facturación ilimitada",
        "Gestor de cuenta dedicado",
        "Reportes personalizados",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Planes de Suscripción
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Elige el plan que mejor se adapte a tu empresa y lleva tu gestión de cobros al siguiente nivel.
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {planes.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-8 text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {plan.nombre}
            </h3>
            <p className="text-indigo-600 font-bold text-xl mb-4">{plan.precio}</p>
            <p className="text-gray-600 mb-6">{plan.descripcion}</p>
            <ul className="text-gray-500 mb-6 space-y-2">
              {plan.beneficios.map((b, i) => (
                <li key={i}>✅ {b}</li>
              ))}
            </ul>
          <button
  onClick={() => navigate("/resumen-plan", { state: { plan } })}
  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
>
  Suscribirme
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

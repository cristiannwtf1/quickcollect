// src/pages/PasarelaPago.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PasarelaPago() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const [formData, setFormData] = useState({
    nombre: "",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
    documento: "",
    tipoDocumento: "CC",
  });

  const [procesando, setProcesando] = useState(false);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">No se encontró información del plan.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handlePagar = (e) => {
  e.preventDefault();

  if (
    !formData.nombre ||
    !formData.tarjeta ||
    !formData.vencimiento ||
    !formData.cvv ||
    !formData.documento
  ) {
    alert("Por favor completa todos los campos antes de continuar.");
    return;
  }

  // Simula el procesamiento del pago
  setProcesando(true);

  setTimeout(() => {
    setProcesando(false);
    // Redirigir a la página de confirmación con los datos del plan
    navigate("/confirmacion", { state: { plan } });
  }, 4000);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Overlay animado de procesamiento */}
      {procesando && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-20 transition-all duration-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                💳
              </div>
            </div>
            <h3 className="text-indigo-700 font-semibold text-lg animate-pulse">
              Procesando tu pago...
            </h3>
            <p className="text-gray-500 text-sm">
              No cierres esta ventana, por favor.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative z-10">
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl mr-2">💳</span>
          <h2 className="text-2xl font-bold text-indigo-600">QuickCollect Pay</h2>
        </div>

        <p className="text-center text-gray-600 mb-6">
          Estás pagando el plan{" "}
          <strong className="text-indigo-700">{plan.nombre}</strong> —{" "}
          {plan.precio}
        </p>

        <form onSubmit={handlePagar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del titular
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Martín Cortés"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              disabled={procesando}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de tarjeta
            </label>
            <input
              type="text"
              name="tarjeta"
              value={formData.tarjeta}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength="19"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              disabled={procesando}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vencimiento
              </label>
              <input
                type="text"
                name="vencimiento"
                value={formData.vencimiento}
                onChange={handleChange}
                placeholder="MM/AA"
                maxLength="5"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                disabled={procesando}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="***"
                maxLength="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                disabled={procesando}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de documento
              </label>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                disabled={procesando}
              >
                <option value="CC">Cédula</option>
                <option value="CE">Cédula Extranjería</option>
                <option value="NIT">NIT</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número
              </label>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                placeholder="1234567890"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                disabled={procesando}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full text-white font-semibold py-2 rounded-lg transition ${
              procesando
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={procesando}
          >
            {procesando ? "Procesando..." : "Confirmar pago"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition"
            disabled={procesando}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
// src/pages/DashboardSuscripcion.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOutIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
} from "lucide-react";

export default function DashboardSuscripcion() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard-suscripcion")}
        >
          <div className="bg-indigo-600 text-white px-2 py-1 rounded font-bold text-xl">
            $
          </div>
          <h1 className="text-xl font-bold text-gray-800">QuickCollect</h1>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <a
            href="/dashboard-suscripcion"
            className="text-indigo-600 font-semibold"
          >
            Actividad
          </a>
          <a
            href="/dashboard"
            className="text-gray-700 hover:text-indigo-600"
          >
            Dashboard
          </a>
          <a
            href="/reportes"
            className="text-gray-700 hover:text-indigo-600"
          >
            Reportes
          </a>
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-red-600"
            onClick={() => navigate("/")}
          >
            <LogOutIcon size={16} /> Salir
          </button>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-1">Actividad Financiera</h2>
        <p className="text-gray-500 mb-8">
          Gestiona tus cobros recurrentes de forma inteligente
        </p>

        {/* CARDS SUPERIORES */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-green-50 p-5 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Ingresos del Mes</h3>
            <p className="text-2xl font-bold text-green-600">$12,450,000</p>
            <p className="text-xs text-gray-500">+15% vs mes anterior</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Clientes Activos</h3>
            <p className="text-2xl font-bold text-indigo-600">247</p>
            <p className="text-xs text-gray-500">+8 nuevos este mes</p>
          </div>
          <div className="bg-yellow-50 p-5 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Pagos Pendientes</h3>
            <p className="text-2xl font-bold text-yellow-600">18</p>
            <p className="text-xs text-gray-500">$3,240,000 por cobrar</p>
          </div>
          <div className="bg-red-50 p-5 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Pagos Vencidos</h3>
            <p className="text-2xl font-bold text-red-600">5</p>
            <p className="text-xs text-gray-500">$890,000 en mora</p>
          </div>
        </div>

        {/* ACTIVIDAD RECIENTE + VENCIMIENTOS */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* ACTIVIDAD RECIENTE */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center bg-green-50 p-3 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="text-green-600" size={18} />
                  <div>
                    <p className="font-medium">Pago recibido</p>
                    <p className="text-sm text-gray-600">
                      Consultorio Dental Sonrisa — $320,000
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">10:30 AM</span>
              </li>

              <li className="flex justify-between items-center bg-blue-50 p-3 rounded">
                <div className="flex items-center gap-3">
                  <ClockIcon className="text-blue-600" size={18} />
                  <div>
                    <p className="font-medium">Recordatorio enviado</p>
                    <p className="text-sm text-gray-600">
                      Tienda La Esquina — Vence mañana
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">09:15 AM</span>
              </li>

              <li className="flex justify-between items-center bg-yellow-50 p-3 rounded">
                <div className="flex items-center gap-3">
                  <UsersIcon className="text-yellow-600" size={18} />
                  <div>
                    <p className="font-medium">Nuevo cliente registrado</p>
                    <p className="text-sm text-gray-600">
                      Peluquería Bella Vista
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">08:45 AM</span>
              </li>
            </ul>
          </div>

          {/* PRÓXIMOS VENCIMIENTOS */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-4">
              Próximos Vencimientos
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center bg-red-50 p-3 rounded">
                <div>
                  <p className="font-medium">Restaurante El Buen Sabor</p>
                  <p className="text-sm text-gray-600">Vencido hace 2 días</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">$450,000</p>
                  <button className="text-sm text-indigo-600 hover:underline">
                    Enviar recordatorio
                  </button>
                </div>
              </li>

              <li className="flex justify-between items-center bg-yellow-50 p-3 rounded">
                <div>
                  <p className="font-medium">Tienda La Esquina</p>
                  <p className="text-sm text-gray-600">Vence mañana</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-yellow-600">$280,000</p>
                  <button className="text-sm text-indigo-600 hover:underline">
                    Enviar recordatorio
                  </button>
                </div>
              </li>

              <li className="flex justify-between items-center bg-blue-50 p-3 rounded">
                <div>
                  <p className="font-medium">Farmacia San José</p>
                  <p className="text-sm text-gray-600">Vence en 3 días</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">$380,000</p>
                  <button className="text-sm text-indigo-600 hover:underline">
                    Ver factura
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

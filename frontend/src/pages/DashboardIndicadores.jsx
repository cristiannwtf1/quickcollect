// src/pages/DashboardIndicadores.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, PieChart, Users, DollarSign, LogOutIcon } from "lucide-react";
import { getDashboard } from "../services/api";

export default function DashboardIndicadores() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar el dashboard.");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  // Helpers
  const money = (n) =>
    Number(n ?? 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const pct = (num, den) => {
    const a = Number(num ?? 0);
    const b = Number(den ?? 0);
    if (b <= 0) return "0%";
    return `${Math.round((a / b) * 100)}%`;
  };

  const shortMes = (iso) => {
    try {
      const d = new Date(iso);
      return d
        .toLocaleDateString("es-CO", { month: "short", year: "2-digit" })
        .replace(".", "");
    } catch {
      return iso;
    }
  };

  // Derivados para la UI
  const ingresosTotalesAprobados = useMemo(
    () => Number(data?.pagos?.montos_por_estado?.aprobado ?? 0),
    [data]
  );

  const susActivas = Number(data?.suscripciones?.activa ?? 0);
  const susTotal = Number(data?.suscripciones?.total ?? 0);
  const susInactivas = Math.max(0, susTotal - susActivas);

  // Serie últimos 6 meses para ingresos (usamos monto_aprobado)
  const serie6m = data?.pagos?.serie_6m ?? [];
  const ingresosMensuales = useMemo(
    () =>
      (serie6m || []).map((i) => ({
        mes: shortMes(i.mes),
        ingresos: Number(i.monto_aprobado ?? 0),
      })),
    [serie6m]
  );

  // Crecimiento: último vs penúltimo mes (monto_aprobado)
  const crecimientoPct = useMemo(() => {
    if (!serie6m || serie6m.length < 2) return "0%";
    const a = Number(serie6m[serie6m.length - 2]?.monto_aprobado ?? 0);
    const b = Number(serie6m[serie6m.length - 1]?.monto_aprobado ?? 0);
    if (a <= 0) return b > 0 ? "100%" : "0%";
    return `${Math.round(((b - a) / a) * 100)}%`;
  }, [serie6m]);

  // Pagos por mes: completados vs pendientes (usamos cnt_aprobado y cnt_rechazado)
  const pagosSerie = useMemo(
    () =>
      (serie6m || []).map((i) => ({
        fecha: shortMes(i.mes),
        completados: Number(i.cnt_aprobado ?? 0),
        pendientes: Number(i.cnt_rechazado ?? 0),
      })),
    [serie6m]
  );

  // Porcentaje pagos completados del mes actual
  const completadosMes = Number(
    data?.pagos?.conteos_por_estado?.aprobado ?? 0
  );
  const totalMes =
    Number(data?.pagos?.conteos_por_estado?.aprobado ?? 0) +
    Number(data?.pagos?.conteos_por_estado?.pendiente ?? 0) +
    Number(data?.pagos?.conteos_por_estado?.rechazado ?? 0) +
    Number(data?.pagos?.conteos_por_estado?.vencido ?? 0);
  const pagosCompletadosPct = pct(completadosMes, totalMes);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Cargando…
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard-suscripcion")}
        >
          <div className="bg-indigo-600 text-white px-2 py-1 rounded font-bold text-xl">$</div>
          <h1 className="text-xl font-bold text-gray-800">QuickCollect</h1>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/dashboard-suscripcion" className="text-gray-700 hover:text-indigo-600">
            Actividad
          </Link>
          <Link to="/dashboard" className="text-indigo-600 font-semibold">
            Dashboard
          </Link>
          <Link to="/reportes" className="text-gray-700 hover:text-indigo-600">
            Reportes
          </Link>
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
        <h2 className="text-2xl font-bold mb-1">Indicadores Generales</h2>
        <p className="text-gray-500 mb-8">
          Visualiza el desempeño financiero y operativo de tu negocio.
        </p>

        {/* TARJETAS DE MÉTRICAS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
            <DollarSign className="text-green-600" size={28} />
            <div>
              <h3 className="text-sm text-gray-500">Ingresos Totales</h3>
              <p className="text-2xl font-bold text-green-600">
                {money(ingresosTotalesAprobados)}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
            <Users className="text-indigo-600" size={28} />
            <div>
              <h3 className="text-sm text-gray-500">Clientes Activos</h3>
              <p className="text-2xl font-bold text-indigo-600">{susActivas}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
            <TrendingUp className="text-blue-600" size={28} />
            <div>
              <h3 className="text-sm text-gray-500">Crecimiento</h3>
              <p className="text-2xl font-bold text-blue-600">{crecimientoPct}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
            <PieChart className="text-yellow-600" size={28} />
            <div>
              <h3 className="text-sm text-gray-500">Pagos Completados</h3>
              <p className="text-2xl font-bold text-yellow-600">{pagosCompletadosPct}</p>
            </div>
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingresos Mensuales */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 text-indigo-700">Ingresos Mensuales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ingresosMensuales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ingresos" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pagos Completados vs Pendientes (mes a mes) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 text-indigo-700">Pagos por Mes</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={pagosSerie}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completados" stroke="#22C55E" />
                <Line type="monotone" dataKey="pendientes" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CLIENTES ACTIVOS / INACTIVOS (derivado de suscripciones) */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-indigo-700">Clientes Activos vs Inactivos</h3>
          <div className="flex gap-8 items-center">
            {[
              { tipo: "Activos", valor: susActivas },
              { tipo: "Inactivos", valor: susInactivas },
            ].map((c, index) => (
              <div
                key={index}
                className={`flex-1 text-center p-4 rounded-lg ${
                  c.tipo === "Activos" ? "bg-green-50" : "bg-gray-100"
                }`}
              >
                <p className="text-lg font-semibold text-gray-800">{c.tipo}</p>
                <p
                  className={`text-3xl font-bold ${
                    c.tipo === "Activos" ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {c.valor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

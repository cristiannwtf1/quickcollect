// src/pages/DashboardSuscripcion.jsx
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPagosDeSuscripcion } from "../services/api";

export default function DashboardSuscripcion() {
  const [search] = useSearchParams();
  const [suscripcionId, setSuscripcionId] = useState(search.get("s") || "1");

  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchPagos = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await getPagosDeSuscripcion(suscripcionId);
      setPagos(res.data || []);
    } catch (e) {
      console.error(e);
      setErr("No se pudieron cargar los pagos de la suscripción.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suscripcionId]);

  const money = (n) =>
    Number(n ?? 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white px-2 py-1 rounded font-bold text-xl">
            $
          </div>
          <h1 className="text-xl font-bold text-gray-800">QuickCollect</h1>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/dashboard-suscripcion"
            className="text-indigo-600 font-semibold"
          >
            Actividad
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link to="/reportes" className="text-gray-700 hover:text-indigo-600">
            Reportes
          </Link>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Actividad Financiera</h2>

        <div className="flex items-end gap-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID suscripción
            </label>
            <input
              type="number"
              value={suscripcionId}
              onChange={(e) => setSuscripcionId(e.target.value)}
              className="border rounded px-3 py-2"
              placeholder="1"
            />
          </div>
          <button
            onClick={fetchPagos}
            className="h-10 px-4 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Consultar
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Monto</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="p-3" colSpan={5}>
                    Cargando…
                  </td>
                </tr>
              )}
              {!loading && err && (
                <tr>
                  <td className="p-3 text-red-600" colSpan={5}>
                    {err}
                  </td>
                </tr>
              )}
              {!loading &&
                !err &&
                pagos.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{money(p.monto)}</td>
                    <td className="p-3">{p.estado}</td>
                    <td className="p-3">
                      {new Date(p.fecha_hora).toISOString().slice(0, 10)}
                    </td>
                    <td className="p-3">{p.referencia_externa || "-"}</td>
                  </tr>
                ))}
              {!loading && !err && pagos.length === 0 && (
                <tr>
                  <td className="p-3" colSpan={5}>
                    Sin pagos para esta suscripción.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

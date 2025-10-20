// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/dashboard/metrics');
        setMetrics(res.data);
      } catch (err) {
        console.error('Error cargando métricas', err);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <span className="mr-4 text-gray-700">{user?.email ?? user?.name}</span>
          <button onClick={logout} className="px-3 py-1 border rounded">Cerrar sesión</button>
        </div>
      </div>

      <div>
        {!metrics ? (
          <div>Cargando métricas...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Ingresos</div>
              <div className="text-xl font-bold">${metrics.revenue ?? 0}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Clientes activos</div>
              <div className="text-xl font-bold">{metrics.active_clients ?? 0}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Pagos pendientes</div>
              <div className="text-xl font-bold">{metrics.pending_payments ?? 0}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

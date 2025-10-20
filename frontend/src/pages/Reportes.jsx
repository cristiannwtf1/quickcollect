// src/pages/Reportes.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Edit, Bell, Trash2, RefreshCcw, FileSpreadsheet, PlusCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { getReportePagos } from "../services/api";

export default function Reportes() {
  const navigate = useNavigate();

  // Datos provenientes del backend
  const [clientes, setClientes] = useState([]); // aquí guardaremos los pagos transformados a tu estructura de UI

  // Filtros
  const [estado, setEstado] = useState("");         // "", "APROBADO", "PENDIENTE", "RECHAZADO", "VENCIDO"
  const [suscripcion, setSuscripcion] = useState(""); // id numérica
  const [fechaInicio, setFechaInicio] = useState(""); // YYYY-MM-DD
  const [fechaFin, setFechaFin] = useState("");       // YYYY-MM-DD

  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Formulario cliente nuevo
  const [nuevoCliente, setNuevoCliente] = useState({
    tipo: "",
    nombre: "",
    nit: "",
    email: "",
    direccion: "",
    telefono: "",
    representante: "",
    ccRepresentante: "",
    plan: "Plan Standard",
    frecuencia: "Mensual",
    diaCobro: "",
  });

  const handleActivar = (id) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: "Pendiente" } : c))
    );
  };

  const handleRegistrarCliente = (e) => {
    e.preventDefault();
    const nuevo = {
      id: clientes.length + 1,
      nombre: nuevoCliente.nombre,
      tipo: nuevoCliente.frecuencia,
      monto: Math.floor(Math.random() * 1000000) + 100000,
      estado: "Pendiente",
      fecha: new Date().toISOString().split("T")[0],
    };
    setClientes([...clientes, nuevo]);
    setMostrarModal(false);
    setNuevoCliente({
      tipo: "",
      nombre: "",
      nit: "",
      email: "",
      direccion: "",
      telefono: "",
      representante: "",
      ccRepresentante: "",
      plan: "Plan Standard",
      frecuencia: "Mensual",
      diaCobro: "",
    });
  };

  // Helper: formatea moneda
  const money = (n) => Number(n ?? 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  // Pide datos al backend con los filtros
  const fetchData = async () => {
    try {
      setLoading(true);
      setErr("");
      const params = {};
      if (estado) params.estado = estado;
      if (suscripcion) params.suscripcion = suscripcion;
      if (fechaInicio) params.desde = fechaInicio;
      if (fechaFin) params.hasta = fechaFin;

      const res = await getReportePagos(params);
      // El endpoint devuelve paginación + payload dentro de "results"
      // { count, next, previous, results: { items: [...], total_monto, count } }
      const payload = res.data?.results ?? res.data;

      const items = (payload.items || []).map(p => ({
        id: p.id,
        suscripcionId: p.suscripcion,           // 👈 guarda el id aquí
        nombre: `Suscripción #${p.suscripcion}`, // no tenemos razón social en el Pago, así que mostramos el id
        tipo: "-",                                // si más adelante quieres, aquí mapeas plan/periodicidad
        monto: Number(p.monto),
        estado: (
          p.estado === "APROBADO" ? "Pagado" :
          p.estado === "PENDIENTE" ? "Pendiente" :
          p.estado === "RECHAZADO" ? "Vencido" : "Pendiente"
        ),
        fecha: new Date(p.fecha_hora).toISOString().slice(0,10),
      }));

      setClientes(items);
    } catch (e) {
      console.error(e);
      setErr("No se pudo cargar el reporte.");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial sin filtros
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mantén tu lógica de filtros en memoria, pero ahora basada en lo que llega del backend
  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const matchFechaInicio = !fechaInicio || c.fecha >= fechaInicio;
      const matchFechaFin = !fechaFin || c.fecha <= fechaFin;
      // estado ya lo filtra el backend, pero si el usuario cambia sin aplicar, mantenemos coherencia visual:
      const matchEstado = !estado || (estado === "APROBADO" && c.estado === "Pagado")
                                   || (estado === "PENDIENTE" && c.estado === "Pendiente")
                                   || (estado === "RECHAZADO" && c.estado === "Vencido")
                                   || (estado === "VENCIDO" && c.estado === "Vencido");
      return matchFechaInicio && matchFechaFin && matchEstado;
    });
  }, [clientes, fechaInicio, fechaFin, estado]);

  const totalMonto = clientesFiltrados.reduce((sum, c) => sum + (Number(c.monto) || 0), 0);

  const exportarExcel = () => {
    const datos = clientesFiltrados.map((c) => ({
      Cliente: c.nombre,
      Tipo: c.tipo,
      Monto: c.monto,
      Estado: c.estado,
      Fecha: c.fecha,
    }));
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reportes");
    XLSX.writeFile(wb, "reporte_quickcollect.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ENCABEZADO */}
      <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white px-2 py-1 rounded font-bold text-xl">$</div>
          <h1
            className="text-xl font-bold text-gray-800 cursor-pointer"
            onClick={() => navigate("/dashboard-suscripcion")}
          >
            QuickCollect
          </h1>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/dashboard-suscripcion" className="text-gray-700 hover:text-indigo-600">
            Actividad
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
            Dashboard
          </Link>
          <a href="#" className="text-indigo-600 font-semibold">
            Reportes
          </a>
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            <PlusCircle size={16} /> Registrar Cliente
          </button>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* FILTROS */}
        <div className="bg-white p-5 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filtros de búsqueda</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={exportarExcel}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FileSpreadsheet size={18} /> Exportar Excel
              </button>

              <button
                onClick={fetchData}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                Aplicar
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Cliente (buscar) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Buscar Cliente
              </label>
              <input
                type="text"
                placeholder="Nombre del cliente"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Estado del pago
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">(Todos)</option>
                <option value="APROBADO">Aprobado</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="RECHAZADO">Rechazado</option>
                <option value="VENCIDO">Vencido</option>
              </select>
            </div>

            {/* Fechas */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Fecha inicial
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Fecha final
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Monto</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td className="p-3" colSpan={6}>Cargando…</td></tr>
              )}
              {!loading && err && (
                <tr><td className="p-3 text-red-600" colSpan={6}>{err}</td></tr>
              )}
              {!loading && !err && clientesFiltrados.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <Link
                      to={`/dashboard-suscripcion?s=${c.suscripcionId}`}
                      className="text-indigo-600 hover:underline"
                      title="Ver pagos de esta suscripción"
                    >
                      {c.nombre}
                    </Link>
                  </td>
                  <td className="p-3">{c.tipo}</td>
                  <td className="p-3 font-medium text-gray-800">
                    {money(c.monto)}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      c.estado === "Pagado"
                        ? "text-green-600"
                        : c.estado === "Pendiente"
                        ? "text-yellow-600"
                        : c.estado === "Vencido"
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                  >
                    {c.estado}
                  </td>
                  <td className="p-3">{c.fecha}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    {c.estado === "Inactivo" ? (
                      <button
                        onClick={() => handleActivar(c.id)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <RefreshCcw size={16} /> Activar
                      </button>
                    ) : (
                      <>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Bell size={18} />
                        </button>
                        <button
                          onClick={() =>
                            setClientes((prev) =>
                              prev.map((x) =>
                                x.id === c.id ? { ...x, estado: "Inactivo" } : x
                              )
                            )
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50 font-semibold text-indigo-700">
                <td colSpan="2" className="p-3 text-right">
                  Total
                </td>
                <td className="p-3">{money(totalMonto)}</td>
                <td colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      {/* MODAL REGISTRO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Registro de Nuevo Cliente
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              para gestionar sus cobros recurrentes
            </p>

            <form onSubmit={handleRegistrarCliente} className="space-y-4">
              {/* Tipo de cliente */}
              <div className="flex gap-6">
                <label>
                  <input
                    type="checkbox"
                    checked={nuevoCliente.tipo === "Persona Natural"}
                    onChange={() =>
                      setNuevoCliente({ ...nuevoCliente, tipo: "Persona Natural" })
                    }
                  />{" "}
                  Persona Natural
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={nuevoCliente.tipo === "Empresa / Negocio"}
                    onChange={() =>
                      setNuevoCliente({ ...nuevoCliente, tipo: "Empresa / Negocio" })
                    }
                  />{" "}
                  Empresa / Negocio
                </label>
              </div>

              {/* Campos principales */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Razón Social *"
                  value={nuevoCliente.nombre}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
                  }
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="NIT *"
                  value={nuevoCliente.nit}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, nit: e.target.value })
                  }
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={nuevoCliente.email}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, email: e.target.value })
                  }
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Teléfono *"
                  value={nuevoCliente.telefono}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })
                  }
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  value={nuevoCliente.direccion}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Nombre Representante Legal"
                  value={nuevoCliente.representante}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      representante: e.target.value,
                    })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Cc Representante Legal"
                  value={nuevoCliente.ccRepresentante}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      ccRepresentante: e.target.value,
                    })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Día de Cobro"
                  value={nuevoCliente.diaCobro}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, diaCobro: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


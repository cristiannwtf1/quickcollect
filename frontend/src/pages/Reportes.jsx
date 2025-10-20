// src/pages/Reportes.jsx
import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Edit,
  Bell,
  Trash2,
  RefreshCcw,
  FileSpreadsheet,
  PlusCircle,
} from "lucide-react";
import * as XLSX from "xlsx";

export default function Reportes() {
  const navigate = useNavigate();

  // Datos de ejemplo
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Gimnasio FitLife", tipo: "Mensual", monto: 250000, estado: "Pagado", fecha: "2025-10-10" },
    { id: 2, nombre: "Colegio San Marcos", tipo: "Anual", monto: 1800000, estado: "Pendiente", fecha: "2025-10-14" },
    { id: 3, nombre: "Academia DancePro", tipo: "Mensual", monto: 320000, estado: "Vencido", fecha: "2025-09-30" },
    { id: 4, nombre: "Farmacia San José", tipo: "Trimestral", monto: 500000, estado: "Pagado", fecha: "2025-10-05" },
    { id: 5, nombre: "Tienda La Esquina", tipo: "Mensual", monto: 210000, estado: "Pendiente", fecha: "2025-10-12" },
    { id: 6, nombre: "Peluquería Bella", tipo: "Mensual", monto: 190000, estado: "Vencido", fecha: "2025-09-27" },
    { id: 7, nombre: "Restaurante Sabor", tipo: "Anual", monto: 2100000, estado: "Inactivo", fecha: "2025-08-20" },
    { id: 8, nombre: "Clínica Vida Plena", tipo: "Trimestral", monto: 620000, estado: "Pagado", fecha: "2025-10-08" },
    { id: 9, nombre: "Escuela Fútbol Pro", tipo: "Mensual", monto: 280000, estado: "Pendiente", fecha: "2025-10-11" },
    { id: 10, nombre: "Academia ArteVivo", tipo: "Anual", monto: 1500000, estado: "Inactivo", fecha: "2025-07-05" },
  ]);

  const [filtroEstado, setFiltroEstado] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

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

  const handleFiltroEstado = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFiltroEstado(selected);
  };

  const handleActivar = (id) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: "Pendiente" } : c))
    );
  };

  // Filtro dinámico
  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const matchEstado = filtroEstado.length === 0 || filtroEstado.includes(c.estado);
      const matchFechaInicio = !fechaInicio || c.fecha >= fechaInicio;
      const matchFechaFin = !fechaFin || c.fecha <= fechaFin;
      return matchEstado && matchFechaInicio && matchFechaFin;
    });
  }, [clientes, filtroEstado, fechaInicio, fechaFin]);

  const totalMonto = clientesFiltrados.reduce((sum, c) => sum + c.monto, 0);

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
            <button
              onClick={exportarExcel}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FileSpreadsheet size={18} /> Exportar Excel
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Cliente */}
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
                multiple
                onChange={handleFiltroEstado}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Vencido">Vencido</option>
                <option value="Inactivo">Inactivo</option>
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
              {clientesFiltrados.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{c.nombre}</td>
                  <td className="p-3">{c.tipo}</td>
                  <td className="p-3 font-medium text-gray-800">
                    ${c.monto.toLocaleString()}
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
                <td className="p-3">${totalMonto.toLocaleString()}</td>
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


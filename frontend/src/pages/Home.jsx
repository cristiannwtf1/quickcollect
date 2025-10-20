// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Automatiza tus Cobros Recurrentes
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          La solución completa para Pymes colombianas que buscan optimizar sus procesos 
          de facturación y cobro. Reduce la morosidad, mejora tu flujo de caja 
          y dedica más tiempo a hacer crecer tu negocio.
        </p>
        <div className="flex justify-center gap-4">
          <Link
  to="/portafolio"
  className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded hover:bg-indigo-100"
>
  Ver Portafolio
</Link>
          <Link
            to="/planes"
            className="px-6 py-3 bg-indigo-800 font-semibold rounded border border-white hover:bg-indigo-700"
          >
            Planes
          </Link>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Por qué Elegir QuickCollect?
          </h2>
          <p className="text-gray-600">
            Diseñado específicamente para las necesidades de las Pymes colombianas.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">
              Automatización Completa
            </h3>
            <p className="text-gray-600">
              Programa tus cobros y olvida las tareas repetitivas. 
              El sistema se encarga de todo.
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">
              Mejora tu Flujo de Caja
            </h3>
            <p className="text-gray-600">
              Reduce la morosidad hasta un 70% con recordatorios automáticos y seguimiento inteligente.
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">
              Reportes Detallados
            </h3>
            <p className="text-gray-600">
              Analiza el comportamiento de tus clientes y toma decisiones basadas en datos reales.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">QuickCollect</h3>
            <p className="text-gray-400 text-sm">
              Transformando la gestión de cobros para las Pymes colombianas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">Contacto</h4>
            <p className="text-gray-400 text-sm">📧 info@quickcollect.co</p>
            <p className="text-gray-400 text-sm">📞 +57 (1) 234-5678</p>
            <p className="text-gray-400 text-sm">📍 Bogotá, Colombia</p>
          </div>

          <div className="text-gray-400 text-sm text-center md:text-right">
            © {new Date().getFullYear()} QuickCollect. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

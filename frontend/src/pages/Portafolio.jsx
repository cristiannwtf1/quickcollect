// src/pages/Portafolio.jsx
import React from "react";
import { Link } from "react-router-dom";

const industries = [
  {
    id: "gym",
    title: "Gimnasios",
    subtitle: "Retén más socios y asegura los pagos mensuales",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop",
    result: "Hasta 70% menos de morosidad en 90 días",
  },
  {
    id: "health",
    title: "EPS / Clínicas",
    subtitle: "Cobros recurrentes y conciliación para convenios",
    img: "/clinicas.jpg", // 👈 Reemplazo por tu imagen local
    result: "Procesos de cobro más limpios y trazables",
  },
  {
    id: "school",
    title: "Colegios Privados",
    subtitle: "Mensualidades al día, padres más tranquilos",
    img: "/colegios.jpg", // 👈 Reemplazo por tu imagen local
    result: "Mayor puntualidad en pagos y menos morosidad",
  },
  {
    id: "dance",
    title: "Academias de Baile",
    subtitle: "Cobros por clases y reportes de asistencia",
    img: "/baile.jpg", // 👈 Reemplazo por tu imagen local
    result: "Adherencia y pagos consistentes por ciclo",
  },
  {
    id: "football",
    title: "Academias de Fútbol",
    subtitle: "Suscripciones deportivas fáciles de administrar",
    img: "/futbol.jpg", // 👈 Reemplazo por tu imagen local
    result: "Cobros predecibles para entrenadores y padres",
  },
  {
    id: "courses",
    title: "Cursos y Academias",
    subtitle: "Pagos recurrentes para formación continua",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    result: "Más inscritos y menos impagos",
  },
];

const successCases = [
  {
    title: "FitLife — Gimnasio",
    img: "/gimnacio.jpg",
    quote: "Implementamos QuickCollect y pasamos a cobrar a tiempo. Menos llamadas, más energía para entrenar.",
    stat: "−70% morosidad",
  },
  {
    title: "Colegio San Marcos",
    img: "Profesor.jpg",
    quote: "Padres felices y caja saludable. La comunicación automatizada lo cambió todo.",
    stat: "Pagos 90% puntuales",
  },
  {
    title: "Academia DancePro",
    img: "baile.jpg",
    quote: "Los cobros automáticos nos dieron previsibilidad y poder de crecimiento.",
    stat: "Cobros 24/7",
  },
];

export default function Portafolio() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative">
        <div
          className="h-72 sm:h-96 bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(79, 70, 229, 0.75), rgba(123, 31, 162, 0.75)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f8e4c2b1a9e6d7c5b4a3f2e1d0c9b8a')",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Reduce hasta <span className="underline decoration-white/40">70%</span> la morosidad
            </h1>
            <p className="mt-4 max-w-2xl text-lg opacity-90">
              Automatiza cobros, envía recordatorios y mejora tu flujo de caja con QuickCollect.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/planes" className="bg-white text-indigo-700 px-5 py-2 rounded-md font-semibold">
                Ver Planes
              </Link>
              <a
                href="mailto:soporte@quickcollect.com"
                className="bg-indigo-700/25 text-white px-5 py-2 rounded-md font-medium border border-white/20"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES (BIG IMAGES) */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Casos por industria</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((it) => (
              <article key={it.id} className="group rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-56 sm:h-64">
                  <img
                    src={it.img}
                    alt={it.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="text-sm opacity-90">{it.subtitle}</p>
                    <div className="mt-3 inline-flex items-center gap-3">
                      <span className="bg-white/10 px-3 py-1 rounded text-sm">{it.result}</span>
                      <Link
                        to="#"
                        onClick={() => alert(`${it.title} — Demo: ver caso`)}
                        className="bg-indigo-600 px-3 py-1 rounded text-sm font-medium hover:bg-indigo-700"
                      >
                        Ver caso
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-700 text-sm">{it.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS CASES */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Casos de éxito</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successCases.map((s, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-44 object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-indigo-700">{s.title}</h3>
                  <p className="text-gray-700 mt-2">{s.quote}</p>
                  <div className="mt-3">
                    <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded">{s.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">Testimonios</h2>
          <div className="space-y-6">
            <blockquote className="bg-white p-6 rounded-lg shadow italic text-gray-700">
              “QuickCollect nos permitió enfocarnos en el servicio; las cobranzas se resolvieron solas.”
              <div className="mt-3 font-semibold text-indigo-700">— Claudia, Directora FitLife</div>
            </blockquote>

            <blockquote className="bg-white p-6 rounded-lg shadow italic text-gray-700">
              “Los padres ahora pagan a tiempo. La comunicación automatizada fue clave.” 
              <div className="mt-3 font-semibold text-indigo-700">— Rector San Marcos</div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-3">¿Listo para reducir la morosidad?</h3>
          <p className="mb-6 opacity-90">Comienza hoy con un plan que se ajuste a tu negocio.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/planes" className="bg-white text-indigo-700 px-6 py-2 rounded font-semibold">
              Ver Planes
            </Link>
            <Link to="/registro" className="border border-white/30 px-6 py-2 rounded">
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

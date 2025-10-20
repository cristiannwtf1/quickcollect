import React, { useState } from "react";

export default function Soporte() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [chatOpen, setChatOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📩 Tu mensaje ha sido enviado. Pronto nos pondremos en contacto.");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  const whatsappURL = `https://wa.me/573207716129?text=Hola,%20necesito%20soporte%20con%20QuickCollect`;

  const faqs = [
    { pregunta: "¿Puedo cancelar mi suscripción en cualquier momento?", respuesta: "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel principal." },
    { pregunta: "¿Qué métodos de pago aceptan?", respuesta: "Aceptamos tarjeta de crédito y pagos digitales. (Próximamente Nequi y Daviplata)." },
    { pregunta: "¿Cuánto tarda la activación del plan?", respuesta: "La activación es inmediata una vez confirmado el pago." },
    { pregunta: "¿Qué incluye el soporte técnico?", respuesta: "Incluye soporte por correo, WhatsApp y actualizaciones constantes." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6 relative">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-indigo-600 text-center mb-4">
          Centro de Soporte
        </h1>
        <p className="text-gray-600 text-center mb-10">
          ¿Tienes dudas o problemas? Estamos aquí para ayudarte.
        </p>

        {/* FAQ */}
        <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
        <div className="mb-10 space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="border p-3 rounded-lg cursor-pointer bg-gray-50">
              <summary className="font-medium text-gray-800">{faq.pregunta}</summary>
              <p className="text-gray-600 mt-2">{faq.respuesta}</p>
            </details>
          ))}
        </div>

        {/* Formulario */}
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <textarea
            name="mensaje"
            placeholder="Cuéntanos tu caso"
            value={form.mensaje}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg h-28"
            required
          ></textarea>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg">
            Enviar mensaje
          </button>
        </form>

        {/* WhatsApp */}
        <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
        >
          💬 Contactar por WhatsApp
        </a>

        {/* Email Soporte */}
        <p className="text-center text-gray-600 text-sm mt-4">
          También puedes escribirnos a:{" "}
          <strong>soporte@quickcollect.com</strong>
        </p>
      </div>

      {/* ✅ BURBUJA FLOTANTE DE CHAT */}
      <div className="fixed bottom-6 right-6">
        {/* Botón flotante */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl"
        >
          💬
        </button>

        {/* Ventana de chat */}
        {chatOpen && (
          <div className="w-72 bg-white shadow-xl rounded-xl p-4 mt-3 border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">Soporte en vivo</h3>
              <button onClick={() => setChatOpen(false)}>✖</button>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Hola 👋, ¿cómo podemos ayudarte?
            </p>
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="w-full border px-2 py-1 rounded text-sm"
            />
            <button className="w-full bg-green-500 text-white rounded-lg py-1 text-sm mt-2">
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

# 💰 QuickCollect — Plataforma de Gestión de Cobros Recurrentes

QuickCollect es una aplicación web desarrollada con **React + Vite**, pensada para startups, pymes y profesionales que necesitan gestionar sus cobros recurrentes de manera ágil y centralizada.

Permite registrar clientes, controlar pagos, generar reportes detallados y visualizar indicadores financieros clave.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** — Librería principal para el frontend  
- ⚡ **Vite** — Herramienta de desarrollo rápida  
- 🎨 **Tailwind CSS** — Estilos modernos y responsivos  
- 🧭 **React Router DOM** — Navegación entre vistas  
- 📊 **Recharts** — Visualización de gráficos  
- 🧾 **Lucide React** — Íconos profesionales  
- 📦 **XLSX.js** — Exportación de reportes a Excel  

---

## 🧩 Estructura del proyecto

quickcollect/

├── src/

│ ├── pages/

│ │ ├── Login.jsx

│ │ ├── Register.jsx

│ │ ├── Planes.jsx

│ │ ├── DashboardSuscripcion.jsx → Actividad Financiera

│ │ ├── DashboardIndicadores.jsx → Dashboard / Indicadores Generales

│ │ ├── Reportes.jsx → Gestión de clientes y reportes

│ ├── routes/

│ │ └── AppRouter.jsx → Configuración de rutas principales

│ ├── layout/

│ │ └── Layout.jsx

│ ├── assets/ → Imágenes y recursos

│ └── main.jsx

├── package.json

├── vite.config.js

└── README.md

-------------------------------------

---

## ⚙️ Instalación

1. Clona este repositorio:
   bash git clone https://github.com/MartinJCortes/quickcollect.git
2. Ingresa al directorio:
   cd quickcollect
4. Instala las dependencias:
   npm install


   🧭 Ejecución del proyecto

Ejecuta el siguiente comando para iniciar el entorno de desarrollo:
  npm run dev

Luego abre el enlace que muestra la consola

http://localhost:5173

📊 Funcionalidades principales
🔐 Módulo de Autenticación

Login y registro de usuarios

Redirección automática al panel de suscripción

📈 Actividad Financiera

Indicadores de ingresos, clientes, pagos y vencimientos

Vista general de actividad reciente y próximos cobros

📉 Dashboard (Indicadores Generales)

Gráficas dinámicas con datos de ingresos mensuales y pagos

Comparativos de clientes activos vs inactivos

🧾 Reportes

Filtros por estado de pago, rango de fechas y cliente

Registro de nuevos clientes

Exportación a Excel

Control de estado (activo, inactivo, vencido, pagado, pendiente)

Cálculo automático del total general

📦 Exportar datos

Desde la vista de Reportes, puedes exportar la información visible a un archivo Excel con un solo clic:



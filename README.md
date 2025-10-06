# 🚀 QuickCollect – Plataforma de Pagos y Suscripciones Recurrentes  
**Proyecto académico y profesional** – Universidad Compensar – 2025  

---

## 🧠 Descripción General

**QuickCollect** es una aplicación web desarrollada con **Django + Django REST Framework (DRF)**  
diseñada para la gestión integral de suscripciones, pagos recurrentes y notificaciones automáticas.

El sistema permite administrar usuarios, planes, métodos de pago y pagos asociados,  
con la posibilidad de generar alertas, métricas y reportes centralizados para empresas que manejan modelos de cobro periódico (por ejemplo: gimnasios, academias o servicios SaaS).

---

## 🧩 Estructura del Proyecto

```
quickcollect/
│
├── core/
│   ├── models.py          # Modelos de negocio
│   ├── serializers.py     # Serializadores DRF
│   ├── views.py           # Lógica de API y endpoints personalizados
│   ├── urls.py            # Rutas del módulo core
│   └── migrations/        # Migraciones de base de datos
│
├── quickcollect/
│   ├── settings.py        # Configuración global
│   ├── urls.py            # Enrutamiento principal
│   ├── asgi.py / wsgi.py  # Despliegue ASGI / WSGI
│
├── manage.py              # Comando principal de Django
├── requirements.txt       # Dependencias del proyecto
└── .gitignore             # Archivos excluidos de Git
```

---

## ⚙️ Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/cristiannwtf1/quickcollect.git
cd quickcollect
```

### 2️⃣ Crear entorno virtual
```bash
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # Linux / Mac
```

### 3️⃣ Instalar dependencias
```bash
pip install -r requirements.txt
```

### 4️⃣ Aplicar migraciones
```bash
python manage.py migrate
```

### 5️⃣ Ejecutar el servidor
```bash
python manage.py runserver
```

Servidor disponible en:  
🔗 http://127.0.0.1:8000/

---

## 📡 Endpoints REST Principales

| Descripción | Método | Endpoint |
|--------------|---------|----------|
| Health Check | `GET` | `/api/health/` |
| Dashboard KPIs | `GET` | `/api/dashboard/resumen/` |
| Usuarios | `GET/POST` | `/api/usuarios/` |
| Planes | `GET/POST` | `/api/planes/` |
| Suscripciones | `GET/POST` | `/api/suscripciones/` |
| Métodos de Pago | `GET/POST` | `/api/metodos/` |
| Pagos | `GET/POST` | `/api/pagos/` |
| Notificaciones | `GET/POST` | `/api/notificaciones/` |
| Simular Notificación | `POST` | `/api/notificaciones/simular/` |

---

## 🔔 Ejemplo: Simular Notificación

### Solicitud
```
POST /api/notificaciones/simular/
```

```json
{
  "suscripcion": 1,
  "asunto": "Recordatorio de pago",
  "mensaje": "Tu pago vence pronto"
}
```

### Respuesta
```json
{
  "id": 1,
  "suscripcion": 1,
  "pago": 2,
  "canal": "CORREO",
  "asunto": "Recordatorio de pago",
  "cuerpo": "Tu pago vence pronto",
  "estado_envio": "PENDIENTE",
  "fecha_envio": null
}
```

💡 Si no se envía el campo `pago`, el sistema selecciona automáticamente el pago más reciente con estado **pendiente** o **vencido**.

---

## 📊 Dashboard – KPIs Incluidos

- Total de usuarios, planes y suscripciones.  
- Montos totales y por estado de pago.  
- Conteos de pagos aprobados, rechazados y pendientes.  
- Ticket promedio del mes.  
- Serie de pagos de los últimos 6 meses.  
- Detección de suscripciones morosas (pagos rechazados en el mes actual).

---

## 🧩 Ejemplo de Respuesta del Dashboard

```json
{
  "usuarios": {"total": 3},
  "planes": {"total": 2},
  "suscripciones": {"total": 2, "activa": 2, "pausada": 0, "cancelada": 0},
  "pagos": {
    "monto_total": 550000.0,
    "montos_por_estado": {
      "aprobado": 50000.0,
      "pendiente": 500000.0
    }
  },
  "riesgos": {"suscripciones_morosas_mes_actual": 0}
}
```

---

## 🧰 Requerimientos Técnicos

| Componente | Versión mínima |
|-------------|----------------|
| Python | 3.10+ |
| Django | 5.0+ |
| Django REST Framework | 3.15+ |
| Base de datos | SQLite o PostgreSQL |

---

## 👨‍💻 Autor Técnico

**Cristian Guiovany Cubillos Olarte**  
Estudiante de Ingeniería de Sistemas  
📍 Fundación Universitaria Compensar – Bogotá, Colombia  
📧 cgco@ucompensar.edu.co  
🔗 GitHub: [cristiannwtf1](https://github.com/cristiannwtf1)

---

## 🎓 Sección Universitaria

### Proyecto Final – Ingeniería de Sistemas  
**Asignatura:** Proyecto Integrador / Prácticas Profesionales  
**Docente:** _(por definir)_  
**Periodo:** 2025-II  

#### 📚 Descripción académica

QuickCollect es un sistema de información diseñado como **prototipo funcional** para demostrar competencias en el desarrollo de software empresarial, aplicando buenas prácticas de ingeniería, arquitectura por capas, y principios REST.

#### 🧱 Objetivos específicos

1. Implementar un backend en Django con estructura modular.  
2. Incorporar autenticación y CRUDs base de datos relacionales.  
3. Automatizar cálculos de indicadores de gestión (KPI).  
4. Simular notificaciones automáticas de recordatorio de pago.  
5. Versionar y documentar el código en GitHub.

#### 🧩 Resultados obtenidos

- API REST funcional, con persistencia de datos.  
- Panel de métricas dinámico.  
- Sistema escalable para futuros módulos de facturación electrónica.  
- Código publicado y documentado en GitHub.  

---

## 🛡️ Licencia

Proyecto de carácter **educativo y demostrativo**, libre para análisis o reutilización académica.

---

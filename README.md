# Vivienco — Bróker Hipotecario y Leasing Habitacional en Colombia (`vivienco.com.co`)

Plataforma web full-stack **MERN** desarrollada para **Vivienco**, firma especializada en asesoría e intermediación financiera e inmobiliaria en Colombia (con sede principal en Barranquilla). Permite a las familias colombianas y residentes en el exterior comparar alternativas de financiación de vivienda, simular cuotas mensuales, consultar guías de educación financiera y subsidios, y conectarse directamente con especialistas hipotecarios sin costo.

---

## 1. Descripción de la Plataforma

**Vivienco** centraliza en una experiencia digital clara y transparente todo el recorrido para adquirir o mejorar condiciones de vivienda en Colombia:

- **Frontend interactivo en React 19 + Vite**: Navegación fluida por pestañas, comparador de tasas por modalidad, simulador financiero en tiempo real, biblioteca interactiva de educación financiera y blog, y contacto directo con brókers.
- **Backend API REST en Node.js + Express + MongoDB Atlas**: Gestión de solicitudes de estudio de crédito, autenticación de especialistas, actualización de etapas del proceso hipotecario (con respaldo automático en memoria local ante contingencias de red) e integración con el Asesor Digital en línea.

---

## 2. Características Principales

- **Simulador y Comparador en 4 Modalidades**:
  - Permite cotizar **Crédito Hipotecario**, **Leasing Habitacional**, **Compra de Cartera** y **Remodelación**.
  - Selección dinámica entre vivienda **VIS** (hasta 80% de financiación) y **No VIS** (hasta 70% de financiación) en plazos de 15, 20 y 30 años.
  - Filtra automáticamente las entidades que ofrecen la modalidad seleccionada y calcula la **cuota mensual estimada desde** con sistema de amortización en pesos (cuota fija).
- **7 Bancos Aliados con Rangos de Tasas (Consolidado Noviembre 2026)**:
  - **Banco AV Villas**, **Banco Caja Social**, **BBVA**, **Banco de Bogotá**, **Banco de Occidente**, **Bancolombia** y **Credifamilia**, mostrando rangos reales (`Desde X% hasta Y% E.A.`) diferenciados para VIS y No VIS.
- **Blindaje Legal y Protección al Consumidor (Ley 1480 de 2011)**:
  - Sellos de vigencia mensual (`Actualizado: Noviembre 2026`) y bloques de aviso legal explícito en las secciones de tasas y simulaciones aclarando el carácter informativo y no vinculante de las proyecciones.
- **Modales Interactivos de Educación Financiera y Blog**:
  - Filtro por categorías y lectura completa en ventana modal con explicación detallada, puntos clave, ejemplos prácticos en pesos colombianos (COP) y consejos de especialistas.
- **Subsidios de Vivienda y Topes SMMLV 2026**:
  - Información actualizada sobre Cajas de Compensación Familiar, Concurrencia de Subsidios, cobertura FRECH, estado de programas nacionales y cálculo automático de topes **VIP (90 SMMLV)** y **VIS (135 / 150 SMMLV)** con base en el SMMLV 2026 (`$1.750.905 COP`).
- **Contacto Directo por WhatsApp con Nuestros 3 Especialistas (Barranquilla)**:
  - **Ángel Mejías** — Bróker Hipotecario e Inmobiliario (+10 años de experiencia) · WhatsApp: `+57 301 619 6503`
  - **Johanna Paola Peña Paez** — Bróker Hipotecario e Inmobiliario (+15 años en el sector financiero) · WhatsApp: `+57 300 628 4942`
  - **Jorge Hernán Solís Sánchez** — Bróker Inmobiliario y Financiero (+5 años de experiencia) · WhatsApp: `+57 317 404 3360`
- **Asesoría Digital Vivienco (Chatbot en Línea)**:
  - Asistente conversacional que calcula capacidad de endeudamiento en vivo según ingresos o valor del inmueble y resuelve dudas sobre trámites, documentos, leasing, UVR vs. Pesos y compra desde el exterior.
- **Panel Administrativo para Especialistas**:
  - Acceso protegido por credenciales para consultar las solicitudes de estudio de crédito registradas y actualizar en tiempo real la etapa de cada cliente (*1. Estudio de crédito* a *6. Desembolsado*).

---

## 3. Tecnologías Utilizadas

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, CSS3 (Variables CSS, Grid, Flexbox, Animaciones), Lucide React |
| **Backend** | Node.js, Express, CORS, Dotenv |
| **Base de Datos** | MongoDB Atlas + Mongoose (con fallback automático en memoria local) |
| **Asesoría Digital** | Integración con API de Google Gemini + motor financiero local de respaldo |

---

## 4. Estructura de Carpetas del Proyecto

```text
vivienco-app/
├── backend/
│   ├── models/
│   │   ├── Administrador.js        # Esquema de usuarios administradores
│   │   └── SolicitudCredito.js     # Esquema de solicitudes de estudio de crédito
│   ├── .env                        # Variables de entorno del servidor (no versionado)
│   ├── package.json                # Dependencias y scripts del backend
│   └── server.js                   # Servidor Express, rutas API y conexión a MongoDB Atlas
├── public/
│   ├── equipo/                     # Fotografías de los 3 especialistas de Vivienco
│   ├── logos/                      # Logos locales de respaldo de bancos aliados
│   └── favicon.png                 # Isotipo oficial de Vivienco para el navegador
├── src/
│   ├── assets/
│   │   └── hero.png                # Logo oficial de Vivienco
│   ├── components/
│   │   ├── AsistenteIA.jsx / .css  # Chat flotante de Asesoría Digital Vivienco
│   │   ├── Contacto.jsx / .css     # Formulario de estudio gratuito y tarjetas de brókers
│   │   ├── Hero.jsx / .css         # Banner principal de bienvenida y propuesta de valor
│   │   ├── Navbar.jsx / .css       # Barra de navegación principal y acceso admin
│   │   ├── PanelAdmin.jsx / .css   # Panel de gestión de solicitudes y etapas de crédito
│   │   ├── SeccionesContenido.jsx / .css # Simulador, Educación Financiera, Subsidios y Blog
│   │   └── SeccionesInicio.jsx / .css    # Línea de pasos, carrusel, servicios y bancos aliados
│   ├── data/
│   │   └── datosVivienco.js        # Tasas Noviembre 2026, asesores, guías, subsidios y textos legales
│   ├── App.jsx / App.css           # Componente raíz y enrutamiento por pestañas
│   ├── index.css                   # Variables globales de color y tipografía
│   └── main.jsx                    # Punto de entrada de React
├── index.html                      # Plantilla HTML principal con metadatos SEO y fuentes
├── package.json                    # Dependencias y scripts del frontend
└── README.md                       # Documentación del proyecto
```

---

## 5. Instrucciones de Instalación y Ejecución Local

### Prerrequisitos
- **Node.js** v18 o superior instalado.
- Cuenta o URI de conexión en **MongoDB Atlas** (opcional para pruebas rápidas gracias al respaldo local integrado).

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/vivienco-app.git
cd vivienco-app
```

### 2. Instalar dependencias del Frontend y del Backend
```bash
# Instalar dependencias del frontend (raíz del proyecto)
npm install

# Instalar dependencias del backend
cd backend
npm install
cd ..
```

### 3. Configurar las variables de entorno del Backend (`backend/.env`)
Crea un archivo `.env` dentro de la carpeta `backend/` con las siguientes variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/vivienco?retryWrites=true&w=majority
ADMIN_USER=admin@vivienco.com
ADMIN_PASS=vivienco2026
GEMINI_API_KEY=tu_clave_api_de_gemini_opcional
```

### 4. Iniciar los servidores en desarrollo
Abre dos terminales en la raíz del proyecto:

**Terminal 1 — Iniciar el Backend (Puerto 5000):**
```bash
cd backend
node server.js
```

**Terminal 2 — Iniciar el Frontend con Vite:**
```bash
npm run dev
```

Abre en tu navegador la URL indicada por Vite (por defecto `http://localhost:5173`).

---

## 6. Aviso Legal sobre Tasas de Referencia

> **Aviso legal (Cumplimiento Ley 1480 de 2011 - Estatuto del Consumidor):**  
> Las tasas Efectivas Anuales (% E.A.), rangos por modalidad y simulaciones de cuotas presentadas en este portal son estrictamente informativas y de referencia para el mes vigente (**Noviembre 2026**). No constituyen una oferta comercial vinculante, promesa de tasa ni aprobación de crédito. La tasa definitiva, el porcentaje de financiación y las condiciones finales dependerán del estudio de riesgo crediticio del solicitante y de las políticas vigentes de cada entidad financiera aliada al momento de la aprobación y desembolso.

// Configuramos DNS de Google para evitar bloqueos con MongoDB Atlas
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
}

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const SolicitudCredito = require("./models/SolicitudCredito");
const Administrador = require("./models/Administrador");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());

// Datos de respaldo por si falla la conexión a la base de datos
let mongoConectado = false;
let solicitudesRespaldo = [
    {
        _id: "local-1",
        nombreCompleto: "Arcelia Paez",
        correo: "pkmyla@gmail.com",
        telefono: "3003398593",
        ingresosMensuales: 2000000,
        valorVivienda: 200000000,
        bancoInteres: "Comparar todos los bancos aliados",
        etapaProceso: "1. Estudio de crédito",
        fechaRegistro: new Date(),
    },
    {
        _id: "local-2",
        nombreCompleto: "Camila Paez",
        correo: "ptolozacamil@gmail.com",
        telefono: "3003398593",
        ingresosMensuales: 1000000,
        valorVivienda: 150000000,
        bancoInteres: "Bancolombia",
        etapaProceso: "1. Estudio de crédito",
        fechaRegistro: new Date(),
    },
];

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de Vivienco funcionando correctamente",
        baseDeDatos: mongoConectado ? "MongoDB Atlas" : "Respaldo Local Activo",
    });
});

// Ruta para validar el login del admin
app.post("/api/admin/login", (req, res) => {
    const { correo, password } = req.body;
    const usuarioValido = process.env.ADMIN_USER || "admin@vivienco.com";
    const claveValida = process.env.ADMIN_PASS || "vivienco2026";

    if (correo === usuarioValido && password === claveValida) {
        return res.status(200).json({ autenticado: true });
    }
    return res.status(401).json({
        autenticado: false,
        mensaje: "Credenciales incorrectas",
    });
});

// Guardamos la solicitud nueva en Mongo o en memoria local
app.post("/api/solicitudes", async (req, res) => {
    try {
        if (mongoConectado) {
            const nuevaSolicitud = new SolicitudCredito(req.body);
            const solicitudGuardada = await nuevaSolicitud.save();
            return res.status(201).json({
                mensaje: "Solicitud de crédito registrada con éxito",
                solicitud: solicitudGuardada,
            });
        }

        const nuevaLocal = {
            _id: `local-${Date.now()}`,
            ...req.body,
            etapaProceso: req.body.etapaProceso || "1. Estudio de crédito",
            fechaRegistro: new Date(),
        };
        solicitudesRespaldo.unshift(nuevaLocal);
        return res.status(201).json({
            mensaje: "Solicitud de crédito registrada con éxito",
            solicitud: nuevaLocal,
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al registrar la solicitud",
            detalle: error.message,
        });
    }
});

// Devuelve la lista de solicitudes para el panel admin
app.get("/api/solicitudes", async (req, res) => {
    try {
        if (mongoConectado) {
            const solicitudes = await SolicitudCredito.find().sort({ fechaRegistro: -1 });
            return res.status(200).json({
                total: solicitudes.length,
                solicitudes,
            });
        }

        return res.status(200).json({
            total: solicitudesRespaldo.length,
            solicitudes: solicitudesRespaldo,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las solicitudes",
            detalle: error.message,
        });
    }
});

// Cambia la etapa del proceso de una solicitud
const actualizarEtapaSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const { etapaProceso } = req.body;

        if (mongoConectado && !String(id).startsWith("local-")) {
            const solicitudActualizada = await SolicitudCredito.findByIdAndUpdate(
                id,
                { $set: { etapaProceso } },
                { new: true }
            );
            return res.status(200).json({
                mensaje: "Etapa actualizada correctamente",
                solicitud: solicitudActualizada,
            });
        }

        solicitudesRespaldo = solicitudesRespaldo.map((item) =>
            item._id === id ? { ...item, etapaProceso } : item
        );
        const encontrada = solicitudesRespaldo.find((item) => item._id === id);

        return res.status(200).json({
            mensaje: "Etapa actualizada correctamente",
            solicitud: encontrada,
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar la etapa",
            detalle: error.message,
        });
    }
};

app.put("/api/solicitudes/:id", actualizarEtapaSolicitud);
app.post("/api/solicitudes/:id/etapa", actualizarEtapaSolicitud);

// Ruta del chat para responder dudas con Gemini
app.post("/api/asistente", async (req, res) => {
    try {
        const { mensaje = "", historial = [] } = req.body;
        const apiKey = (process.env.GEMINI_API_KEY || "").trim();

        if (apiKey) {
            const contextoConversacion = historial
                .slice(-6)
                .map((m) => `${m.emisor === "usuario" ? "Cliente" : "Especialista Vivienco"}: ${m.texto}`)
                .join("\n");

            const promptSistema = `Actúa como el Especialista Digital en línea de Vivienco, bróker de crédito hipotecario y leasing habitacional en Colombia (con sede principal en Barranquilla).
REGLAS DE ESTILO:
- Nunca digas "Soy una IA", "Soy un asistente con IA" ni "Soy un modelo de lenguaje". Habla en primera persona plural ("En Vivienco te ayudamos...", "Podemos evaluar tu perfil...") como parte del equipo de especialistas.
- Responde en español, con tono cálido, comercial y claro, en máximo 3 o 4 oraciones.
- Tasas de referencia E.A. (Noviembre 2026) en nuestros 7 bancos aliados: Banco AV Villas (desde 13.40% E.A.), Banco Caja Social (desde 13.95% E.A.), BBVA (desde 11.50% E.A. en leasing VIS y desde 14.40% E.A. en hipotecario), Banco de Bogotá (desde 13.49% E.A. en leasing y desde 14.03% E.A. en hipotecario), Banco de Occidente (desde 14.30% E.A. en leasing y 14.92% E.A. en hipotecario), Bancolombia (desde 14.90% E.A.) y Credifamilia (desde 16.80% E.A.).
- Nuestro equipo de 3 especialistas en Barranquilla está conformado por Ángel Mejías (WhatsApp 301 619 6503), Johanna Peña (WhatsApp 300 628 4942) y Jorge Solís (WhatsApp 317 404 3360).
- Financiación máxima: hasta 80% en vivienda VIS y hasta 70% en No VIS. Plazos de 15 a 30 años. Nuestro acompañamiento y estudio son 100% gratuitos.
- Si el cliente menciona sus ingresos, calcula que puede destinar hasta el 30%-40% de su ingreso mensual a la cuota e invítalo a dejar sus datos o hablar con nuestros especialistas en la pestaña Contacto.
- Aclara siempre que las tasas y cuotas son referenciales para Noviembre 2026, no constituyen oferta vinculante y están sujetas a estudio de crédito y T&C de cada entidad.
Historial reciente:
${contextoConversacion}
Consulta del cliente: ${mensaje}`;

            const modelos = ["gemini-2.5-flash", "gemini-2.0-flash"];
            for (const modelo of modelos) {
                const respuestaIA = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: promptSistema }] }],
                        }),
                    }
                );

                if (respuestaIA.ok) {
                    const datosIA = await respuestaIA.json();
                    const textoIA = datosIA?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (textoIA) {
                        return res.status(200).json({ respuesta: textoIA });
                    }
                }
            }
        }

        return res.status(200).json({ respuesta: null });
    } catch (error) {
        return res.status(200).json({ respuesta: null });
    }
});

// Iniciamos el servidor y probamos la conexión a MongoDB
const iniciarServidor = async () => {
    app.listen(PORT, () => {
        console.log(`✅ Servidor Vivienco activo en puerto ${PORT}`);
    });

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Falta configurar MONGO_URI");
        }
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4,
            serverSelectionTimeoutMS: 7000,
        });
        mongoConectado = true;
        console.log("✅ Conexión exitosa con MongoDB Atlas");
    } catch (error) {
        mongoConectado = false;
        console.warn("⚠️ Red bloqueando MongoDB Atlas. Usando Respaldo Local Activo.");
    }
};

iniciarServidor();
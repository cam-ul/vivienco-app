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

// Respaldo automático en memoria si la red bloquea MongoDB Atlas
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

// 1. Validar credenciales del administrador en el servidor (POST)
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

// 2. Crear nueva solicitud (POST)
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

// 3. Obtener todas las solicitudes para el Panel Admin (GET)
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

// 4. Actualizar la etapa de una solicitud desde el Panel Admin (PUT y POST)
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

// 5. Asistente Virtual con IA (POST)
app.post("/api/asistente", async (req, res) => {
    try {
        const { mensaje, historial = [] } = req.body;
        const apiKey = (process.env.GEMINI_API_KEY || "").trim();

        if (apiKey) {
            const contextoConversacion = historial
                .map((m) => `${m.emisor === "usuario" ? "Cliente" : "Asesor Vivienco"}: ${m.texto}`)
                .join("\n");

            const promptSistema = `Eres el Asistente con IA experto de Vivienco, bróker de crédito hipotecario y leasing habitacional en Colombia. Responde en español, en máximo 3 o 4 oraciones claras y amables. Bancos aliados: Bancolombia (10.5%), Caja Social (10.9%), Bogotá (11.2%), AV Villas (11.5%), Occidente (11.8%), Itaú (12.1%), Credifamilia (13.2%). Financiación hasta 80% VIS y 70% No VIS. Servicio 100% gratuito. Historial:\n${contextoConversacion}\nPregunta: ${mensaje}`;

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

// Enciende Express primero y luego intenta conectar a MongoDB con family: 4
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
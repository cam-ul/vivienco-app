const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const SolicitudCredito = require("./models/SolicitudCredito");
const Administrador = require("./models/Administrador");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensaje: "API de Vivienco funcionando correctamente" });
});

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensaje: "API de Vivienco funcionando correctamente" });
});

// 1. Crear nueva solicitud (POST)
app.post("/api/solicitudes", async (req, res) => {
    try {
        const nuevaSolicitud = new SolicitudCredito(req.body);
        const solicitudGuardada = await nuevaSolicitud.save();
        res.status(201).json({
            mensaje: "Solicitud de crédito registrada con éxito",
            solicitud: solicitudGuardada,
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al registrar la solicitud",
            detalle: error.message,
        });
    }
});

// 2. Obtener todas las solicitudes para el Panel Admin (GET)
app.get("/api/solicitudes", async (req, res) => {
    try {
        const solicitudes = await SolicitudCredito.find().sort({ fechaRegistro: -1 });
        res.status(200).json({
            total: solicitudes.length,
            solicitudes,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las solicitudes",
            detalle: error.message,
        });
    }
});

// 3. Actualizar la etapa de una solicitud desde el Panel Admin (PUT y POST)
const actualizarEtapaSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const { etapaProceso } = req.body;

        const solicitudActualizada = await SolicitudCredito.findByIdAndUpdate(
            id,
            { $set: { etapaProceso } },
            { new: true }
        );

        console.log("✅ Etapa actualizada en MongoDB Atlas:", solicitudActualizada?.etapaProceso);

        res.status(200).json({
            mensaje: "Etapa actualizada correctamente",
            solicitud: solicitudActualizada,
        });
    } catch (error) {
        console.error("❌ Error al actualizar etapa:", error.message);
        res.status(400).json({
            mensaje: "Error al actualizar la etapa",
            detalle: error.message,
        });
    }
};

app.put("/api/solicitudes/:id", actualizarEtapaSolicitud);
app.post("/api/solicitudes/:id/etapa", actualizarEtapaSolicitud);

// 4. Asistente Virtual con IA (POST)
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

const iniciarServidor = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Falta configurar MONGO_URI");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión exitosa con MongoDB");
        app.listen(PORT, () => {
            console.log(`Servidor Vivienco activo en puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar Vivienco:", error.message);
    }
};

iniciarServidor();
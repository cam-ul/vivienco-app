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

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ mensaje: "API de Vivienco funcionando correctamente" });
});

// Crear nueva solicitud de crédito (POST)
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

// Obtener todas las solicitudes para el Panel Admin (GET)
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

app.post("/api/asistente", async (req, res) => {
    try {
        const { mensaje, historial = [] } = req.body;
        const apiKey = (process.env.GEMINI_API_KEY || "").trim();

        if (apiKey) {
            const contextoConversacion = historial
                .map((m) => `${m.emisor === "usuario" ? "Cliente" : "Asesor Vivienco"}: ${m.texto}`)
                .join("\n");

            const promptSistema = `Eres el Asistente con IA experto de Vivienco, bróker de crédito hipotecario y leasing habitacional en Colombia.
Responde en español, en máximo 3 o 4 oraciones claras, precisas y amables.
Datos oficiales de Vivienco:
- Bancos aliados y tasas E.A.: Bancolombia (10.5%), Banco Caja Social (10.9%), Banco de Bogotá (11.2%), AV Villas (11.5%), Banco de Occidente (11.8%), Itaú (12.1%), Credifamilia (13.2%).
- ¿Quiénes aplican?: Mayores de 18 hasta 72 años, empleados, independientes, pensionados y colombianos en el exterior. Se pueden unir ingresos familiares.
- Financiación: Hasta 80% en VIS y 70% en No VIS (hasta 85% en leasing habitacional). Plazos de 5 a 30 años. Cuota máxima: 30% a 40% de los ingresos.
- Subsidios 2026 (SMMLV $1.750.905): Cajas de compensación hasta 30 SMMLV, Subsidio Concurrente hasta 50 SMMLV. Topes: VIP 90 SMMLV, VIS 135-150 SMMLV.
- Servicio de Vivienco: 100% gratuito para el cliente.
Historial reciente:
${contextoConversacion}
Pregunta actual del cliente: ${mensaje}`;

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
        console.error("Aviso en asistente IA:", error.message);
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
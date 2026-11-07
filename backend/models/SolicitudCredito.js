
const mongoose = require("mongoose");

// Esquema para las solicitudes de crédito
const esquemaSolicitudCredito = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        trim: true
    },

    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    telefono: {
        type: String,
        required: true,
        trim: true
    },

    ingresosMensuales: {
        type: Number,
        required: true,
        min: 0
    },

    valorVivienda: {
        type: Number,
        required: true,
        min: 0
    },

    bancoInteres: {
        type: String,
        trim: true
    },

    etapaProceso: {
        type: String,
        default: "1. Estudio de crédito"
    },

    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

// Modelo de solicitudes
const SolicitudCredito = mongoose.model(
    "SolicitudCredito",
    esquemaSolicitudCredito
);

module.exports = SolicitudCredito;

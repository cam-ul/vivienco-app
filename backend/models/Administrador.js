
const mongoose = require("mongoose");

// Esquema de administradores de Vivienco
const esquemaAdministrador = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
    // Se guarda como hash seguro generado con bcryptjs.
    // Nunca debe almacenarse la contraseña original.
  }
});

// Modelo de administradores
const Administrador = mongoose.model(
  "Administrador",
  esquemaAdministrador
);

module.exports = Administrador;

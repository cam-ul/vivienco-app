import { useState } from "react";
import "./Contacto.css";

const integrantesEquipo = [
  {
    id: 1,
    nombre: "Laura Martínez",
    cargo: "Asesora Especialista en Crédito Hipotecario",
  },
  {
    id: 2,
    nombre: "Andrés Rojas",
    cargo: "Bróker de Crédito de Vivienda",
  },
  {
    id: 3,
    nombre: "Camila Torres",
    cargo: "Coordinadora de Procesos Hipotecarios",
  },
];

const datosIniciales = {
  nombreCompleto: "",
  correo: "",
  telefono: "",
  ingresosMensuales: "",
  valorVivienda: "",
  bancoInteres: "Bancolombia",
};

function Contacto() {
  const [datosFormulario, setDatosFormulario] = useState(datosIniciales);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const enviarSolicitud = async (evento) => {
    evento.preventDefault();
    setErrorEnvio("");

    try {
      const respuesta = await fetch("http://localhost:5000/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...datosFormulario,
          ingresosMensuales: Number(datosFormulario.ingresosMensuales),
          valorVivienda: Number(datosFormulario.valorVivienda),
        }),
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo registrar la solicitud");
      }

      setSolicitudEnviada(true);
      setDatosFormulario(datosIniciales);
    } catch (error) {
      console.error(error);
      setErrorEnvio("Asegúrate de que el servidor backend esté encendido en el puerto 5000.");
    }
  };

  return (
    <>
      <section className="contacto" id="contacto">
        <div className="equipo">
          <h2 className="equipo__titulo">Nuestro equipo</h2>
          <div className="equipo__rejilla">
            {integrantesEquipo.map((integrante) => (
              <article className="tarjeta-integrante" key={integrante.id}>
                <div
                  className="tarjeta-integrante__foto"
                  role="img"
                  aria-label={`Foto de ${integrante.nombre}`}
                />
                <h3 className="tarjeta-integrante__nombre">{integrante.nombre}</h3>
                <p className="tarjeta-integrante__cargo">{integrante.cargo}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="formulario-caja">
          <h2 className="formulario__titulo">Solicita tu estudio de crédito gratuito</h2>
          <p className="formulario__subtitulo">
            Déjanos tus datos y un asesor se comunicará contigo.
          </p>

          <form className="formulario" onSubmit={enviarSolicitud}>
            <label className="campo campo--completo">
              <span className="campo__etiqueta">Nombre completo</span>
              <input
                className="campo__entrada"
                type="text"
                name="nombreCompleto"
                value={datosFormulario.nombreCompleto}
                onChange={manejarCambio}
                placeholder="Ej. María Pérez"
                required
              />
            </label>

            <label className="campo">
              <span className="campo__etiqueta">Correo</span>
              <input
                className="campo__entrada"
                type="email"
                name="correo"
                value={datosFormulario.correo}
                onChange={manejarCambio}
                placeholder="correo@ejemplo.com"
                required
              />
            </label>

            <label className="campo">
              <span className="campo__etiqueta">Teléfono</span>
              <input
                className="campo__entrada"
                type="tel"
                name="telefono"
                value={datosFormulario.telefono}
                onChange={manejarCambio}
                placeholder="300 000 0000"
                required
              />
            </label>

            <label className="campo">
              <span className="campo__etiqueta">Ingresos mensuales</span>
              <input
                className="campo__entrada"
                type="number"
                min="0"
                name="ingresosMensuales"
                value={datosFormulario.ingresosMensuales}
                onChange={manejarCambio}
                placeholder="$ 0"
                required
              />
            </label>

            <label className="campo">
              <span className="campo__etiqueta">Valor estimado de la vivienda</span>
              <input
                className="campo__entrada"
                type="number"
                min="0"
                name="valorVivienda"
                value={datosFormulario.valorVivienda}
                onChange={manejarCambio}
                placeholder="$ 0"
                required
              />
            </label>

            <button className="formulario__boton campo--completo" type="submit">
              Enviar solicitud
            </button>

            {solicitudEnviada && (
              <p className="formulario__mensaje campo--completo" role="status">
                ¡Gracias! Recibimos tu solicitud en la base de datos y te contactaremos pronto.
              </p>
            )}

            {errorEnvio && (
              <p className="formulario__mensaje campo--completo" role="alert">
                {errorEnvio}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="pie-pagina">
        <p className="pie-pagina__logo">VIVIENCO</p>
        <p className="pie-pagina__derechos">© 2026 Vivienco. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default Contacto;
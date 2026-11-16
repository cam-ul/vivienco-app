import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { bancosAliados, integrantesEquipo } from "../data/datosVivienco";
import "./Contacto.css";

// URL base del backend en producción o local
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const datosIniciales = {
  nombreCompleto: "",
  correo: "",
  telefono: "",
  ingresosMensuales: "",
  valorVivienda: "",
  bancoInteres: "",
};

function Contacto() {
  const [datosFormulario, setDatosFormulario] = useState(datosIniciales);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState(
    integrantesEquipo[0]?.nombre || "un especialista"
  );
  const [fotosConError, setFotosConError] = useState({});

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  // Abre WhatsApp con un mensaje listo para el asesor elegido
  const abrirWhatsAppAsesor = (nombreAsesor, cargoAsesor, telefonoAsesor) => {
    const numero = telefonoAsesor || "573016196503";
    const texto = encodeURIComponent(
      `¡Hola ${nombreAsesor}! Vengo desde la página web de Vivienco y me gustaría recibir asesoría gratuita contigo (${cargoAsesor}) para mi crédito de vivienda.`
    );
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
  };

  // Envía el formulario de solicitud de estudio al backend
  const enviarSolicitud = async (evento) => {
    evento.preventDefault();
    setErrorEnvio("");
    setSolicitudEnviada(false);

    try {
      const respuesta = await fetch(`${API_URL}/api/solicitudes`, {
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
      setErrorEnvio(
        "No se pudo conectar con el servidor. Verifica que el backend esté activo en el puerto 5000."
      );
    }
  };

  return (
    <section className="contacto" id="contacto">
      <div className="formulario-caja">
        <h2 className="formulario__titulo">Solicita tu estudio de crédito gratuito</h2>
        <p className="formulario__subtitulo">
          Completa tus datos básicos para evaluar tu viabilidad financiera ante nuestros 7 bancos aliados sin ningún costo.
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
              placeholder="Ej. María Fernanda Gómez"
              required
            />
          </label>

          <label className="campo">
            <span className="campo__etiqueta">Correo personal</span>
            <input
              className="campo__entrada"
              type="email"
              name="correo"
              value={datosFormulario.correo}
              onChange={manejarCambio}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </label>

          <label className="campo">
            <span className="campo__etiqueta">Teléfono / WhatsApp</span>
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
            <span className="campo__etiqueta">Ingresos mensuales (COP)</span>
            <input
              className="campo__entrada"
              type="number"
              min="0"
              name="ingresosMensuales"
              value={datosFormulario.ingresosMensuales}
              onChange={manejarCambio}
              placeholder="Ej. 3500000"
              required
            />
          </label>

          <label className="campo">
            <span className="campo__etiqueta">Valor estimado de la vivienda (COP)</span>
            <input
              className="campo__entrada"
              type="number"
              min="0"
              name="valorVivienda"
              value={datosFormulario.valorVivienda}
              onChange={manejarCambio}
              placeholder="Ej. 220000000"
              required
            />
          </label>

          <label className="campo campo--completo">
            <span className="campo__etiqueta">Banco de interés</span>
            <select
              className="campo__entrada"
              name="bancoInteres"
              value={datosFormulario.bancoInteres}
              onChange={manejarCambio}
              required
            >
              <option value="" disabled>
                Selecciona una entidad o compara todas
              </option>
              <option value="Comparar todos los bancos aliados">
                No estoy seguro / Comparar todos los bancos aliados
              </option>
              {bancosAliados.map((banco) => (
                <option key={banco.id} value={banco.nombre}>
                  {banco.nombre} (Desde {banco.tasaEA}% E.A.)
                </option>
              ))}
            </select>
          </label>

          <button className="formulario__boton campo--completo" type="submit">
            Enviar solicitud gratuita
          </button>

          {solicitudEnviada && (
            <p className="formulario__mensaje campo--completo" role="status">
              ¡Solicitud registrada con éxito! Un especialista analizará tu perfil y te contactaremos pronto.
            </p>
          )}

          {errorEnvio && (
            <p className="formulario__mensaje campo--completo" role="alert">
              {errorEnvio}
            </p>
          )}
        </form>
      </div>

      {/* Tarjetas de los asesores con botón directo a WhatsApp */}
      <div className="equipo" id="asesores-whatsapp">
        <span className="equipo__etiqueta">Atención inmediata por WhatsApp</span>
        <h2 className="equipo__titulo">Elige a tu especialista de confianza</h2>
        <p className="equipo__subtitulo">
          Selecciona el asesor con el que deseas conversar y abre un chat directo en WhatsApp para resolver tus dudas al instante.
        </p>

        <div className="equipo__rejilla">
          {integrantesEquipo.map((integrante) => {
            const iniciales = integrante.nombre
              .split(" ")
              .map((palabra) => palabra[0])
              .slice(0, 2)
              .join("");

            const primerNombre = integrante.nombre.split(" ")[0];
            const activo = asesorSeleccionado === integrante.nombre;
            const mostrarFoto = Boolean(integrante.fotoUrl) && !fotosConError[integrante.id];

            return (
              <article
                className="tarjeta-integrante"
                key={integrante.id}
                onClick={() => setAsesorSeleccionado(integrante.nombre)}
                style={{
                  cursor: "pointer",
                  border: activo ? "2px solid #0b3b36" : undefined,
                }}
              >
                <div
                  className="tarjeta-integrante__foto-contenedor"
                  style={
                    !mostrarFoto
                      ? {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #0b3b36, #062c29)",
                      }
                      : undefined
                  }
                >
                  {mostrarFoto ? (
                    <img
                      className="tarjeta-integrante__foto"
                      src={integrante.fotoUrl}
                      alt={`Foto de ${integrante.nombre}`}
                      width="320"
                      height="280"
                      loading="lazy"
                      onError={() =>
                        setFotosConError((prev) => ({ ...prev, [integrante.id]: true }))
                      }
                    />
                  ) : (
                    <div
                      className="tarjeta-integrante__avatar"
                      style={{ margin: 0, width: "88px", height: "88px", fontSize: "1.6rem" }}
                      aria-hidden="true"
                    >
                      {iniciales}
                    </div>
                  )}

                  {integrante.experiencia && (
                    <span className="tarjeta-integrante__experiencia">
                      {integrante.experiencia}
                    </span>
                  )}
                </div>

                <h3 className="tarjeta-integrante__nombre">{integrante.nombre}</h3>
                <p className="tarjeta-integrante__cargo">{integrante.cargo}</p>

                {integrante.trayectoria && (
                  <p
                    className="tarjeta-integrante__bio"
                    style={{ marginBottom: "14px" }}
                  >
                    {integrante.trayectoria}
                  </p>
                )}

                {Array.isArray(integrante.puntosClave) && integrante.puntosClave.length > 0 && (
                  <ul className="tarjeta-integrante__lista">
                    {integrante.puntosClave.slice(0, 4).map((punto, idx) => (
                      <li key={idx}>{punto}</li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  className="tarjeta-integrante__whatsapp"
                  style={{ width: "100%", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirWhatsAppAsesor(
                      integrante.nombre,
                      integrante.cargo,
                      integrante.whatsapp
                    );
                  }}
                >
                  <MessageCircle size={18} />
                  Hablar con {primerNombre}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contacto;
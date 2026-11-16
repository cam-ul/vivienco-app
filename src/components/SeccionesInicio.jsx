import { useState } from "react";
import {
  BarChart3,
  Landmark,
  Users,
  BookOpen,
  Home,
  DollarSign,
  User,
  FileCheck,
  CircleCheck,
  Tag,
  ShieldCheck,
  Headset,
  ArrowRight,
} from "lucide-react";
import { bancosAliados, configuracionLegalTasas } from "../data/datosVivienco";
import "./SeccionesInicio.css";

// Tarjetas para la pestaña de servicios
const listaServicios = [
  {
    id: 1,
    icono: BarChart3,
    titulo: "Estudio de crédito",
    descripcion: "Analizamos tu perfil financiero, ingresos y capacidad de endeudamiento sin costo.",
    destino: "contacto",
  },
  {
    id: 2,
    icono: Landmark,
    titulo: "Comparación de bancos",
    descripcion: "Buscamos y contrastamos las mejores tasas y plazos entre nuestros 7 bancos aliados.",
    destino: "bancos",
  },
  {
    id: 3,
    icono: Users,
    titulo: "Acompañamiento completo",
    descripcion: "Te guiamos paso a paso desde la recolección de documentos hasta el desembolso.",
    destino: "contacto",
  },
  {
    id: 4,
    icono: BookOpen,
    titulo: "Educación financiera",
    descripcion: "Aprende sobre pesos vs. UVR, leasing habitacional y planeación para tomar mejores decisiones.",
    destino: "educacion",
  },
  {
    id: 5,
    icono: Home,
    titulo: "Subsidios de vivienda",
    descripcion: "Te orientamos sobre subsidios de Cajas de Compensación, concurrencia y requisitos vigentes.",
    destino: "subsidios",
  },
  {
    id: 6,
    icono: DollarSign,
    titulo: "Compra de cartera",
    descripcion: "Mejoramos la tasa de interés y las condiciones de tu crédito hipotecario actual.",
    destino: "contacto",
  },
];

// Pasos del proceso hipotecario para el inicio
const listaPasos = [
  { numero: 1, icono: User, titulo: "Estudio de crédito", descripcion: "Analizamos tu perfil financiero y tu capacidad de pago." },
  { numero: 2, icono: Landmark, titulo: "Comparamos por ti", descripcion: "Buscamos las mejores condiciones entre varios bancos." },
  { numero: 3, icono: FileCheck, titulo: "Gestionamos el proceso", descripcion: "Nos encargamos de la radicación y el seguimiento." },
  { numero: 4, icono: CircleCheck, titulo: "Aprobación", descripcion: "Te guiamos hasta obtener la aprobación de tu crédito." },
  { numero: 5, icono: Home, titulo: "Desembolso", descripcion: "Recibes tu crédito y te acercas al hogar que sueñas." },
];

// Beneficios de la barra inferior verde
const listaValores = [
  { id: 1, icono: Tag, titulo: "100% gratuito", descripcion: "El estudio y acompañamiento no tienen costo para ti." },
  { id: 2, icono: ShieldCheck, titulo: "Transparencia", descripcion: "Te explicamos cada paso con claridad." },
  { id: 3, icono: Users, titulo: "Confianza", descripcion: "Trabajamos para encontrar la mejor opción para ti." },
  { id: 4, icono: Headset, titulo: "Cercanía", descripcion: "Estamos contigo en cada etapa del proceso." },
];

const CLASES_BANCOS = {
  "Bancolombia": "logo-bancolombia",
  "Banco de Bogotá": "logo-bogota",
  "Banco Caja Social": "logo-cajasocial",
  "AV Villas": "logo-avvillas",
  "Banco AV Villas": "logo-avvillas",
  "Banco de Occidente": "logo-occidente",
  "BBVA": "logo-bbva",
  "Credifamilia": "logo-credifamilia",
};

const MODALIDADES_BANCOS = [
  { id: "hipotecario", etiqueta: "Crédito hipotecario" },
  { id: "leasing", etiqueta: "Leasing habitacional" },
  { id: "compraCartera", etiqueta: "Compra de cartera" },
  { id: "remodelacion", etiqueta: "Remodelación" },
];

// Formatea el rango de tasa desde/hasta de cada banco
const formatearRangoTasa = (rango) => {
  if (!rango || typeof rango.desde !== "number") {
    return "No aplica en esta modalidad";
  }
  const desde = Number(rango.desde).toFixed(2);
  const hasta = Number(rango.hasta ?? rango.desde).toFixed(2);
  return `Desde ${desde}% hasta ${hasta}% E.A.`;
};

// Si la imagen del banco no carga, mostramos el nombre con estilo
function LogoBanco({ banco }) {
  const [fallaImagen, setFallaImagen] = useState(false);
  const claseEstilo = CLASES_BANCOS[banco.nombre] || "logo-bancolombia";
  const rutaLogo = banco.logoUrl || `/logos/${banco.archivo}`;

  if (fallaImagen || !rutaLogo) {
    return <span className={`logo-texto ${claseEstilo}`}>{banco.nombre}</span>;
  }

  return (
    <img
      className="logo-imagen"
      src={rutaLogo}
      alt={`Logo de ${banco.nombre}`}
      width="160"
      height="56"
      loading="lazy"
      onError={() => setFallaImagen(true)}
    />
  );
}

function IlustracionPortatil() {
  return (
    <svg className="aprende-ilustracion" viewBox="0 0 170 110" aria-hidden="true">
      <rect x="22" y="8" width="104" height="70" rx="5" fill="#fff" stroke="#172033" strokeWidth="3" />
      <rect x="32" y="20" width="34" height="4" rx="2" fill="#CBD5E1" />
      <rect x="32" y="30" width="52" height="4" rx="2" fill="#CBD5E1" />
      <rect x="32" y="40" width="44" height="4" rx="2" fill="#CBD5E1" />
      <circle cx="102" cy="38" r="14" fill="none" stroke="#172033" strokeWidth="3" />
      <path d="M8 84h132l-8 10H16z" fill="#E2E8F0" stroke="#172033" strokeWidth="3" strokeLinejoin="round" />
      <path d="M150 96c-8-4-12-14-10-24 10 2 16 10 10 24z" fill="#0B3B36" />
      <path d="M152 96c6-3 10-10 10-18-8 2-12 8-10 18z" fill="#14564E" />
      <path d="M142 96h20l-3 12h-14z" fill="#E8D39A" stroke="#172033" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SeccionesInicio({ seccionActiva = "inicio", cambiarSeccion }) {
  const irASeccion = (seccion) => {
    if (cambiarSeccion) {
      cambiarSeccion(seccion);
    }
  };

  // Si estamos en la pestaña de servicios, mostramos solo las 6 tarjetas amplias
  if (seccionActiva === "servicios") {
    return (
      <section className="secciones-inicio" id="servicios">
        <div className="secciones-contenedor secciones-contenedor--servicios">
          <header className="servicios-encabezado">
            <h2 className="servicios-titulo">NUESTROS SERVICIOS</h2>
            <p className="servicios-subtitulo">
              Te acompañamos sin costo en cada etapa para conseguir la financiación ideal de tu vivienda en Colombia.
            </p>
          </header>

          <div className="rejilla-servicios-amplia">
            {listaServicios.map(({ id, icono: Icono, titulo, descripcion, destino }) => (
              <article
                className="tarjeta-servicio-amplia"
                key={id}
                onClick={() => irASeccion(destino)}
                style={{ cursor: "pointer" }}
              >
                <div className="tarjeta-servicio-amplia__icono-caja">
                  <Icono className="tarjeta-servicio-amplia__icono" strokeWidth={1.8} />
                </div>
                <h3 className="tarjeta-servicio-amplia__titulo">{titulo}</h3>
                <p className="tarjeta-servicio-amplia__texto">{descripcion}</p>
              </article>
            ))}
          </div>

          <div className="servicios-cta">
            <button
              type="button"
              className="btn-servicios-contacto"
              onClick={() => irASeccion("contacto")}
            >
              Solicita tu estudio gratuito <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Contenido principal de la pestaña de inicio
  return (
    <section className="secciones-inicio">
      <div className="secciones-contenedor">
        {/* Línea de pasos de cómo ayudamos */}
        <div className="bloque-pasos">
          <h2 className="titulo-bloque titulo-bloque--centrado">¿CÓMO TE AYUDAMOS?</h2>
          <ol className="linea-pasos">
            {listaPasos.map(({ numero, icono: Icono, titulo, descripcion }) => (
              <li className="paso" key={numero}>
                <div className="paso__marca">
                  <span className="paso__circulo">
                    <Icono size={26} strokeWidth={1.6} />
                  </span>
                  <span className="paso__numero">{numero}</span>
                </div>
                <div className="paso__tarjeta">
                  <h3 className="paso__titulo">{titulo}</h3>
                  <p className="paso__texto">{descripcion}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Carrusel de logos de bancos aliados */}
        <div className="bloque-bancos">
          <h2 className="titulo-bancos">BANCOS ALIADOS</h2>
          <div className="carrusel" aria-label="Bancos aliados de Vivienco">
            <ul className="carrusel__pista">
              {[0, 1].map((copia) =>
                bancosAliados.map((banco) => (
                  <li
                    className="carrusel__item"
                    key={`${banco.id}-${copia}`}
                    aria-hidden={copia === 1 ? "true" : undefined}
                    onClick={() => irASeccion("bancos")}
                    style={{ cursor: "pointer" }}
                    title={`Ver detalles de ${banco.nombre}`}
                  >
                    <LogoBanco banco={banco} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Bloque informativo para ir a educación financiera */}
        <div className="bloque-aprende">
          <div className="aprende-texto">
            <h2 className="aprende-titulo">APRENDE CON VIVIENCO</h2>
            <p className="aprende-descripcion">
              Accede a artículos, guías y consejos para mejorar tus finanzas y entender todo sobre
              créditos hipotecarios.
            </p>
            <button
              type="button"
              className="aprende-enlace"
              onClick={() => irASeccion("educacion")}
            >
              Ir a educación financiera <ArrowRight size={16} />
            </button>
          </div>
          <IlustracionPortatil />
        </div>
      </div>

      {/* Barra verde con los valores de Vivienco */}
      <div className="barra-valores">
        <ul className="barra-valores__lista">
          {listaValores.map(({ id, icono: Icono, titulo, descripcion }) => (
            <li className="valor" key={id}>
              <span className="valor__icono">
                <Icono size={26} strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="valor__titulo">{titulo}</h3>
                <p className="valor__texto">{descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Tarjetas con rangos de tasas por modalidad para la sección de bancos aliados
export function TarjetasBancosAliados() {
  const [modalidad, setModalidad] = useState("hipotecario");

  return (
    <section className="bancos-detalle">
      <div className="bancos-detalle__interior">
        <header className="bancos-detalle__encabezado">
          <span className="sello-vigencia-tasas">
            Actualizado: {configuracionLegalTasas.mesVigencia}
          </span>
          <h2 className="bancos-detalle__titulo">Nuestros Bancos Aliados</h2>
          <p className="bancos-detalle__subtitulo">
            Consulta los rangos de tasas Efectivas Anuales (E.A.) por modalidad y tipo de vivienda en nuestras 7 entidades aliadas.
          </p>

          <div className="selector-modalidad-bancos" role="tablist" aria-label="Modalidad de crédito">
            {MODALIDADES_BANCOS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={modalidad === item.id}
                className={`selector-modalidad-btn ${
                  modalidad === item.id ? "selector-modalidad-btn--activo" : ""
                }`}
                onClick={() => setModalidad(item.id)}
              >
                {item.etiqueta}
              </button>
            ))}
          </div>
        </header>

        <div className="bancos-detalle__rejilla">
          {bancosAliados.map((banco) => {
            const tasasModalidad = banco.tasas?.[modalidad] || {};
            const rangoVIS = tasasModalidad.VIS ?? tasasModalidad.vis ?? null;
            const rangoNoVIS = tasasModalidad.noVis ?? tasasModalidad.noVIS ?? null;

            return (
              <article className="tarjeta-banco-detalle" key={banco.id}>
                <div className="tarjeta-banco-detalle__logo">
                  <LogoBanco banco={banco} />
                </div>

                <h3 className="tarjeta-banco-detalle__nombre">{banco.nombre}</h3>

                <div className="tarjeta-banco-detalle__rangos">
                  <div className={`rango-tasa-item ${!rangoVIS ? "rango-tasa-item--inactivo" : ""}`}>
                    <span className="rango-tasa-item__tipo">VIS:</span>
                    <span className="rango-tasa-item__valor">{formatearRangoTasa(rangoVIS)}</span>
                  </div>

                  <div className={`rango-tasa-item ${!rangoNoVIS ? "rango-tasa-item--inactivo" : ""}`}>
                    <span className="rango-tasa-item__tipo">No VIS:</span>
                    <span className="rango-tasa-item__valor">{formatearRangoTasa(rangoNoVIS)}</span>
                  </div>
                </div>

                <div className="tarjeta-banco-detalle__financiacion">
                  <div className="financiacion-dato">
                    <span className="financiacion-dato__valor">{banco.financiacionVIS || 80}%</span>
                    <span className="financiacion-dato__texto">Hasta en VIS</span>
                  </div>
                  <div className="financiacion-dato">
                    <span className="financiacion-dato__valor">{banco.financiacionNoVIS || 70}%</span>
                    <span className="financiacion-dato__texto">Hasta en No VIS</span>
                  </div>
                </div>

                <p className="tarjeta-banco-detalle__descripcion">{banco.descripcion}</p>
              </article>
            );
          })}
        </div>

        <div className="aviso-legal-tasas" role="note">
          <p className="aviso-legal-tasas__corto">{configuracionLegalTasas.avisoCorto}</p>
          <p className="aviso-legal-tasas__texto">{configuracionLegalTasas.avisoLegalCompleto}</p>
        </div>
      </div>
    </section>
  );
}

export default SeccionesInicio;

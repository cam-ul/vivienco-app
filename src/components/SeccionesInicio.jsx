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
import { bancosAliados } from "../data/datosVivienco";
import "./SeccionesInicio.css";

// 6 tarjetas para la pestaña "Servicios" del Navbar
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

// Pasos de la línea de tiempo "¿Cómo te ayudamos?" en Inicio
const listaPasos = [
  { numero: 1, icono: User, titulo: "Estudio de crédito", descripcion: "Analizamos tu perfil financiero y tu capacidad de pago." },
  { numero: 2, icono: Landmark, titulo: "Comparamos por ti", descripcion: "Buscamos las mejores condiciones entre varios bancos." },
  { numero: 3, icono: FileCheck, titulo: "Gestionamos el proceso", descripcion: "Nos encargamos de la radicación y el seguimiento." },
  { numero: 4, icono: CircleCheck, titulo: "Aprobación", descripcion: "Te guiamos hasta obtener la aprobación de tu crédito." },
  { numero: 5, icono: Home, titulo: "Desembolso", descripcion: "Recibes tu crédito y te acercas al hogar que sueñas." },
];

// Barra inferior de valores
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
  "Banco de Occidente": "logo-occidente",
  "Itaú": "logo-itau",
  "Credifamilia": "logo-credifamilia",
};

// Muestra el logo oficial desde logoUrl (Wikimedia) o desde /logos/; si falla, usa el estilo corporativo
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

  // Vista exclusiva cuando el usuario hace clic en "Servicios" en el Navbar o en "Conoce nuestros servicios"
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

  // Vista de Inicio (Sin "Nuestros Servicios", con "¿Cómo te ayudamos?" a ancho completo)
  return (
    <section className="secciones-inicio">
      <div className="secciones-contenedor">
        {/* 1. ¿Cómo te ayudamos? (ancho completo) */}
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

        {/* 2. Carrusel infinito de bancos aliados */}
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

        {/* 3. Aprende con Vivienco (Redirige a Educación Financiera) */}
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

      {/* 4. Barra inferior de valores */}
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

// Tarjetas detalladas para la pestaña "Bancos Aliados"
export function TarjetasBancosAliados() {
  return (
    <section className="bancos-detalle">
      <div className="bancos-detalle__interior">
        <header className="bancos-detalle__encabezado">
          <h2 className="bancos-detalle__titulo">Nuestros Bancos Aliados</h2>
          <p className="bancos-detalle__subtitulo">
            Trabajamos con las principales entidades financieras del país para conseguirte la mejor opción de crédito hipotecario o leasing habitacional.
          </p>
        </header>

        <div className="bancos-detalle__rejilla">
          {bancosAliados.map((banco) => (
            <article className="tarjeta-banco-detalle" key={banco.id}>
              <div className="tarjeta-banco-detalle__logo">
                <LogoBanco banco={banco} />
              </div>

              <h3 className="tarjeta-banco-detalle__nombre">{banco.nombre}</h3>

              <p className="tarjeta-banco-detalle__tasa">
                <span className="tarjeta-banco-detalle__tasa-valor">
                  {Number(banco.tasaEA).toFixed(2)}% E.A.
                </span>
                <span className="tarjeta-banco-detalle__tasa-etiqueta">Tasa de referencia</span>
              </p>

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
          ))}
        </div>

        <p className="bancos-detalle__aviso">
          Tasas de referencia sujetas a estudio de crédito y políticas vigentes de cada entidad.
        </p>
      </div>
    </section>
  );
}

export default SeccionesInicio;
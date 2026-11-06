import {
  BarChart3,
  Landmark,
  Users,
  BookOpen,
  Home,
  CircleDollarSign,
  User,
  FileCheck,
  CircleCheck,
  Tag,
  ShieldCheck,
  Headset,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import "./SeccionesInicio.css";

// Datos de las tarjetas de servicios
const listaServicios = [
  { id: 1, icono: BarChart3, titulo: "Estudio de crédito", descripcion: "Analizamos tu perfil financiero y capacidad de endeudamiento." },
  { id: 2, icono: Landmark, titulo: "Comparación de bancos", descripcion: "Buscamos las mejores opciones para ti." },
  { id: 3, icono: Users, titulo: "Acompañamiento completo", descripcion: "Desde la documentación hasta el desembolso." },
  { id: 4, icono: BookOpen, titulo: "Educación financiera", descripcion: "Aprende y toma mejores decisiones." },
  { id: 5, icono: Home, titulo: "Subsidios de vivienda", descripcion: "Te informamos sobre los subsidios disponibles." },
  { id: 6, icono: CircleDollarSign, titulo: "Compra de cartera", descripcion: "Mejoramos las condiciones de tu crédito actual." },
];

// Pasos de la línea de tiempo "¿Cómo te ayudamos?"
const listaPasos = [
  { numero: 1, icono: User, titulo: "Estudio de crédito", descripcion: "Analizamos tu perfil financiero." },
  { numero: 2, icono: Landmark, titulo: "Comparamos por ti", descripcion: "Buscamos entre varios bancos." },
  { numero: 3, icono: FileCheck, titulo: "Gestionamos el proceso", descripcion: "Radicación y seguimiento." },
  { numero: 4, icono: CircleCheck, titulo: "Aprobación", descripcion: "Te guiamos hasta obtener la aprobación." },
  { numero: 5, icono: Home, titulo: "Desembolso", descripcion: "Recibes tu crédito y te acercas al hogar que sueñas." },
];

// Bancos aliados: cada uno lleva su clase para imitar el logo con texto
const listaBancos = [
  { id: "avvillas", nombre: "AV Villas", clase: "banco-avvillas" },
  { id: "bancolombia", nombre: "Bancolombia", clase: "banco-bancolombia" },
  { id: "bogota", nombre: "Banco de Bogotá", clase: "banco-bogota" },
  { id: "occidente", nombre: "Banco de Occidente", clase: "banco-occidente" },
  { id: "itau", nombre: "Itaú", clase: "banco-itau" },
  { id: "credifamilia", nombre: "Credifamilia", clase: "banco-credifamilia" },
  { id: "cajasocial", nombre: "Banco Caja Social", clase: "banco-cajasocial" },
];

// Barra inferior de valores
const listaValores = [
  { id: 1, icono: Tag, titulo: "100% gratuito", descripcion: "El estudio y acompañamiento no tienen costo para ti." },
  { id: 2, icono: ShieldCheck, titulo: "Transparencia", descripcion: "Te explicamos cada paso con claridad." },
  { id: 3, icono: Users, titulo: "Confianza", descripcion: "Trabajamos para encontrar la mejor opción para ti." },
  { id: 4, icono: Headset, titulo: "Cercanía", descripcion: "Estamos contigo en cada etapa del proceso." },
];

// Ilustración sencilla del portátil con la planta
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

function SeccionesInicio() {
  return (
    <section className="secciones-inicio">
      <div className="secciones-contenedor">
        {/* ===== Fila superior: servicios + pasos ===== */}
        <div className="fila-superior">
          <div className="bloque-servicios">
            <h2 className="titulo-bloque">NUESTROS SERVICIOS</h2>
            <div className="rejilla-servicios">
              {listaServicios.map(({ id, icono: Icono, titulo, descripcion }) => (
                <article className="tarjeta-servicio" key={id}>
                  <Icono className="tarjeta-servicio__icono" strokeWidth={1.5} />
                  <h3 className="tarjeta-servicio__titulo">{titulo}</h3>
                  <p className="tarjeta-servicio__texto">{descripcion}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="bloque-pasos">
            <h2 className="titulo-bloque">¿CÓMO TE AYUDAMOS?</h2>
            <ol className="linea-pasos">
              {listaPasos.map(({ numero, icono: Icono, titulo, descripcion }) => (
                <li className="paso" key={numero}>
                  <span className="paso__circulo">
                    <Icono size={24} strokeWidth={1.6} />
                  </span>
                  <span className="paso__numero">{numero}</span>
                  <h3 className="paso__titulo">{titulo}</h3>
                  <p className="paso__texto">{descripcion}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ===== Fila media: bancos aliados + aprende ===== */}
        <div className="fila-media">
          <div className="bloque-bancos">
            <h2 className="titulo-bancos">
              BANCOS
              <br />
              ALIADOS
            </h2>
            <ul className="lista-bancos">
              {listaBancos.map(({ id, nombre, clase }) => (
                <li className={`recuadro-banco ${clase}`} key={id}>
                  {nombre}
                </li>
              ))}
            </ul>
          </div>

          <div className="bloque-aprende">
            <div className="aprende-texto">
              <h2 className="aprende-titulo">APRENDE CON VIVIENCO</h2>
              <p className="aprende-descripcion">
                Accede a artículos, guías y consejos para mejorar tus finanzas y entender todo sobre
                créditos hipotecarios.
              </p>
              <a className="aprende-enlace" href="/educacion-financiera">
                Ir a educación financiera <ArrowRight size={14} />
              </a>
            </div>
            <IlustracionPortatil />
          </div>
        </div>
      </div>

      {/* ===== Barra inferior de valores ===== */}
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

      {/* ===== Burbuja flotante de ayuda ===== */}
      <button className="burbuja-ayuda" type="button" aria-label="Abrir chat de ayuda">
        <span className="burbuja-ayuda__texto">¿En qué podemos ayudarte?</span>
        <span className="burbuja-ayuda__boton">
          <MessageCircle size={26} strokeWidth={1.8} />
          <span className="burbuja-ayuda__punto">1</span>
        </span>
      </button>
    </section>
  );
}

export default SeccionesInicio;

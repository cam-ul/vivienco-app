import { useState, useMemo } from "react";
import {
  bancosAliados,
  configuracionLegalTasas,
  educacionFinanciera,
  subsidios,
  articulosBlog,
} from "../data/datosVivienco";
import "./SeccionesContenido.css";

const SMMLV_2026 = 1750905;
const plazosDisponibles = [15, 20, 30];

const modalidadesSimulador = [
  { id: "hipotecario", etiqueta: "Crédito hipotecario" },
  { id: "leasing", etiqueta: "Leasing habitacional" },
  { id: "compraCartera", etiqueta: "Compra de cartera" },
  { id: "remodelacion", etiqueta: "Remodelación" },
];

const formatearPesos = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

// Fórmula para calcular la cuota mensual fija en pesos
function calcularCuotaMensual(montoPrestamo, tasaEA, plazoAnios) {
  const tasaMensual = Math.pow(1 + tasaEA, 1 / 12) - 1;
  const totalCuotas = plazoAnios * 12;
  return (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -totalCuotas));
}

const topesVivienda = [
  {
    id: "vip",
    nombre: "VIP (Vivienda de Interés Prioritario)",
    smmlv: 90,
    nota: "Dirigida a hogares con menores ingresos.",
  },
  {
    id: "vis",
    nombre: "VIS (Tope general nacional)",
    smmlv: 135,
    nota: "Aplica en municipios estándar del país.",
  },
  {
    id: "vis-ciudades",
    nombre: "VIS en grandes ciudades y aglomeraciones",
    smmlv: 150,
    nota: "Aplica en ciudades y áreas metropolitanas de más de 500 mil habitantes.",
  },
];

function SeccionesContenido({ seccionActiva, cambiarSeccion }) {
  const [valorVivienda, setValorVivienda] = useState(250000000);
  const [plazoAnios, setPlazoAnios] = useState(20);
  const [modalidad, setModalidad] = useState("hipotecario");
  const [tipoVivienda, setTipoVivienda] = useState("noVis");
  const [categoriaEducacion, setCategoriaEducacion] = useState("Todas");
  const [categoriaBlog, setCategoriaBlog] = useState("Todas");
  const [lecturaActiva, setLecturaActiva] = useState(null);

  const porcentajeFinanciado = tipoVivienda === "vis" ? 0.8 : 0.7;

  const irAContacto = () => {
    setLecturaActiva(null);
    if (cambiarSeccion) {
      cambiarSeccion("contacto");
    }
  };

  // Filtra los bancos que sí ofrecen esa modalidad y tipo de vivienda, y calcula la cuota estimada desde
  const resultadosBancos = useMemo(() => {
    const monto = Number(valorVivienda) * porcentajeFinanciado;
    if (!monto || monto <= 0) return [];

    return bancosAliados
      .map((banco) => {
        const tasasModalidad = banco.tasas?.[modalidad];
        const rango =
          tasasModalidad?.[tipoVivienda] ??
          (tipoVivienda === "vis" ? tasasModalidad?.VIS : tasasModalidad?.noVIS) ??
          null;

        if (!rango || typeof rango.desde !== "number") {
          return null;
        }

        const desdePorcentaje = Number(rango.desde);
        const hastaPorcentaje = Number(rango.hasta ?? rango.desde);
        const tasaDecimal = desdePorcentaje > 1 ? desdePorcentaje / 100 : desdePorcentaje;

        return {
          ...banco,
          desdeMostrado: desdePorcentaje,
          hastaMostrado: hastaPorcentaje,
          cuota: calcularCuotaMensual(monto, tasaDecimal, plazoAnios),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.cuota - b.cuota);
  }, [valorVivienda, plazoAnios, modalidad, tipoVivienda, porcentajeFinanciado]);

  const categoriasEducacion = useMemo(() => {
    const unicas = new Set(educacionFinanciera.map((item) => item.categoria));
    return ["Todas", ...Array.from(unicas)];
  }, []);

  const educacionFiltrada = useMemo(() => {
    if (categoriaEducacion === "Todas") return educacionFinanciera;
    return educacionFinanciera.filter((item) => item.categoria === categoriaEducacion);
  }, [categoriaEducacion]);

  const categoriasBlog = useMemo(() => {
    const unicas = new Set(articulosBlog.map((item) => item.categoria));
    return ["Todas", ...Array.from(unicas)];
  }, []);

  const blogFiltrado = useMemo(() => {
    if (categoriaBlog === "Todas") return articulosBlog;
    return articulosBlog.filter((item) => item.categoria === categoriaBlog);
  }, [categoriaBlog]);

  return (
    <div className="contenido">
      {/* Simulador de cuotas por modalidad y banco aliado */}
      {seccionActiva === "bancos" && (
        <section className="seccion-contenido seccion--blanca" id="bancos">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">
                Compara la cuota en nuestros bancos aliados
              </h2>
              <p className="seccion-encabezado__texto">
                Elige la modalidad, el tipo de vivienda y el plazo. Calculamos una cuota mensual
                estimada desde la tasa mínima referencial financiando el{" "}
                {Math.round(porcentajeFinanciado * 100)}% del inmueble (
                {formatearPesos(Number(valorVivienda) * porcentajeFinanciado)}).
              </p>
            </header>

            <div className="simulador">
              <label className="simulador__campo">
                <span className="simulador__etiqueta">Valor de la vivienda (COP)</span>
                <input
                  className="simulador__entrada"
                  type="number"
                  min="0"
                  step="5000000"
                  value={valorVivienda}
                  onChange={(e) => setValorVivienda(e.target.value)}
                />
              </label>

              <div className="simulador__campo" role="group" aria-label="Modalidad de financiación">
                <span className="simulador__etiqueta">Modalidad</span>
                <div className="plazos plazos--envolver">
                  {modalidadesSimulador.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`plazos__boton ${
                        modalidad === item.id ? "plazos__boton--activo" : ""
                      }`}
                      aria-pressed={modalidad === item.id}
                      onClick={() => setModalidad(item.id)}
                    >
                      {item.etiqueta}
                    </button>
                  ))}
                </div>
              </div>

              <div className="simulador__campo" role="group" aria-label="Tipo de vivienda">
                <span className="simulador__etiqueta">Tipo de vivienda y financiación</span>
                <div className="plazos">
                  <button
                    type="button"
                    className={`plazos__boton ${
                      tipoVivienda === "noVis" ? "plazos__boton--activo" : ""
                    }`}
                    aria-pressed={tipoVivienda === "noVis"}
                    onClick={() => setTipoVivienda("noVis")}
                  >
                    No VIS (70% financiación)
                  </button>
                  <button
                    type="button"
                    className={`plazos__boton ${
                      tipoVivienda === "vis" ? "plazos__boton--activo" : ""
                    }`}
                    aria-pressed={tipoVivienda === "vis"}
                    onClick={() => setTipoVivienda("vis")}
                  >
                    VIS (80% financiación)
                  </button>
                </div>
              </div>

              <div className="simulador__campo" role="group" aria-label="Plazo en años">
                <span className="simulador__etiqueta">Plazo en años</span>
                <div className="plazos">
                  {plazosDisponibles.map((plazo) => (
                    <button
                      key={plazo}
                      type="button"
                      className={`plazos__boton ${
                        plazoAnios === plazo ? "plazos__boton--activo" : ""
                      }`}
                      aria-pressed={plazoAnios === plazo}
                      onClick={() => setPlazoAnios(plazo)}
                    >
                      {plazo} años
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {resultadosBancos.length === 0 ? (
              <p className="simulador__vacio">
                Ingresa un valor mayor a cero o cambia la modalidad para ver los bancos disponibles.
              </p>
            ) : (
              <div className="rejilla-bancos">
                {resultadosBancos.map((banco, posicion) => {
                  const esMejor = posicion === 0;
                  return (
                    <article
                      className={`tarjeta-banco ${esMejor ? "tarjeta-banco--mejor" : ""}`}
                      key={banco.id ?? banco.nombre}
                    >
                      {esMejor && <span className="tarjeta-banco__sello">Menor cuota</span>}
                      <h3 className="tarjeta-banco__nombre">{banco.nombre}</h3>
                      <p className="tarjeta-banco__tasa">
                        Desde {banco.desdeMostrado.toFixed(2)}% hasta{" "}
                        {banco.hastaMostrado.toFixed(2)}% E.A.
                      </p>
                      <span className="tarjeta-banco__subtitulo-cuota">Cuota estimada desde</span>
                      <p className="tarjeta-banco__cuota">{formatearPesos(banco.cuota)}</p>
                      <p className="tarjeta-banco__nota">
                        Proyección referencial mensual (sin seguros)
                      </p>
                      <p className="tarjeta-banco__detalles">
                        Financiación {Math.round(porcentajeFinanciado * 100)}% (
                        {tipoVivienda === "vis" ? "VIS" : "No VIS"}) · Plazo {plazoAnios} años
                      </p>
                      <button
                        type="button"
                        className="articulo__boton"
                        style={{ marginTop: "14px", width: "100%" }}
                        onClick={irAContacto}
                      >
                        Solicitar estudio en {banco.nombre}
                      </button>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="aviso-legal-tasas" role="note">
              <p className="aviso-legal-tasas__corto">{configuracionLegalTasas.avisoCorto}</p>
              <p className="aviso-legal-tasas__texto">
                {configuracionLegalTasas.avisoLegalCompleto}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sección de guías de educación financiera */}
      {seccionActiva === "educacion" && (
        <section className="seccion-contenido seccion--fondo" id="educacion">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">Educación financiera hipotecaria</h2>
              <p className="seccion-encabezado__texto">
                Haz clic en cualquier guía para abrir la explicación detallada, ejemplos prácticos
                en pesos colombianos y recomendaciones de nuestros especialistas.
              </p>
            </header>

            <div className="filtros-categorias">
              {categoriasEducacion.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filtro-btn ${categoriaEducacion === cat ? "filtro-btn--activo" : ""}`}
                  onClick={() => setCategoriaEducacion(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="rejilla-tres">
              {educacionFiltrada.map((item) => (
                <article
                  className="tarjeta-educacion"
                  key={item.id}
                  onClick={() => setLecturaActiva(item)}
                >
                  <div className="tarjeta-meta">
                    <span className="etiqueta">{item.categoria}</span>
                    {item.tiempoLectura && (
                      <span className="tiempo-lectura">Lectura: {item.tiempoLectura}</span>
                    )}
                  </div>
                  <h3 className="tarjeta-educacion__titulo">{item.titulo}</h3>
                  <p className="tarjeta-educacion__texto">{item.descripcion}</p>

                  {item.puntosClave && (
                    <ul className="lista-puntos-clave">
                      {item.puntosClave.map((punto, idx) => (
                        <li key={idx}>{punto}</li>
                      ))}
                    </ul>
                  )}

                  <button
                    type="button"
                    className="articulo__boton"
                    style={{ marginTop: "16px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLecturaActiva(item);
                    }}
                  >
                    Leer guía completa &rarr;
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de subsidios y topes de vivienda */}
      {seccionActiva === "subsidios" && (
        <section className="seccion-contenido seccion--blanca" id="subsidios">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">Subsidios y coberturas de vivienda</h2>
              <p className="seccion-encabezado__texto">
                Conoce los programas de Cajas de Compensación, concurrencia y estado actual de las
                convocatorias nacionales en Colombia.
              </p>
            </header>

            <div className="rejilla-subsidios">
              {subsidios.map((item) => (
                <article className="bloque-subsidio" key={item.id}>
                  <div className="tarjeta-meta">
                    <span className="etiqueta">{item.categoria}</span>
                    <span className="estado-subsidio">{item.estado}</span>
                  </div>
                  <h3 className="bloque-subsidio__titulo">{item.titulo}</h3>
                  <p className="bloque-subsidio__texto">{item.descripcion}</p>

                  {item.puntosClave && (
                    <ul className="lista-puntos-clave">
                      {item.puntosClave.map((punto, idx) => (
                        <li key={idx}>{punto}</li>
                      ))}
                    </ul>
                  )}

                  {item.notaImportante && (
                    <p className="tarjeta-educacion__consejo">{item.notaImportante}</p>
                  )}

                  {item.fuenteUrl && (
                    <a
                      href={item.fuenteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="enlace-fuente"
                    >
                      Consultar fuente oficial &rarr;
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="topes">
              <h3 className="topes__titulo">Topes de precio de vivienda VIS y VIP (2026)</h3>
              <ul className="topes__lista">
                {topesVivienda.map((tope) => (
                  <li className="tope" key={tope.id}>
                    <p className="tope__nombre">{tope.nombre}</p>
                    <p className="tope__valor">{tope.smmlv} SMMLV</p>
                    <p className="tope__pesos">≈ {formatearPesos(tope.smmlv * SMMLV_2026)}</p>
                    <p className="tope__nota">{tope.nota}</p>
                  </li>
                ))}
              </ul>
              <p className="aviso">
                Calculado con un SMMLV 2026 de {formatearPesos(SMMLV_2026)}. Los montos, requisitos
                y disponibilidad dependen de cada entidad otorgante.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sección de artículos del blog */}
      {seccionActiva === "blog" && (
        <section className="seccion-contenido seccion--fondo" id="blog">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">Blog y guías hipotecarias</h2>
              <p className="seccion-encabezado__texto">
                Artículos prácticos con casos reales en pesos colombianos para planear tu compra de
                vivienda paso a paso.
              </p>
            </header>

            <div className="filtros-categorias">
              {categoriasBlog.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filtro-btn ${categoriaBlog === cat ? "filtro-btn--activo" : ""}`}
                  onClick={() => setCategoriaBlog(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="rejilla-tres">
              {blogFiltrado.map((articulo) => (
                <article
                  className="articulo"
                  key={articulo.id}
                  onClick={() => setLecturaActiva(articulo)}
                >
                  <div className="tarjeta-meta">
                    <span className="etiqueta">{articulo.categoria}</span>
                    {articulo.tiempoLectura && (
                      <span className="tiempo-lectura">Lectura: {articulo.tiempoLectura}</span>
                    )}
                  </div>
                  <h3 className="articulo__titulo">{articulo.titulo}</h3>
                  <p className="articulo__resumen">{articulo.descripcion}</p>

                  {articulo.puntosClave && (
                    <ul className="lista-puntos-clave">
                      {articulo.puntosClave.map((punto, idx) => (
                        <li key={idx}>{punto}</li>
                      ))}
                    </ul>
                  )}

                  <button
                    type="button"
                    className="articulo__boton"
                    style={{ marginTop: "16px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLecturaActiva(articulo);
                    }}
                  >
                    Leer artículo completo &rarr;
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ventana emergente para leer el artículo completo */}
      {lecturaActiva && (
        <div
          className="modal-lectura-overlay"
          onClick={() => setLecturaActiva(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-lectura-caja"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-lectura-cerrar"
              onClick={() => setLecturaActiva(null)}
              aria-label="Cerrar lectura"
            >
              &times;
            </button>

            <span className="modal-lectura-etiqueta">
              {lecturaActiva.categoria}{" "}
              {lecturaActiva.tiempoLectura ? `· ${lecturaActiva.tiempoLectura}` : ""}
            </span>

            <h3 className="modal-lectura-titulo">{lecturaActiva.titulo}</h3>

            <div className="modal-lectura-cuerpo">
              {Array.isArray(lecturaActiva.contenidoDetallado) ? (
                lecturaActiva.contenidoDetallado.map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))
              ) : (
                <p>{lecturaActiva.descripcion}</p>
              )}

              {lecturaActiva.ejemploPractico && (
                <div
                  style={{
                    background: "#F8F6F0",
                    borderLeft: "4px solid #D4AF37",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    margin: "18px 0",
                  }}
                >
                  <strong style={{ color: "#0B3B36", display: "block", marginBottom: "4px" }}>
                    Ejemplo práctico en Colombia:
                  </strong>
                  <span>{lecturaActiva.ejemploPractico}</span>
                </div>
              )}

              {lecturaActiva.consejoExperto && (
                <div
                  style={{
                    background: "rgba(11, 59, 54, 0.06)",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    marginTop: "14px",
                  }}
                >
                  <strong style={{ color: "#0B3B36", display: "block", marginBottom: "4px" }}>
                    Consejo de nuestros especialistas:
                  </strong>
                  <span>{lecturaActiva.consejoExperto}</span>
                </div>
              )}
            </div>

            <div className="modal-lectura-pie">
              <button
                type="button"
                className="modal-lectura-boton"
                onClick={irAContacto}
              >
                Solicitar asesoría gratuita &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeccionesContenido;

import { useState, useMemo } from "react";
import {
  bancosAliados,
  educacionFinanciera,
  subsidios,
  articulosBlog,
} from "../data/datosVivienco";
import "./SeccionesContenido.css";

const SMMLV_2026 = 1750905;
const plazosDisponibles = [15, 20, 30];

const formatearPesos = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

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
  const [porcentajeFinanciado, setPorcentajeFinanciado] = useState(0.7);
  const [categoriaEducacion, setCategoriaEducacion] = useState("Todas");
  const [categoriaBlog, setCategoriaBlog] = useState("Todas");
  const [articuloAbierto, setArticuloAbierto] = useState(null);

  const irAContacto = () => {
    if (cambiarSeccion) {
      cambiarSeccion("contacto");
    }
  };

  // Calcula la cuota de cada banco y los ordena de menor a mayor cuota
  const resultadosBancos = useMemo(() => {
    const monto = Number(valorVivienda) * porcentajeFinanciado;
    if (!monto || monto <= 0) return [];

    return bancosAliados
      .map((banco) => {
        const tasa = banco.tasaEA > 1 ? banco.tasaEA / 100 : banco.tasaEA;
        return {
          ...banco,
          tasaMostrada: tasa * 100,
          cuota: calcularCuotaMensual(monto, tasa, plazoAnios),
        };
      })
      .sort((a, b) => a.cuota - b.cuota);
  }, [valorVivienda, plazoAnios, porcentajeFinanciado]);

  // Categorías dinámicas para filtrar Educación Financiera y Blog
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

  const alternarArticulo = (id) => {
    setArticuloAbierto((actual) => (actual === id ? null : id));
  };

  return (
    <div className="contenido">
      {/* ===== 1. Simulador y comparador de Bancos Aliados ===== */}
      {seccionActiva === "bancos" && (
        <section className="seccion-contenido seccion--blanca" id="bancos">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">
                Compara la cuota en nuestros bancos aliados
              </h2>
              <p className="seccion-encabezado__texto">
                Ingresa el valor de la vivienda y elige el plazo. Calculamos una cuota mensual
                aproximada financiando el {Math.round(porcentajeFinanciado * 100)}% del inmueble (
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

              <div className="simulador__campo" role="group" aria-label="Porcentaje a financiar">
                <span className="simulador__etiqueta">Tipo de financiación</span>
                <div className="plazos">
                  <button
                    type="button"
                    className={`plazos__boton ${porcentajeFinanciado === 0.7 ? "plazos__boton--activo" : ""
                      }`}
                    onClick={() => setPorcentajeFinanciado(0.7)}
                  >
                    70% (No VIS)
                  </button>
                  <button
                    type="button"
                    className={`plazos__boton ${porcentajeFinanciado === 0.8 ? "plazos__boton--activo" : ""
                      }`}
                    onClick={() => setPorcentajeFinanciado(0.8)}
                  >
                    80% (VIS)
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
                      className={`plazos__boton ${plazoAnios === plazo ? "plazos__boton--activo" : ""
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
                Ingresa un valor de vivienda mayor a cero para ver la comparación.
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
                        Tasa ref: {banco.tasaMostrada.toFixed(2)}% E.A.
                      </p>
                      <p className="tarjeta-banco__cuota">{formatearPesos(banco.cuota)}</p>
                      <p className="tarjeta-banco__nota">cuota mensual aprox. (sin seguros)</p>
                      <p className="tarjeta-banco__descripcion">{banco.descripcion}</p>
                      <p className="tarjeta-banco__detalles">
                        {banco.financiacionMax || `VIS hasta ${banco.financiacionVIS}%`} ·{" "}
                        {banco.plazoMax || `Plazo máx. ${banco.plazoMaximoAnios} años`}
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

            <p className="aviso">
              Valores de referencia calculados en sistema de amortización en pesos (cuota fija). La
              aprobación y tasa definitiva dependen del estudio de crédito de cada entidad.
            </p>
          </div>
        </section>
      )}

      {/* ===== 2. Educación Financiera ===== */}
      {seccionActiva === "educacion" && (
        <section className="seccion-contenido seccion--fondo" id="educacion">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">Educación financiera hipotecaria</h2>
              <p className="seccion-encabezado__texto">
                Domina los conceptos clave de tasas, sistemas de amortización, leasing y planeación
                financiera antes de firmar tu crédito de vivienda.
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
                <article className="tarjeta-educacion" key={item.id}>
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
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 3. Subsidios de Vivienda ===== */}
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

      {/* ===== 4. Blog y Guías ===== */}
      {seccionActiva === "blog" && (
        <section className="seccion-contenido seccion--fondo" id="blog">
          <div className="seccion-contenido__interior">
            <header className="seccion-encabezado">
              <h2 className="seccion-encabezado__titulo">Blog y guías hipotecarias</h2>
              <p className="seccion-encabezado__texto">
                Artículos prácticos para planear tu cuota inicial, reunir documentos y comprar
                vivienda en Colombia o desde el exterior.
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
              {blogFiltrado.map((articulo) => {
                const abierto = articuloAbierto === articulo.id;
                return (
                  <article className="articulo" key={articulo.id}>
                    <div className="tarjeta-meta">
                      <span className="etiqueta">{articulo.categoria}</span>
                      {articulo.tiempoLectura && (
                        <span className="tiempo-lectura">{articulo.tiempoLectura}</span>
                      )}
                    </div>
                    <h3 className="articulo__titulo">{articulo.titulo}</h3>
                    <p className="articulo__resumen">{articulo.descripcion}</p>

                    {abierto && articulo.puntosClave && (
                      <div className="articulo__contenido">
                        <strong>Puntos clave de esta guía:</strong>
                        <ul className="lista-puntos-clave">
                          {articulo.puntosClave.map((punto, idx) => (
                            <li key={idx}>{punto}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      type="button"
                      className="articulo__boton"
                      aria-expanded={abierto}
                      onClick={() => alternarArticulo(articulo.id)}
                    >
                      {abierto ? "Ocultar puntos clave" : "Ver puntos clave"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default SeccionesContenido;
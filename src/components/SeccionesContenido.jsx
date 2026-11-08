import { useState, useMemo } from "react";
import { bancosAliados } from "../data/datosVivienco";
import "./SeccionesContenido.css";

// ---------- Constantes fáciles de actualizar ----------
const SMMLV_2026 = 1750905; // salario mínimo 2026 sin auxilio de transporte
const PORCENTAJE_FINANCIADO = 0.7; // se asume que el banco financia el 70%
const plazosDisponibles = [15, 20, 30];

const formatearPesos = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

// Cuota fija mensual (sistema francés) con tasa efectiva anual
function calcularCuotaMensual(montoPrestamo, tasaEA, plazoAnios) {
  const tasaMensual = Math.pow(1 + tasaEA, 1 / 12) - 1;
  const totalCuotas = plazoAnios * 12;
  return (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -totalCuotas));
}

// ---------- Datos de contenido ----------
const tarjetasEducacion = [
  {
    id: 1,
    etiqueta: "Tipo de crédito",
    titulo: "Pesos vs. UVR",
    texto:
      "En pesos la cuota es fija durante todo el plazo, así que sabes exactamente cuánto pagarás cada mes. En UVR la cuota empieza más baja, pero el saldo se ajusta con la inflación y la cuota puede subir con el tiempo.",
    consejo: "Si tu ingreso es estable y quieres tranquilidad, el crédito en pesos suele ser más predecible.",
  },
  {
    id: 2,
    etiqueta: "Capacidad de pago",
    titulo: "Cómo calcular tu capacidad de endeudamiento",
    texto:
      "Los bancos suelen aprobar una cuota que no supere entre el 30% y el 40% de tus ingresos mensuales. Multiplica tus ingresos por 0,30 y por 0,40: ese rango es la cuota máxima aproximada que podrías asumir.",
    consejo: "Ejemplo: con ingresos de $5.000.000, tu cuota máxima estaría entre $1.500.000 y $2.000.000.",
  },
  {
    id: 3,
    etiqueta: "Historial crediticio",
    titulo: "Mejora tu puntaje antes de radicar",
    texto:
      "Paga a tiempo todas tus obligaciones, reduce el uso de tus tarjetas por debajo de la mitad del cupo, evita abrir créditos nuevos justo antes de radicar y revisa tu reporte en las centrales de riesgo para corregir errores.",
    consejo: "Empieza a ordenar tu historial al menos 3 a 6 meses antes de solicitar el crédito.",
  },
];

const bloquesSubsidios = [
  {
    id: 1,
    titulo: "Subsidio de Caja de Compensación Familiar",
    monto: "Hasta 30 SMMLV",
    texto:
      "Es un aporte que no se devuelve para la cuota inicial o el pago de la vivienda. Necesitas estar afiliado a una caja de compensación y cumplir con los requisitos de ingresos del hogar.",
  },
  {
    id: 2,
    titulo: "Subsidio concurrente",
    monto: "Hasta 50 SMMLV",
    texto:
      "Se suma el subsidio de la caja de compensación con el del Gobierno Nacional. Depende de que haya convocatoria abierta y recursos disponibles.",
  },
];

const topesVivienda = [
  { id: "vip", nombre: "VIP (interés prioritario)", smmlv: 90, nota: "Para los hogares con menores ingresos." },
  { id: "vis", nombre: "VIS (interés social)", smmlv: 135, nota: "Tope general en el país." },
  { id: "vis-ciudades", nombre: "VIS en ciudades grandes", smmlv: 150, nota: "Aplica en ciudades de más de 500 mil habitantes." },
];

const articulosBlog = [
  {
    id: 1,
    categoria: "Crédito hipotecario",
    titulo: "Qué documentos reunir antes de pedir tu crédito",
    resumen: "Llegar con la carpeta lista acelera el estudio y evita devoluciones.",
    contenido:
      "Antes de radicar, reúne tu cédula, los soportes de ingresos (certificado laboral, colillas de pago o declaración de renta si eres independiente), extractos bancarios recientes y el certificado de tradición del inmueble. Revisa que todos estén vigentes y legibles. Un solo documento vencido puede retrasar semanas la aprobación.",
  },
  {
    id: 2,
    categoria: "Ahorro",
    titulo: "Cuánto debes ahorrar para la cuota inicial",
    resumen: "Conoce el porcentaje que no financia el banco y cómo juntarlo.",
    contenido:
      "Por lo general el banco financia hasta cerca del 70% del valor de la vivienda, por lo que necesitas ahorrar el resto, más gastos de escrituración y registro. Define una meta mensual, automatiza el ahorro el día que recibes tu ingreso y considera cuentas como el ahorro programado o las cuentas AFC, que pueden darte beneficios.",
  },
  {
    id: 3,
    categoria: "Subsidios",
    titulo: "Cómo saber si calificas para un subsidio",
    resumen: "Tres preguntas rápidas para saber por dónde empezar.",
    contenido:
      "Pregúntate: ¿mis ingresos del hogar están dentro del rango permitido?, ¿estoy afiliado a una caja de compensación?, ¿la vivienda que quiero comprar es VIS o VIP? Si respondes que sí, pide a tu caja el estado de tu postulación y confirma las condiciones vigentes, porque los montos y convocatorias cambian.",
  },
];

function SeccionesContenido() {
  const [valorVivienda, setValorVivienda] = useState(250000000);
  const [plazoAnios, setPlazoAnios] = useState(20);
  const [articuloAbierto, setArticuloAbierto] = useState(null);

  // Calcula la cuota de cada banco y los ordena de menor a mayor
  const resultadosBancos = useMemo(() => {
    const monto = Number(valorVivienda) * PORCENTAJE_FINANCIADO;
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
  }, [valorVivienda, plazoAnios]);

  const alternarArticulo = (id) => {
    setArticuloAbierto((actual) => (actual === id ? null : id));
  };

  return (
    <div className="contenido">
      {/* ===== 1. Simulador y comparador de bancos ===== */}
      <section className="seccion-contenido seccion--blanca" id="bancos">
        <div className="seccion-contenido__interior">
          <header className="seccion-encabezado">
            <h2 className="seccion-encabezado__titulo">Compara la cuota en nuestros bancos aliados</h2>
            <p className="seccion-encabezado__texto">
              Ingresa el valor de la vivienda y el plazo. Calculamos una cuota mensual aproximada
              financiando el {PORCENTAJE_FINANCIADO * 100}% del valor.
            </p>
          </header>

          <div className="simulador">
            <label className="simulador__campo">
              <span className="simulador__etiqueta">Valor de la vivienda</span>
              <input
                className="simulador__entrada"
                type="number"
                min="0"
                step="1000000"
                value={valorVivienda}
                onChange={(e) => setValorVivienda(e.target.value)}
              />
            </label>

            <div className="simulador__campo" role="group" aria-label="Plazo en años">
              <span className="simulador__etiqueta">Plazo en años</span>
              <div className="plazos">
                {plazosDisponibles.map((plazo) => (
                  <button
                    key={plazo}
                    type="button"
                    className={`plazos__boton ${plazoAnios === plazo ? "plazos__boton--activo" : ""}`}
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
            <p className="simulador__vacio">Ingresa un valor de vivienda mayor a cero para ver la comparación.</p>
          ) : (
            <div className="rejilla-bancos">
              {resultadosBancos.map((banco, posicion) => {
                const esMejor = posicion === 0;
                return (
                  <article
                    className={`tarjeta-banco ${esMejor ? "tarjeta-banco--mejor" : ""}`}
                    key={banco.id ?? banco.nombre}
                  >
                    {esMejor && <span className="tarjeta-banco__sello">Mejor opción</span>}
                    <h3 className="tarjeta-banco__nombre">{banco.nombre}</h3>
                    <p className="tarjeta-banco__tasa">Tasa {banco.tasaMostrada.toFixed(2)}% E.A.</p>
                    <p className="tarjeta-banco__cuota">{formatearPesos(banco.cuota)}</p>
                    <p className="tarjeta-banco__nota">cuota mensual aprox.</p>
                  </article>
                );
              })}
            </div>
          )}

          <p className="aviso">
            Valores de referencia. La cuota real depende del estudio de crédito, seguros y condiciones de cada banco.
          </p>
        </div>
      </section>

      {/* ===== 2. Educación financiera ===== */}
      <section className="seccion-contenido seccion--fondo" id="educacion">
        <div className="seccion-contenido__interior">
          <header className="seccion-encabezado">
            <h2 className="seccion-encabezado__titulo">Educación financiera</h2>
            <p className="seccion-encabezado__texto">Lo esencial para decidir con claridad antes de pedir tu crédito.</p>
          </header>

          <div className="rejilla-tres">
            {tarjetasEducacion.map((tarjeta) => (
              <article className="tarjeta-educacion" key={tarjeta.id}>
                <span className="etiqueta">{tarjeta.etiqueta}</span>
                <h3 className="tarjeta-educacion__titulo">{tarjeta.titulo}</h3>
                <p className="tarjeta-educacion__texto">{tarjeta.texto}</p>
                <p className="tarjeta-educacion__consejo">{tarjeta.consejo}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Subsidios de vivienda ===== */}
      <section className="seccion-contenido seccion--blanca" id="subsidios">
        <div className="seccion-contenido__interior">
          <header className="seccion-encabezado">
            <h2 className="seccion-encabezado__titulo">Subsidios de vivienda en Colombia</h2>
            <p className="seccion-encabezado__texto">Ayudas que pueden reducir lo que necesitas ahorrar o financiar.</p>
          </header>

          <div className="rejilla-subsidios">
            {bloquesSubsidios.map((bloque) => (
              <article className="bloque-subsidio" key={bloque.id}>
                <p className="bloque-subsidio__monto">{bloque.monto}</p>
                <h3 className="bloque-subsidio__titulo">{bloque.titulo}</h3>
                <p className="bloque-subsidio__texto">{bloque.texto}</p>
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
              Calculado con un SMMLV de {formatearPesos(SMMLV_2026)}. Los montos, requisitos y convocatorias pueden
              cambiar: confirma la información vigente con tu caja de compensación o el Ministerio de Vivienda.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. Blog y guías ===== */}
      <section className="seccion-contenido seccion--fondo" id="blog">
        <div className="seccion-contenido__interior">
          <header className="seccion-encabezado">
            <h2 className="seccion-encabezado__titulo">Blog y guías recientes</h2>
            <p className="seccion-encabezado__texto">Consejos cortos para avanzar con seguridad hacia tu vivienda.</p>
          </header>

          <div className="rejilla-tres">
            {articulosBlog.map((articulo) => {
              const abierto = articuloAbierto === articulo.id;
              return (
                <article className="articulo" key={articulo.id}>
                  <span className="etiqueta">{articulo.categoria}</span>
                  <h3 className="articulo__titulo">{articulo.titulo}</h3>
                  <p className="articulo__resumen">{articulo.resumen}</p>

                  {abierto && <p className="articulo__contenido">{articulo.contenido}</p>}

                  <button
                    type="button"
                    className="articulo__boton"
                    aria-expanded={abierto}
                    onClick={() => alternarArticulo(articulo.id)}
                  >
                    {abierto ? "Cerrar guía" : "Leer guía"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SeccionesContenido;

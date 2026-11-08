import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import "./AsistenteIA.css";

const mensajesIniciales = [
    {
        emisor: "ia",
        texto: "¡Hola! Soy el Asistente con IA de Vivienco. Pregúntame quiénes pueden aplicar, simula con tu salario (ej. 'gano 4 millones'), consulta sobre deudas, leasing, subsidios VIS o tasas de nuestros 7 bancos.",
    },
];

const formatearCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(valor);

// Extrae montos en pesos cuando el usuario escribe "4 millones", "250 millones" o "3500000"
function extraerMontoCOP(texto) {
    const matchMillones = texto.match(/(\d+(?:[.,]\d+)?)\s*(millones|millon|palos|m\b)/i);
    if (matchMillones) {
        const numero = parseFloat(matchMillones[1].replace(",", "."));
        return Math.round(numero * 1000000);
    }
    const matchPesos = texto.match(/\b(\d{1,3}(?:[.,]\d{3}){2,}|\d{7,10})\b/);
    if (matchPesos) {
        const limpio = parseInt(matchPesos[1].replace(/[.,]/g, ""), 10);
        if (limpio >= 1000000) return limpio;
    }
    return null;
}

// Motor experto incorchable con cálculo matemático y 22 intenciones hipotecarias
function generarRespuestaExperta(pregunta) {
    const texto = (pregunta || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const montoDetectado = extraerMontoCOP(texto);

    // 1. Cálculo en vivo si el usuario menciona cuánto gana o sus ingresos
    if (
        montoDetectado &&
        (texto.includes("gano") ||
            texto.includes("ingreso") ||
            texto.includes("sueldo") ||
            texto.includes("salario") ||
            texto.includes("prestan") ||
            texto.includes("capacidad"))
    ) {
        const cuotaMin = Math.round(montoDetectado * 0.3);
        const cuotaMax = Math.round(montoDetectado * 0.4);
        const prestamoEstimado = Math.round(cuotaMax * 92); // Aprox. a 20 años con tasa del 10.5% E.A.
        const viviendaEstimada = Math.round(prestamoEstimado / 0.7);
        return `Con ingresos de ${formatearCOP(montoDetectado)}, los bancos aprueban una cuota mensual entre ${formatearCOP(cuotaMin)} (30%) y ${formatearCOP(cuotaMax)} (40%). Con esa capacidad, podrías financiar aprox. ${formatearCOP(prestamoEstimado)} a 20 años (para una vivienda de hasta ${formatearCOP(viviendaEstimada)}).`;
    }

    // 2. Cálculo en vivo si el usuario menciona el valor de una casa o apartamento
    if (
        montoDetectado &&
        (texto.includes("casa") ||
            texto.includes("apartamento") ||
            texto.includes("apto") ||
            texto.includes("vivienda") ||
            texto.includes("inmueble") ||
            texto.includes("vale") ||
            texto.includes("cuesta") ||
            texto.includes("cuota"))
    ) {
        const cuotaInicial = Math.round(montoDetectado * 0.3);
        const prestamo = Math.round(montoDetectado * 0.7);
        const tasaMensual = Math.pow(1 + 0.105, 1 / 12) - 1;
        const cuota20Anios = Math.round((prestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -240)));
        const ingresoRequerido = Math.round(cuota20Anios / 0.35);
        return `Para una vivienda de ${formatearCOP(montoDetectado)}: la cuota inicial (30%) sería de ${formatearCOP(cuotaInicial)} y el banco financiaría ${formatearCOP(prestamo)} (70%). Con la mejor tasa aliada (10.5% E.A. a 20 años), la cuota mensual aproximada es de ${formatearCOP(cuota20Anios)} y requerirías ingresos familiares cercanos a ${formatearCOP(ingresoRequerido)}.`;
    }

    // 3. ¿Quiénes pueden obtener un crédito hipotecario? / Perfiles y edades
    if (
        texto.includes("quien") ||
        texto.includes("pueden") ||
        texto.includes("puede obtener") ||
        texto.includes("aplicar") ||
        texto.includes("acceder") ||
        texto.includes("perfil") ||
        texto.includes("edad") ||
        texto.includes("joven") ||
        texto.includes("estudiante") ||
        texto.includes("pensionado") ||
        texto.includes("independiente") ||
        texto.includes("empleado")
    ) {
        return "Pueden obtener un crédito hipotecario las personas entre 18 y 72 años con ingresos demostrables desde 1 a 2 SMMLV: empleados (contrato indefinido, término fijo u obra labor), trabajadores independientes, prestadores de servicios, pensionados y colombianos en el exterior. También puedes unir ingresos con familiares.";
    }

    // 4. Unión de ingresos familiares
    if (
        texto.includes("unir") ||
        texto.includes("pareja") ||
        texto.includes("espos") ||
        texto.includes("novi") ||
        texto.includes("familia") ||
        texto.includes("hermano") ||
        texto.includes("papa") ||
        texto.includes("mama") ||
        texto.includes("conjunto")
    ) {
        return "¡Sí! Nuestros bancos aliados permiten unir ingresos con tu cónyuge, pareja permanente, padres, hijos o hermanos (incluso sin que todos figuren como propietarios en algunos bancos) para sumar capacidad de pago y alcanzar un monto mayor.";
    }

    // 5. Deudas, DataCrédito y centrales de riesgo
    if (
        texto.includes("deuda") ||
        texto.includes("datacredito") ||
        texto.includes("cifin") ||
        texto.includes("transunion") ||
        texto.includes("reportad") ||
        texto.includes("puntaje") ||
        texto.includes("central") ||
        texto.includes("mora") ||
        texto.includes("embargo") ||
        texto.includes("castigad")
    ) {
        return "Si tienes deudas al día, sí puedes aplicar siempre que la suma de tus cuotas actuales más la nueva cuota de vivienda no supere el 30%-40% de tus ingresos. Si estuviste reportado en mora, debes contar con el paz y salvo y, según el banco, haber superado el tiempo de permanencia.";
    }

    // 6. Leasing habitacional vs Crédito hipotecario
    if (texto.includes("leasing") || texto.includes("arriendo") || texto.includes("locatario")) {
        return "En el crédito hipotecario eres dueño desde el inicio y financias hasta el 70% (No VIS) u 80% (VIS). En el leasing habitacional el banco figura como propietario mientras pagas un canon mensual y suele financiar hasta el 80%-85% en vivienda No VIS, con opción de compra del 0% al 30% al final.";
    }

    // 7. Compra de cartera hipotecaria
    if (texto.includes("cartera") || texto.includes("otro banco") || texto.includes("bajar la tasa") || texto.includes("traslad")) {
        return "Sí realizamos compra de cartera hipotecaria. Si ya tienes un crédito de vivienda con una tasa alta, trasladamos tu saldo a uno de nuestros bancos aliados (con tasas desde 10.5% E.A.) para reducir tu cuota mensual o acortar el plazo sin costo de estudio.";
    }

    // 8. Abonos a capital y pago anticipado (Ley de Vivienda)
    if (texto.includes("abono") || texto.includes("capital") || texto.includes("adelantar") || texto.includes("multa") || texto.includes("penalidad") || texto.includes("prepago")) {
        return "En Colombia, gracias a la Ley 546 de 1999 (Ley de Vivienda), puedes hacer abonos extras a capital o pagar la totalidad del crédito en cualquier momento sin ninguna multa ni penalidad, eligiendo si deseas disminuir el plazo o bajar el valor de la cuota mensual.";
    }

    // 9. Cesantías y cuentas AFC
    if (texto.includes("cesantia") || texto.includes("afc") || texto.includes("impuesto") || texto.includes("retencion")) {
        return "Puedes usar tus cesantías acumuladas tanto para completar la cuota inicial como para hacer abonos anuales a tu crédito hipotecario. Además, canalizar el pago por una cuenta AFC te brinda beneficios tributarios al reducir tu base de retención en la fuente.";
    }

    // 10. Gastos adicionales: escrituración, avalúo, estudio de títulos y seguros
    if (
        texto.includes("escritura") ||
        texto.includes("notaria") ||
        texto.includes("avaluo") ||
        texto.includes("titulos") ||
        texto.includes("seguro") ||
        texto.includes("gastos adicionales") ||
        texto.includes("impuesto")
    ) {
        return "Además de la cuota inicial, debes contemplar: avalúo comercial y estudio de títulos (~0.3% del inmueble), gastos de escrituración, beneficencia y registro (~3% a 4% del valor de la vivienda, repartidos entre comprador y vendedor) y los seguros obligatorios de vida e incendio/terremoto.";
    }

    // 11. Vivienda nueva vs usada / sobre planos / construcción
    if (
        texto.includes("usada") ||
        texto.includes("nueva") ||
        texto.includes("plano") ||
        texto.includes("construir") ||
        texto.includes("remodelar") ||
        texto.includes("lote")
    ) {
        return "Financiamos tanto vivienda nueva (sobre planos o entrega inmediata) como vivienda usada. Si es sobre planos, aprobamos tu crédito y pagas la cuota inicial en cuotas a la constructora; si es usada, el desembolso se hace tras el avalúo, estudio de títulos y firma de escrituras.";
    }

    // 12. Colombianos en el exterior
    if (
        texto.includes("exterior") ||
        texto.includes("extranjero") ||
        texto.includes("estados unidos") ||
        texto.includes("espana") ||
        texto.includes("canada") ||
        texto.includes("fuera del pais") ||
        texto.includes("remesa") ||
        texto.includes("apoderado")
    ) {
        return "¡Claro que sí! Los colombianos residentes en el exterior pueden comprar vivienda en Colombia con nuestros bancos aliados demostrando sus ingresos en moneda extranjera (declaración de impuestos o extractos) y firmando mediante un apoderado en Colombia.";
    }

    // 13. Tiempos de aprobación y etapas del proceso
    if (
        texto.includes("demora") ||
        texto.includes("tiempo") ||
        texto.includes("tarda") ||
        texto.includes("etapa") ||
        texto.includes("pasos") ||
        texto.includes("desembolso") ||
        texto.includes("proceso") ||
        texto.includes("vigencia")
    ) {
        return "El estudio y carta de aprobación tardan entre 3 y 8 días hábiles una vez radicados los documentos. La carta de aprobación tiene vigencia de 6 a 12 meses, y el proceso completo de avalúo, estudio de títulos, escrituración y desembolso toma entre 30 y 45 días.";
    }

    // 14. Tasas y bancos aliados
    if (
        texto.includes("tasa") ||
        texto.includes("banco") ||
        texto.includes("mejor") ||
        texto.includes("interes") ||
        texto.includes("bancolombia") ||
        texto.includes("caja social") ||
        texto.includes("bogota") ||
        texto.includes("av villas") ||
        texto.includes("occidente") ||
        texto.includes("itau") ||
        texto.includes("credifamilia") ||
        texto.includes("aliado")
    ) {
        return "Comparamos 7 bancos aliados: Bancolombia (10.50% E.A.), Banco Caja Social (10.90% E.A.), Banco de Bogotá (11.20% E.A.), AV Villas (11.50% E.A.), Banco de Occidente (11.80% E.A.), Itaú (12.10% E.A.) y Credifamilia (13.20% E.A.). Puedes simular tu cuota exacta en la sección Bancos Aliados.";
    }

    // 15. Subsidios VIS y VIP
    if (
        texto.includes("subsidio") ||
        texto.includes("vis") ||
        texto.includes("vip") ||
        texto.includes("caja") ||
        texto.includes("concurrente") ||
        texto.includes("mi casa ya") ||
        texto.includes("gobierno") ||
        texto.includes("tope")
    ) {
        return "Para vivienda nueva VIS (tope 135 a 150 SMMLV) y VIP (tope 90 SMMLV), puedes aplicar al subsidio de tu Caja de Compensación Familiar (hasta 30 SMMLV si ganas menos de 4 SMMLV) o al Subsidio Concurrente (hasta 50 SMMLV sumando Caja + Gobierno).";
    }

    // 16. Pesos vs UVR
    if (texto.includes("pesos") || texto.includes("uvr") || texto.includes("diferencia") || texto.includes("inflacion") || texto.includes("fija") || texto.includes("variable")) {
        return "En Pesos tu cuota es fija de principio a fin, brindándote total previsibilidad. En UVR la primera cuota es más baja (útil si necesitas que te aprueben un monto mayor con tu salario actual), pero el saldo y la cuota se ajustan mensualmente con la inflación (IPC).";
    }

    // 17. Ingresos mínimos y capacidad de pago general
    if (
        texto.includes("ingreso") ||
        texto.includes("salario") ||
        texto.includes("gano") ||
        texto.includes("minimo") ||
        texto.includes("capacidad") ||
        texto.includes("cuanto me prestan") ||
        texto.includes("endeudamiento")
    ) {
        return "Por ley en Colombia, la primera cuota del crédito de vivienda no puede superar el 30% de tus ingresos en VIS (y hasta el 30%-40% en No VIS). Si me escribes cuánto ganas al mes (por ejemplo: 'gano 4 millones'), te calculo de inmediato tu cuota máxima y cuánto te prestarían.";
    }

    // 18. Documentos y requisitos
    if (
        texto.includes("requisito") ||
        texto.includes("documento") ||
        texto.includes("papel") ||
        texto.includes("solicitar") ||
        texto.includes("extracto") ||
        texto.includes("certificado")
    ) {
        return "Documentos básicos: fotocopia de la cédula, certificado laboral y colillas de los últimos 3 meses (para empleados) o extractos bancarios de los últimos 3-6 meses, RUT y declaración de renta (para independientes). Déjanos tus datos en Contacto para revisarlos sin costo.";
    }

    // 19. Cuota inicial, porcentaje financiado y plazos
    if (
        texto.includes("cuota inicial") ||
        texto.includes("ahorro") ||
        texto.includes("financia") ||
        texto.includes("porcentaje") ||
        texto.includes("plazo") ||
        texto.includes("anos")
    ) {
        return "Los bancos financian hasta el 80% del valor en vivienda VIS y hasta el 70% en vivienda No VIS (o hasta el 85% mediante leasing habitacional), con plazos de 5 a 30 años. El 20% o 30% restante corresponde a la cuota inicial.";
    }

    // 20. Costo del servicio y quiénes somos en Vivienco
    if (
        texto.includes("costo") ||
        texto.includes("gratis") ||
        texto.includes("cobran") ||
        texto.includes("comision") ||
        texto.includes("vivienco") ||
        texto.includes("equipo") ||
        texto.includes("ubicacion") ||
        texto.includes("contacto")
    ) {
        return "En Vivienco somos brókers especializados en crédito hipotecario. Nuestro acompañamiento (viabilidad, comparación en 7 bancos, radicación y seguimiento hasta el desembolso) es 100% gratuito para ti, ya que los bancos aliados asumen nuestra comisión.";
    }

    // 21. Saludos y agradecimientos
    if (
        texto.includes("hola") ||
        texto.includes("buenos") ||
        texto.includes("buenas") ||
        texto.includes("gracias") ||
        texto.includes("excelente") ||
        texto.includes("perfecto")
    ) {
        return "¡Con mucho gusto! Estoy listo para ayudarte. Puedes preguntarme quiénes aplican, simular con tu sueldo ('gano 3.5 millones'), consultar sobre leasing, compra de cartera, cesantías, deudas o subsidios VIS.";
    }

    // 22. Respuesta inteligente ante preguntas fuera de tema o muy abiertas
    return "Soy el especialista hipotecario con IA de Vivienco. Puedo hacerte cálculos reales (escríbeme 'gano 4 millones' o 'casa de 200 millones') o explicarte sobre quiénes aplican, unión de ingresos, leasing, compra de cartera, cesantías, deudas en DataCrédito, gastos de escrituración y subsidios. ¿Qué caso quieres evaluar?";
}

function AsistenteIA() {
    const [abierto, setAbierto] = useState(false);
    const [mensajes, setMensajes] = useState(mensajesIniciales);
    const [entrada, setEntrada] = useState("");
    const [escribiendo, setEscribiendo] = useState(false);

    const enviarPregunta = async (textoPregunta) => {
        const preguntaFinal = textoPregunta || entrada;
        if (!preguntaFinal.trim()) return;

        const nuevosMensajes = [...mensajes, { emisor: "usuario", texto: preguntaFinal }];
        setMensajes(nuevosMensajes);
        setEntrada("");
        setEscribiendo(true);

        try {
            const res = await fetch("http://localhost:5000/api/asistente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mensaje: preguntaFinal,
                    historial: nuevosMensajes.slice(-6),
                }),
            });

            if (res.ok) {
                const datos = await res.json();
                const textoRespuesta = datos.respuesta || generarRespuestaExperta(preguntaFinal);
                setMensajes([...nuevosMensajes, { emisor: "ia", texto: textoRespuesta }]);
            } else {
                setMensajes([...nuevosMensajes, { emisor: "ia", texto: generarRespuestaExperta(preguntaFinal) }]);
            }
        } catch {
            setMensajes([...nuevosMensajes, { emisor: "ia", texto: generarRespuestaExperta(preguntaFinal) }]);
        } finally {
            setEscribiendo(false);
        }
    };

    return (
        <div className="ia-contenedor">
            {abierto && (
                <div className="ia-ventana">
                    <div className="ia-encabezado">
                        <div className="ia-titulo">
                            <Sparkles size={18} />
                            <div>
                                <h4>Asistente IA Vivienco</h4>
                                <span>En línea • Especialista Hipotecario</span>
                            </div>
                        </div>
                        <button className="ia-cerrar" onClick={() => setAbierto(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="ia-mensajes">
                        {mensajes.map((msg, idx) => (
                            <div key={idx} className={`ia-burbuja ia-burbuja--${msg.emisor}`}>
                                {msg.texto}
                            </div>
                        ))}
                        {escribiendo && <div className="ia-burbuja ia-burbuja--ia">Analizando tu consulta...</div>}
                    </div>

                    <div className="ia-sugerencias">
                        <button onClick={() => enviarPregunta("¿Quiénes pueden obtener un crédito hipotecario?")}>
                            ¿Quiénes aplican?
                        </button>
                        <button onClick={() => enviarPregunta("Gano 4 millones, ¿cuánto me prestan?")}>
                            Simular salario
                        </button>
                        <button onClick={() => enviarPregunta("¿Qué banco tiene mejor tasa?")}>
                            Mejor tasa hoy
                        </button>
                        <button onClick={() => enviarPregunta("¿Cómo funcionan los subsidios VIS?")}>
                            Subsidios VIS
                        </button>
                    </div>

                    <form
                        className="ia-formulario"
                        onSubmit={(e) => {
                            e.preventDefault();
                            enviarPregunta();
                        }}
                    >
                        <input
                            type="text"
                            value={entrada}
                            onChange={(e) => setEntrada(e.target.value)}
                            placeholder="Ej: Gano 4 millones / ¿Quiénes aplican?..."
                        />
                        <button type="submit" title="Enviar">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button className="ia-boton-flotante" onClick={() => setAbierto(!abierto)}>
                <span className="ia-texto-flotante">¿En qué podemos ayudarte?</span>
                <div className="ia-icono-circulo">
                    <MessageCircle size={22} />
                    <span className="ia-notificacion">1</span>
                </div>
            </button>
        </div>
    );
}

export default AsistenteIA;
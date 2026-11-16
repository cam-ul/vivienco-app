// Textos legales y mes de actualización de tasas
export const configuracionLegalTasas = {
    mesVigencia: "Noviembre 2026",
    avisoCorto: "TASAS DE REFERENCIA (NOVIEMBRE 2026). SUJETO A ESTUDIO CREDITICIO Y APLICAN T&C.",
    avisoLegalCompleto: "Aviso legal: Las tasas Efectivas Anuales (E.A.) y simulaciones presentadas en este portal son estrictamente informativas y de referencia para el mes vigente. No constituyen una oferta comercial vinculante, promesa de tasa ni aprobación de crédito. La tasa definitiva dependerá del estudio de riesgo crediticio del solicitante y de las políticas vigentes de cada entidad financiera al momento del desembolso."
};

// Tasas mensuales por banco y modalidad (VIS y No VIS)
export const bancosAliados = [
    {
        id: 1,
        nombre: "Banco Caja Social",
        tasaEA: 13.95,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Banco_Caja_Social_logo.svg",
        descripcion: "Financiación de vivienda VIS y No VIS con rangos de referencia para hipoteca, compra de cartera y remodelación. No hay tasas de leasing reportadas en este consolidado.",
        tasas: {
            hipotecario: { VIS: { desde: 13.95, hasta: 16.30 }, noVis: { desde: 14.95, hasta: 17.80 } },
            leasing: { VIS: null, noVis: null },
            compraCartera: { VIS: { desde: 13.75, hasta: 16.30 }, noVis: { desde: 14.75, hasta: 17.80 } },
            remodelacion: { VIS: { desde: 14.95, hasta: 16.30 }, noVis: { desde: 16.00, hasta: 17.80 } }
        }
    },
    {
        id: 2,
        nombre: "Banco AV Villas",
        tasaEA: 13.40,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Banco_AV_Villas_logo.svg",
        descripcion: "Opciones de crédito hipotecario VIS y No VIS, además de leasing No VIS. También presenta rangos de referencia para compra de cartera y remodelación.",
        tasas: {
            hipotecario: { VIS: { desde: 13.40, hasta: 15.35 }, noVis: { desde: 13.85, hasta: 15.95 } },
            leasing: { VIS: null, noVis: { desde: 13.40, hasta: 14.50 } },
            compraCartera: { VIS: { desde: 13.50, hasta: 15.70 }, noVis: { desde: 13.65, hasta: 16.40 } },
            remodelacion: { VIS: { desde: 13.52, hasta: 13.52 }, noVis: { desde: 13.52, hasta: 13.52 } }
        }
    },
    {
        id: 3,
        nombre: "BBVA",
        tasaEA: 14.40,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/BBVA_2019.svg",
        descripcion: "Alternativas hipotecarias y de leasing para VIS y No VIS, según las tasas de referencia facilitadas. También se incluyen compra de cartera y remodelación para comparar productos.",
        tasas: {
            hipotecario: { VIS: { desde: 14.40, hasta: 16.16 }, noVis: { desde: 15.06, hasta: 17.41 } },
            leasing: { VIS: { desde: 11.50, hasta: 13.00 }, noVis: { desde: 14.39, hasta: 17.24 } },
            compraCartera: { VIS: { desde: 13.50, hasta: 14.50 }, noVis: { desde: 13.50, hasta: 14.50 } },
            remodelacion: { VIS: { desde: 13.80, hasta: 15.56 }, noVis: { desde: 14.50, hasta: 16.84 } }
        }
    },
    {
        id: 4,
        nombre: "Banco de Bogotá",
        tasaEA: 14.03,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_2.0_banco_de_bogota.png",
        descripcion: "Cuenta con tasas de referencia para hipotecas VIS y No VIS, además de leasing No VIS. El consolidado incluye también compra de cartera y remodelación de vivienda.",
        tasas: {
            hipotecario: { VIS: { desde: 14.03, hasta: 16.94 }, noVis: { desde: 14.03, hasta: 17.88 } },
            leasing: { VIS: null, noVis: { desde: 13.49, hasta: 17.04 } },
            compraCartera: { VIS: { desde: 15.25, hasta: 16.63 }, noVis: { desde: 14.71, hasta: 17.46 } },
            remodelacion: { VIS: { desde: 15.25, hasta: 15.80 }, noVis: { desde: 15.94, hasta: 17.60 } }
        }
    },
    {
        id: 5,
        nombre: "Banco de Occidente",
        tasaEA: 14.92,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Banco_de_Occidente_logo.svg",
        descripcion: "Presenta rangos de tasas para hipoteca y leasing habitacional en VIS y No VIS. La comparación contempla asimismo compra de cartera y remodelación.",
        tasas: {
            hipotecario: { VIS: { desde: 14.92, hasta: 18.29 }, noVis: { desde: 14.92, hasta: 18.29 } },
            leasing: { VIS: { desde: 14.30, hasta: 17.69 }, noVis: { desde: 14.30, hasta: 17.69 } },
            compraCartera: { VIS: { desde: 14.92, hasta: 18.29 }, noVis: { desde: 14.92, hasta: 18.29 } },
            remodelacion: { VIS: { desde: 14.77, hasta: 18.05 }, noVis: { desde: 14.77, hasta: 18.05 } }
        }
    },
    {
        id: 6,
        nombre: "Credifamilia",
        tasaEA: 16.80,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_de_Credifamilia.png",
        descripcion: "El consolidado presenta referencias de hipoteca y remodelación de vivienda tanto VIS como No VIS. No se incluyen tasas para leasing ni compra de cartera.",
        tasas: {
            hipotecario: { VIS: { desde: 16.80, hasta: 16.80 }, noVis: { desde: 16.80, hasta: 16.80 } },
            leasing: { VIS: null, noVis: null },
            compraCartera: { VIS: null, noVis: null },
            remodelacion: { VIS: { desde: 22.40, hasta: 23.95 }, noVis: { desde: 22.40, hasta: 23.95 } }
        }
    },
    {
        id: 7,
        nombre: "Bancolombia",
        tasaEA: 14.90,
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Bancolombia_S.A._logo.svg",
        descripcion: "Ofrece rangos de referencia para hipotecas VIS y No VIS, y leasing No VIS. Este consolidado no registra tasas de compra de cartera ni remodelación.",
        tasas: {
            hipotecario: { VIS: { desde: 14.90, hasta: 14.90 }, noVis: { desde: 15.20, hasta: 15.60 } },
            leasing: { VIS: null, noVis: { desde: 15.20, hasta: 15.60 } },
            compraCartera: { VIS: null, noVis: null },
            remodelacion: { VIS: null, noVis: null }
        }
    }
];

// Información y números de WhatsApp de los asesores
export const integrantesEquipo = [
    {
        id: 1,
        nombre: "Ángel Mejías",
        cargo: "Bróker Hipotecario e Inmobiliario · Barranquilla",
        experiencia: "+10 años de experiencia",
        fotoUrl: "/equipo/angel-mejia.jpeg",
        whatsapp: "573016196503",
        telefonoVisible: "301 619 6503",
        especialidad: "Crédito de vivienda y vehículo; intermediación inmobiliaria",
        trayectoria: "Especialista con más de 10 años en crédito de vivienda y vehículo. Comparo múltiples bancos para conseguirte la mejor tasa, cuota y plazo sin perder tiempo ni pagar de más.",
        puntosClave: [
            "Viabilidad inmediata en crédito de vivienda y vehículo",
            "Comparación imparcial de tasas entre bancos",
            "Acompañamiento desde el perfilamiento hasta el desembolso",
            "Intermediación en compra y venta de inmuebles"
        ],
        bioCompleta: "Ángel Mejías es bróker hipotecario e inmobiliario en Barranquilla, con más de 10 años de experiencia en financiación de vivienda y vehículo. Su trabajo consiste en analizar las necesidades del cliente y comparar alternativas bancarias de tasa, cuota y plazo. Acompaña cada etapa, desde el perfilamiento y la viabilidad inicial hasta el desembolso, y también asesora procesos de compra y venta de inmuebles."
    },
    {
        id: 2,
        nombre: "Johanna Paola Peña Paez",
        cargo: "Bróker Hipotecario e Inmobiliario · Barranquilla",
        experiencia: "+15 años en el sector financiero",
        fotoUrl: "/equipo/johana-pena.jpeg",
        whatsapp: "573006284942",
        telefonoVisible: "300 628 4942",
        especialidad: "Crédito de vivienda, leasing y gestión hipotecaria",
        trayectoria: "Más de 15 años en banca comercial y ex gerente de vivienda especializada en Banco de Occidente. Analizo tu perfil desde el inicio con asesoría cercana, honesta y enfocada en tu familia.",
        puntosClave: [
            "Crédito de vivienda, leasing y vehículo",
            "Ex gerente especializada en banca hipotecaria",
            "Perfilamiento, radicación y seguimiento integral",
            "Asesoría inmobiliaria en compra y venta"
        ],
        bioCompleta: "Johanna Paola Peña Paez es bróker hipotecaria e inmobiliaria en Barranquilla, con más de 15 años de trayectoria en el sector financiero. Fue gerente de vivienda especializada en Banco de Occidente y cuenta con experiencia en banca comercial y financiación hipotecaria. Acompaña a sus clientes desde el análisis inicial del perfil hasta la radicación y el seguimiento del proceso; también orienta operaciones inmobiliarias de compra y venta, con un enfoque cercano y familiar."
    },
    {
        id: 3,
        nombre: "Jorge Hernán Solís Sánchez",
        cargo: "Bróker Inmobiliario y Financiero · Barranquilla",
        experiencia: "+5 años de experiencia",
        fotoUrl: "/equipo/jorge-solis.jpeg",
        whatsapp: "573174043360",
        telefonoVisible: "317 404 3360",
        especialidad: "Financiación inmobiliaria y colombianos en el exterior",
        trayectoria: "Especialista en estructuración financiera, negociación con constructoras y asesoría integral a familias y colombianos en el exterior que desean invertir en vivienda en Colombia.",
        puntosClave: [
            "Crédito hipotecario y leasing habitacional",
            "Especialista en colombianos residentes en el exterior",
            "Alianzas y negociación directa con constructoras",
            "Estrategia financiera personalizada hasta el desembolso"
        ],
        bioCompleta: "Jorge Hernán Solís Sánchez es bróker inmobiliario y financiero en Barranquilla, con más de 5 años de experiencia. Se especializa en estructurar alternativas de financiación para familias y colombianos residentes en el exterior que desean adquirir o invertir en vivienda en Colombia. Trabaja en la negociación con constructoras y acompaña la definición de una estrategia financiera personalizada, desde la evaluación de opciones hipotecarias o de leasing hasta el desembolso."
    }
];

// Guías para la sección de educación financiera
export const educacionFinanciera = [
    {
        "id": 1,
        "slug": "credito-hipotecario",
        "titulo": "¿Qué es un crédito hipotecario?",
        "categoria": "Conceptos básicos",
        "descripcion": "Es un préstamo para comprar vivienda en el que el inmueble respalda la obligación mientras pagas la deuda.",
        "puntosClave": [
            "Pagas capital, intereses y seguros aplicables.",
            "La entidad evalúa ingresos y capacidad de pago.",
            "El inmueble queda como garantía hipotecaria."
        ],
        "tiempoLectura": "3 min",
        "contenidoDetallado": [
            "Un crédito hipotecario es un préstamo de largo plazo para comprar vivienda nueva o usada. La entidad financiera entrega el dinero aprobado y el comprador se compromete a devolverlo en cuotas; el inmueble queda hipotecado como garantía hasta que la deuda se pague y se levante la hipoteca.",
            "Cada cuota puede incluir una parte del dinero prestado, llamada capital, otra de intereses y los seguros que correspondan. El valor depende de factores como el monto financiado, el plazo, la tasa pactada y el sistema de amortización. Una cuota inicial más alta normalmente reduce el capital que necesitas pedir.",
            "Antes de firmar, distingue la preaprobación del desembolso: la primera es una evaluación inicial, mientras que el segundo ocurre después de las verificaciones del cliente, los documentos y el inmueble. Revisa también si la tasa es fija en pesos o si el crédito está expresado en UVR."
        ],
        "ejemploPractico": "Caso hipotético: una familia compra un apartamento de $250.000.000 COP. Aporta $75.000.000 COP de cuota inicial (30 %) y solicita un crédito de $175.000.000 COP (70 %). Los intereses, seguros y cuotas se calcularán aparte según las condiciones aprobadas.",
        "consejoExperto": "Solicita a Vivienco dos o tres simulaciones del mismo monto y plazo. Compara cuota total, tasa, seguros y costo acumulado antes de elegir."
    },
    {
        "id": 2,
        "slug": "leasing-habitacional",
        "titulo": "¿Cómo funciona el leasing habitacional?",
        "categoria": "Tipos de financiación",
        "descripcion": "Es una alternativa en la que la entidad financiera conserva la propiedad del inmueble durante el contrato y pacta una opción de compra.",
        "puntosClave": [
            "Pagas un canon mensual.",
            "La opción de compra se acuerda por contrato.",
            "La financiación depende de la entidad y del perfil."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "En el leasing habitacional la entidad financiera adquiere el inmueble y permite que el cliente lo use a cambio de cánones periódicos. Durante la vigencia del contrato la propiedad permanece a nombre de la entidad; el cliente puede ejercer la opción de compra pactada si cumple las condiciones.",
            "La opción de compra es un valor o porcentaje acordado desde el contrato y debe incluirse en el presupuesto final. No basta con comparar el canon de leasing con la cuota de una hipoteca: también pueden variar los seguros, la proporción financiada, los gastos y las obligaciones sobre el inmueble.",
            "El leasing puede ajustarse a ciertos perfiles y proyectos, pero no es automáticamente más barato ni está disponible en todas las entidades. Debes verificar las reglas para terminar anticipadamente, ceder el contrato, ejercer la opción de compra y asumir impuestos o gastos de escrituración."
        ],
        "ejemploPractico": "Caso hipotético: un inmueble cuesta $320.000.000 COP y una entidad acepta financiar $256.000.000 COP mediante leasing. El cliente aporta $64.000.000 COP al inicio. Si pacta una opción de compra de $16.000.000 COP, debe prever ese valor adicional al finalizar, además de los cánones y gastos aplicables.",
        "consejoExperto": "Pide una tabla que muestre canon, opción de compra, desembolso inicial y pagos finales; compárala con una hipoteca para el mismo inmueble."
    },
    {
        "id": 3,
        "slug": "credito-en-pesos-o-uvr",
        "titulo": "Crédito en pesos vs. UVR",
        "categoria": "Tasas y cuotas",
        "descripcion": "La modalidad de pago influye en cómo evoluciona la cuota y en los riesgos que asumes durante el plazo.",
        "puntosClave": [
            "En pesos, revisa el sistema de amortización.",
            "La UVR cambia con la inflación.",
            "Compara el costo total, no solo la primera cuota."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "Un crédito en pesos expresa la deuda en moneda colombiana y su comportamiento depende del sistema de amortización contratado. Algunos esquemas permiten cuotas relativamente estables, pero hay que confirmar qué incluyen y cómo se liquidan intereses y seguros.",
            "La UVR es una unidad de cuenta cuyo valor en pesos cambia con la inflación medida por el IPC. En un crédito denominado en UVR, la conversión a pesos del saldo y de las cuotas puede variar; por eso una cuota inicialmente baja no garantiza pagos bajos en el futuro.",
            "Para comparar ambas alternativas no uses solo el valor de la primera cuota. Solicita escenarios con distintas inflaciones, evalúa tu estabilidad de ingresos y pregunta cómo cambiaría el saldo expresado en pesos. La elección debe basarse en cuánto riesgo puede asumir tu hogar."
        ],
        "ejemploPractico": "Ejemplo didáctico, no una proyección de crédito: una obligación de 1.000 UVR equivale a $380.000 COP si cada UVR vale $380 COP. Si esa unidad pasa a $400 COP, las mismas 1.000 UVR equivaldrían a $400.000 COP. El ejemplo aísla el efecto de la UVR; en un crédito real también hay amortización e intereses.",
        "consejoExperto": "Solicita una simulación en pesos y otra en UVR con escenarios de inflación alta y moderada. Revisa la cuota máxima que podría soportar tu presupuesto."
    },
    {
        "id": 4,
        "slug": "capacidad-de-endeudamiento",
        "titulo": "Calcula tu capacidad de endeudamiento",
        "categoria": "Planeación financiera",
        "descripcion": "Antes de solicitar financiación, identifica cuánto puedes pagar mensualmente sin comprometer tus gastos esenciales.",
        "puntosClave": [
            "Suma ingresos demostrables del hogar.",
            "Resta obligaciones y gastos recurrentes.",
            "Reserva dinero para imprevistos."
        ],
        "tiempoLectura": "3 min",
        "contenidoDetallado": [
            "La capacidad de endeudamiento es el dinero que puedes destinar a una nueva obligación después de cubrir los gastos habituales y los créditos que ya tienes. No es igual al salario: importa cuánto entra realmente a tu hogar y cuánto sale cada mes.",
            "Haz un presupuesto con ingresos demostrables, arriendo, alimentación, transporte, servicios, tarjetas, préstamos y gastos familiares. Separa también una reserva para emergencias, mantenimiento de la vivienda y cambios temporales en tus ingresos.",
            "La entidad financiera aplicará sus propios criterios al estudiar el crédito, así que tu cálculo personal no garantiza una aprobación. Aun cuando el banco ofrezca un cupo mayor, elegir una cuota manejable te ayuda a evitar atrasos y a sostener tus metas de ahorro."
        ],
        "ejemploPractico": "Caso hipotético: un hogar recibe $6.000.000 COP mensuales. Gasta $2.800.000 COP en necesidades y $700.000 COP en otras deudas; le quedan $2.500.000 COP. Si reserva $900.000 COP para ahorro e imprevistos, su presupuesto orientativo para vivienda sería $1.600.000 COP al mes, antes de revisar seguros y condiciones bancarias.",
        "consejoExperto": "Lleva a la asesoría los últimos tres meses de ingresos y gastos. Define una cuota cómoda antes de preguntar cuánto es lo máximo que te prestarían."
    },
    {
        "id": 5,
        "slug": "cuota-inicial-y-gastos",
        "titulo": "Cuota inicial y gastos de compra",
        "categoria": "Planeación financiera",
        "descripcion": "Además de la cuota inicial, comprar vivienda puede implicar costos de avalúo, estudio de títulos, escrituración y registro.",
        "puntosClave": [
            "Define cuánto necesitas ahorrar.",
            "Presupuesta trámites y seguros.",
            "Consulta los costos exactos antes de firmar."
        ],
        "tiempoLectura": "3 min",
        "contenidoDetallado": [
            "La cuota inicial es la parte del precio que pagas con ahorros y otras fuentes permitidas, sin incluir el dinero prestado por la entidad. Su tamaño depende del valor del inmueble, del porcentaje que efectivamente aprueben y del tipo de financiación.",
            "Además de esa cuota, debes separar recursos para avalúo, estudio de títulos, notaría, registro y otros trámites que correspondan. También podrían existir gastos de mudanza, adecuaciones, administración, impuestos o seguros que no siempre aparecen en la primera publicidad del proyecto.",
            "No comprometas el cien por ciento de tus ahorros en la promesa de compraventa. Solicita un presupuesto por etapas: separación, cuota inicial, aprobación, escrituración y entrega. Comprueba quién paga cada concepto porque algunos gastos se reparten entre comprador y vendedor."
        ],
        "ejemploPractico": "Caso hipotético: un apartamento vale $220.000.000 COP y el crédito solicitado cubre $154.000.000 COP (70 %). La cuota inicial sería $66.000.000 COP. Si el comprador reserva adicionalmente $8.000.000 COP como bolsa estimada para trámites y contingencias, necesitaría planear $74.000.000 COP; los gastos reales deben cotizarse.",
        "consejoExperto": "Antes de separar el inmueble, pide una relación escrita de pagos con fecha, responsable y valor estimado para cada etapa."
    },
    {
        "id": 6,
        "slug": "tasas-de-interes-ea",
        "titulo": "Aprende a comparar tasas de interés",
        "categoria": "Tasas y cuotas",
        "descripcion": "La tasa efectiva anual (E. A.) ayuda a contrastar ofertas, pero no reemplaza la comparación completa del crédito.",
        "puntosClave": [
            "Compara ofertas en la misma modalidad.",
            "Revisa plazo, seguros y cargos asociados.",
            "Solicita una simulación personalizada."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "La tasa efectiva anual, abreviada E. A., permite expresar el costo del interés sobre una base anual comparable. Sin embargo, una tasa por sí sola no revela cuánto terminarás pagando: también cuentan el plazo, el capital, el sistema de amortización, los seguros y otros cargos.",
            "Para comparar ofertas, usa el mismo valor de vivienda, crédito, cuota inicial y plazo. Pregunta si los seguros están incluidos en la cuota publicada, qué sucede con la tasa después de la aprobación y hasta cuándo tiene validez la simulación.",
            "Una cuota menor no siempre significa un crédito más económico. Alargar el plazo puede facilitar el pago mensual, pero también aumentar los intereses acumulados. Mira tanto el flujo de caja mensual como el costo total estimado antes de decidir."
        ],
        "ejemploPractico": "Caso hipotético: para un mismo crédito, plazo y coberturas, la simulación A muestra una cuota total de $1.750.000 COP y la B una de $1.650.000 COP. La diferencia es $100.000 COP al mes. Durante 12 meses serían $1.200.000 COP, siempre que ambas cuotas se mantengan iguales; confirma el costo total en las tablas de amortización.",
        "consejoExperto": "Solicita ofertas escritas en la misma modalidad y no tomes la decisión solo por la tasa anunciada. Compara las tablas de amortización completas."
    },
    {
        "id": 7,
        "slug": "historial-crediticio",
        "titulo": "Prepara tu perfil crediticio",
        "categoria": "Preparación para el crédito",
        "descripcion": "Un buen manejo de tus obligaciones y soportes financieros puede facilitar el análisis de una solicitud hipotecaria.",
        "puntosClave": [
            "Paga tus obligaciones oportunamente.",
            "Evita asumir deudas innecesarias.",
            "Ten a mano tus soportes de ingresos."
        ],
        "tiempoLectura": "3 min",
        "contenidoDetallado": [
            "El historial crediticio muestra cómo has manejado obligaciones como tarjetas, préstamos y otros compromisos reportados. Las entidades lo revisan junto con los ingresos, el nivel de endeudamiento y su política de riesgo, pero un buen historial por sí solo no asegura aprobación.",
            "Pagar a tiempo, mantener información correcta y evitar deudas nuevas justo antes de solicitar la hipoteca puede ayudar a presentar un perfil más ordenado. Si trabajas por cuenta propia, prepara soportes consistentes de tu actividad y los movimientos que acrediten tus ingresos.",
            "Antes de iniciar el trámite, consulta tu información en los operadores correspondientes y verifica si hay errores o cuentas pendientes. Si encuentras una inconsistencia, solicita su corrección por los canales oficiales y guarda los soportes del proceso."
        ],
        "ejemploPractico": "Caso hipotético: una persona gana $4.500.000 COP y paga $1.200.000 COP al mes en créditos de consumo. Si termina una obligación de $500.000 COP mensuales, sus pagos existentes bajarían a $700.000 COP. Esto mejora su flujo disponible, aunque la aprobación hipotecaria dependerá del estudio integral.",
        "consejoExperto": "Revisa tus reportes y organiza certificados de ingresos antes de radicar la solicitud. Evita solicitar varias obligaciones nuevas mientras se estudia tu crédito."
    },
    {
        "id": 8,
        "slug": "abonos-a-capital-y-compra-de-cartera",
        "titulo": "Abonos a capital y compra de cartera",
        "categoria": "Optimización del crédito",
        "descripcion": "Conoce dos alternativas para reorganizar el costo o el plazo de una obligación hipotecaria existente.",
        "puntosClave": [
            "Consulta cómo aplicar abonos a capital.",
            "Compara las condiciones de traslado de deuda.",
            "Incluye costos de cambio y seguros en el cálculo."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "Un abono extraordinario a capital es dinero adicional que se aplica para reducir el saldo de la deuda hipotecaria. En los créditos de vivienda regulados por la Ley 546 de 1999 se permite prepagar sin penalidad, y en un abono parcial el deudor puede elegir si reduce cuota o plazo.",
            "Reducir la cuota puede liberar dinero mensual; reducir el plazo suele disminuir el tiempo durante el cual se generan intereses. La mejor opción depende de tu liquidez, de la tasa y de tus objetivos. Solicita a la entidad el nuevo plan de pagos antes de confirmar la instrucción.",
            "La compra de cartera ocurre cuando otra entidad paga tu crédito vigente y lo reemplaza por una nueva obligación. Puede mejorar tasa o cuota, pero debes comparar seguros, gastos de traslado, condiciones de la nueva hipoteca y ahorro neto, no solo la publicidad."
        ],
        "ejemploPractico": "Caso hipotético: debes $145.000.000 COP y cuentas con $10.000.000 COP para un abono a capital. Tu saldo bajaría a $135.000.000 COP antes de otros movimientos. Si, en cambio, otra entidad ofrece una cuota $150.000 COP menor, evalúa cuánto ahorrarías durante el plazo restante y cuánto costaría el traslado.",
        "consejoExperto": "Pide una simulación con reducción de plazo y otra con reducción de cuota. Para compra de cartera, compara el ahorro neto descontando los costos de cambio."
    },
    {
        "id": 9,
        "slug": "etapas-solicitud-hipotecaria",
        "titulo": "Del estudio de crédito al desembolso: paso a paso",
        "categoria": "Trámites y documentos",
        "descripcion": "Conoce las etapas habituales para financiar una vivienda y evita confundir una preaprobación con un crédito desembolsado.",
        "puntosClave": [
            "Organiza documentos personales y financieros.",
            "Diferencia preaprobación, aprobación y desembolso.",
            "Confirma avalúo, títulos y tiempos de escritura."
        ],
        "tiempoLectura": "5 min",
        "contenidoDetallado": [
            "El proceso suele comenzar con una evaluación inicial de ingresos, obligaciones e historial crediticio. La preaprobación sirve para orientar el presupuesto, pero todavía puede estar sujeta a nuevas verificaciones y a las condiciones del inmueble que deseas comprar.",
            "Cuando eliges una propiedad, la entidad puede solicitar avalúo y estudio de títulos, además de los documentos de compraventa. En esta etapa se verifican el valor, la situación jurídica del inmueble y los requisitos del comprador. Si hay observaciones, podrían pedir documentos adicionales o ajustar las condiciones.",
            "Después llegan los trámites de firma, constitución de garantía, registro y desembolso según la modalidad. Es importante coordinar las fechas con la constructora o el vendedor, porque una aprobación no significa que el dinero se entregue el mismo día. Conserva copias de recibos, certificados y comunicaciones."
        ],
        "ejemploPractico": "Caso hipotético: por una vivienda de $280.000.000 COP el comprador aporta $84.000.000 COP y tramita $196.000.000 COP de crédito. Aunque tenga una preaprobación por ese monto, el desembolso depende de que el inmueble y la documentación superen las verificaciones posteriores.",
        "consejoExperto": "Crea una lista compartida con documentos pendientes, responsables y fechas. No prometas una fecha de pago al vendedor sin confirmarla con la entidad."
    }
];

// Información sobre programas de subsidios y coberturas de vivienda
export const subsidios = [
    {
        id: 1,
        slug: "mi-casa-ya",
        titulo: "Mi Casa Ya",
        categoria: "Programa nacional",
        descripcion:
            "Programa de apoyo a la compra de vivienda VIS o VIP. El Fondo Nacional del Ahorro informa que se suspendieron las nuevas postulaciones conforme a la Circular 0012 de 2024.",
        estado: "Nuevas postulaciones suspendidas",
        puntosClave: [
            "Dirigido históricamente a hogares que cumplen requisitos.",
            "Exigía validaciones de vivienda, ingresos y beneficiarios.",
            "No asumir que existen cupos nuevos disponibles."
        ],
        notaImportante:
            "Revisar novedades oficiales antes de ofrecer el programa como un beneficio disponible.",
        fuenteUrl: "https://www.fna.gov.co/personas/vivienda/programas-de-gobierno/subsidios-coberturas/mi-casa-ya"
    },
    {
        id: 2,
        slug: "cajas-de-compensacion",
        titulo: "Subsidios de Cajas de Compensación",
        categoria: "Subsidio de caja",
        descripcion:
            "Apoyos para vivienda que pueden otorgar las cajas de compensación familiar a hogares que cumplen sus requisitos y condiciones de postulación.",
        estado: "Sujeto a requisitos y disponibilidad",
        puntosClave: [
            "Consulta las condiciones de tu caja.",
            "Valida ingresos, afiliación y composición del hogar.",
            "Pregunta por montos, convocatorias y vigencia."
        ],
        notaImportante:
            "Las condiciones cambian según la caja y la modalidad de subsidio.",
        fuenteUrl: "https://www.minvivienda.gov.co/viceministerio-de-vivienda-subsidio-familiar-de-vivienda"
    },
    {
        id: 3,
        slug: "concurrencia-de-subsidios",
        titulo: "Concurrencia de Subsidios",
        categoria: "Combinación de apoyos",
        descripcion:
            "Permite aplicar, cuando la normativa y los cupos lo permiten, un subsidio de caja y uno nacional sobre una misma vivienda.",
        estado: "Sujeto a elegibilidad y cupos",
        puntosClave: [
            "Puede sumar hasta 50 SMMLV bajo las reglas publicadas.",
            "La referencia nacional exige ingresos de hasta 2 SMMLV.",
            "Se debe comprobar la operatividad de ambos subsidios."
        ],
        notaImportante:
            "La concurrencia no garantiza la asignación: confirmar requisitos y disponibilidad con la caja y la entidad financiera.",
        fuenteUrl: "https://www.minvivienda.gov.co/viceministerio-de-vivienda/mi-casa-ya/subsidio-familiar-de-vivienda-nueva-0"
    },
    {
        id: 4,
        slug: "frech-cobertura-tasa",
        titulo: "FRECH: cobertura a la tasa de interés",
        categoria: "Cobertura financiera",
        descripcion:
            "Es un mecanismo de cobertura a la tasa de interés asociado a programas autorizados para ciertos créditos de vivienda o contratos de leasing.",
        estado: "Nuevos cupos de Mi Casa Ya suspendidos",
        puntosClave: [
            "Reduce parte del costo de intereses si se asigna.",
            "Exige cumplir condiciones del programa correspondiente.",
            "No debe confundirse con un subsidio a la cuota inicial."
        ],
        notaImportante:
            "Los nuevos cupos de cobertura FRECH vinculados a Mi Casa Ya se agotaron o suspendieron; verificar otros mecanismos vigentes si aplican.",
        fuenteUrl: "https://www.fna.gov.co/personas/vivienda/programas-de-gobierno/subsidios-coberturas/mi-casa-ya"
    },
    {
        id: 5,
        slug: "subsidio-familiar-vivienda-nueva",
        titulo: "Subsidio Familiar de Vivienda Nueva",
        categoria: "Programa nacional",
        descripcion:
            "Minvivienda publica una ruta para hogares que buscan adquirir vivienda nueva VIS o VIP, con requisitos de Sisbén IV y aprobación de financiación.",
        estado: "Verificar cupos y operación del programa",
        puntosClave: [
            "La guía oficial señala Sisbén IV entre A1 y D20.",
            "Se requiere crédito o leasing aprobado y vigente.",
            "Postularse no equivale a recibir una asignación."
        ],
        notaImportante:
            "El Ministerio describe postulaciones permanentes para esta ruta, mientras el FNA informa suspensión para nuevas postulaciones de Mi Casa Ya. Confirmar con la entidad la ruta concreta y los recursos disponibles.",
        fuenteUrl: "https://www.minvivienda.gov.co/viceministerio-de-vivienda/mi-casa-ya/subsidio-familiar-de-vivienda-nueva-0"
    }
];

// Alias para importar la lista de subsidios
export const subsidiosVivienda = subsidios;

// Artículos para la sección del blog
export const articulosBlog = [
    {
        "id": 1,
        "slug": "guia-primer-credito-hipotecario",
        "titulo": "Tu primer crédito hipotecario: ¿por dónde empezar?",
        "categoria": "Guías para comprar",
        "descripcion": "Una ruta sencilla para ordenar tus finanzas, comparar opciones y preparar tu solicitud de vivienda.",
        "puntosClave": [
            "Calcula tu presupuesto real.",
            "Reúne documentos e ingresos verificables.",
            "Compara simulaciones de varias entidades."
        ],
        "tiempoLectura": "5 min",
        "contenidoDetallado": [
            "Comprar vivienda por primera vez comienza por conocer tu presupuesto, no por visitar apartamentos. Suma ingresos verificables, identifica tus deudas y decide cuánto puedes destinar a una cuota sin descuidar alimentación, transporte, ahorro y emergencias.",
            "Luego define si buscas vivienda nueva o usada, dónde quieres vivir y cuánto tienes para la cuota inicial. Pide simulaciones en diferentes entidades con el mismo monto y plazo. Así podrás comparar financiación, costos y documentos exigidos de una manera más justa.",
            "Antes de firmar una separación o promesa de compraventa, consulta el estado del inmueble y las condiciones de devolución del dinero. Una preaprobación no reemplaza el estudio final, el avalúo ni la revisión de títulos. Organizar los tiempos es tan importante como conseguir la tasa."
        ],
        "ejemploPractico": "Caso hipotético: Daniela tiene $55.000.000 COP ahorrados y busca un apartamento de $180.000.000 COP. Si la financiación autorizada fuese del 70 %, necesitaría $54.000.000 COP de cuota inicial y un crédito de $126.000.000 COP. Sus ahorros quedarían casi agotados, por lo que debe presupuestar trámites antes de separar.",
        "consejoExperto": "Empieza con una asesoría de capacidad de pago y un presupuesto de gastos de cierre. Escoge vivienda solo después de conocer tu rango financiero real."
    },
    {
        "id": 2,
        "slug": "diferencias-vis-vip-no-vis",
        "titulo": "VIS, VIP y No VIS: diferencias esenciales",
        "categoria": "Tipos de vivienda",
        "descripcion": "Comprende cómo se clasifican los inmuebles y por qué esa clasificación afecta las opciones de financiación y subsidios.",
        "puntosClave": [
            "VIS y VIP tienen topes definidos por norma.",
            "No VIS se rige por otras condiciones comerciales.",
            "Los topes pueden depender del año y del municipio."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "VIS significa vivienda de interés social y VIP vivienda de interés prioritario. Son categorías establecidas por la normativa colombiana para atender necesidades habitacionales y se definen, entre otros elementos, mediante topes de precio expresados en salarios mínimos legales mensuales vigentes.",
            "La VIP tiene un límite más bajo que la VIS. En VIS pueden existir topes generales y excepciones territoriales previstas por la regulación, por eso no conviene usar una cifra fija en pesos para todos los municipios o años. No VIS identifica inmuebles que no pertenecen a esas categorías.",
            "La clasificación influye en el precio, en las posibles rutas de subsidio y en algunos criterios de financiación. Sin embargo, que un apartamento sea VIS no significa que el comprador reciba automáticamente un beneficio. Revisa condiciones de ingresos, elegibilidad y disponibilidad de cada programa."
        ],
        "ejemploPractico": "Caso hipotético: comparas un apartamento VIS de $210.000.000 COP con uno No VIS de $320.000.000 COP. Con un aporte inicial del 30 %, necesitarías $63.000.000 COP para el primero y $96.000.000 COP para el segundo. Confirma la clasificación legal y los porcentajes realmente aprobables.",
        "consejoExperto": "Pide a la constructora la clasificación del proyecto y verifica el tope vigente para el municipio y la fecha de escrituración antes de calcular subsidios."
    },
    {
        "id": 3,
        "slug": "leasing-vs-credito-hipotecario",
        "titulo": "Leasing o crédito hipotecario: ¿cuál elegir?",
        "categoria": "Comparativas",
        "descripcion": "Revisa las diferencias de titularidad, pagos y opción de compra para decidir según tus objetivos.",
        "puntosClave": [
            "La propiedad del inmueble funciona distinto.",
            "Compara canon, cuota, plazo y gastos.",
            "Solicita ambas simulaciones si calificas."
        ],
        "tiempoLectura": "5 min",
        "contenidoDetallado": [
            "En un crédito hipotecario tú compras la vivienda y la entregas como garantía de la obligación. En el leasing habitacional la entidad financiera conserva la propiedad mientras pagas cánones y, si cumples lo pactado, puedes ejercer una opción de compra al finalizar o según las reglas del contrato.",
            "Ambas opciones sirven para financiar vivienda, pero difieren en estructura legal y costos. Analiza quién figura como propietario, cuánto pagas inicialmente, cuáles seguros necesitas, el valor de la opción de compra y cómo se gestionan pagos anticipados o la terminación del contrato.",
            "No hay una modalidad mejor para todas las personas. Una cuota hipotecaria más alta puede resultar preferible si buscas cierta estructura de propiedad; un leasing podría ajustarse a otras necesidades. La decisión requiere comparar simulaciones totales y leer cuidadosamente las cláusulas de ambas alternativas."
        ],
        "ejemploPractico": "Caso hipotético: para un inmueble de $300.000.000 COP, una hipoteca del 70 % prestaría $210.000.000 COP y exigiría $90.000.000 COP iniciales. Un leasing hipotético que financie $240.000.000 COP requeriría $60.000.000 COP al inicio, pero también tendría cánones y una opción de compra que deben sumarse al costo.",
        "consejoExperto": "Solicita que ambas propuestas incluyan todo lo que pagarás: aporte inicial, pagos periódicos, seguros, impuestos y valor final para adquirir el inmueble."
    },
    {
        "id": 4,
        "slug": "documentos-solicitar-credito-vivienda",
        "titulo": "Documentos habituales para solicitar crédito de vivienda",
        "categoria": "Trámites y documentos",
        "descripcion": "Prepara una carpeta clara según tu situación laboral para evitar reprocesos durante el estudio.",
        "puntosClave": [
            "Identificación y formulario de solicitud.",
            "Soportes de ingresos o actividad económica.",
            "Documentación del inmueble cuando corresponda."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "La entidad necesita identificar quién solicita el crédito y comprobar cómo obtiene sus ingresos. Por eso suele pedir documento de identidad, formularios, autorizaciones de consulta y soportes financieros. La lista exacta cambia según el banco y el perfil del solicitante.",
            "Para una persona empleada suelen ser útiles las certificaciones laborales y los desprendibles de nómina; para una independiente, declaraciones, extractos y soportes de su actividad. Si solicitas con otra persona, normalmente también se estudia su información y sus obligaciones.",
            "Cuando la operación avanza, pueden solicitar documentos del inmueble: certificados, promesa de compraventa y demás soportes del vendedor o proyecto. Entregar archivos legibles, vigentes y coherentes evita correcciones que pueden retrasar el estudio o la aprobación."
        ],
        "ejemploPractico": "Caso hipotético: Felipe tiene ingresos de nómina por $4.200.000 COP y recibe otros $800.000 COP por trabajos independientes. Para que la entidad evalúe ambos conceptos tendrá que soportarlos conforme a sus políticas; no debe asumir que la totalidad de $5.000.000 COP será aceptada automáticamente.",
        "consejoExperto": "Organiza una carpeta digital con identidad, ingresos, extractos y documentos de propiedad. Revisa fechas y nombres antes de enviarla."
    },
    {
        "id": 5,
        "slug": "gastos-ocultos-comprar-vivienda",
        "titulo": "Los gastos que debes calcular al comprar vivienda",
        "categoria": "Ahorro y presupuesto",
        "descripcion": "No todo termina con la cuota inicial: conoce los rubros que pueden aparecer antes y después de firmar.",
        "puntosClave": [
            "Avalúo y estudio de títulos.",
            "Notaría, impuestos y registro.",
            "Seguros y costos de administración."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "Muchos compradores ahorran para la cuota inicial, pero olvidan que escriturar y registrar una vivienda implica gastos adicionales. Entre los posibles conceptos están avalúo, estudio de títulos, costos notariales, registro, impuestos y seguros asociados a la financiación.",
            "El monto final depende del precio del inmueble, la ubicación, el tipo de operación y lo que corresponda legalmente a comprador y vendedor. Además, una vivienda usada puede necesitar reparaciones y una nueva puede tener gastos de adecuación, mudanza y administración.",
            "El mejor momento para conocer esos gastos es antes de firmar la separación o promesa. Pide estimaciones por escrito y construye una reserva que no se mezcle con la cuota inicial. Si el dinero solo alcanza para el precio, el cierre podría complicarse."
        ],
        "ejemploPractico": "Caso hipotético: una vivienda cuesta $260.000.000 COP, con cuota inicial del 30 %: $78.000.000 COP. Si el comprador separa además $9.000.000 COP para trámites y contingencias como reserva ilustrativa, su meta de ahorro sería $87.000.000 COP. Los costos reales deben cotizarse con las partes involucradas.",
        "consejoExperto": "Antes de firmar, solicita a banco, notaría y vendedor un desglose escrito de pagos, fechas y quién asume cada concepto."
    },
    {
        "id": 6,
        "slug": "comprar-vivienda-desde-exterior",
        "titulo": "Comprar vivienda en Colombia desde el exterior",
        "categoria": "Colombianos en el exterior",
        "descripcion": "Conoce los puntos que conviene revisar si recibes ingresos fuera de Colombia y quieres financiar una vivienda en el país.",
        "puntosClave": [
            "Pregunta qué monedas e ingresos aceptan.",
            "Prepara documentos y validaciones requeridas.",
            "Confirma trámites de firma y representación."
        ],
        "tiempoLectura": "5 min",
        "contenidoDetallado": [
            "Comprar desde otro país es posible cuando encuentras una entidad que evalúe tu perfil y acepte la procedencia de tus ingresos. No todas estudian los mismos países, monedas o tipos de contrato laboral, por lo que el primer paso es consultar requisitos específicos para residentes en el exterior.",
            "La entidad puede pedir documentos de identificación, declaración o certificación de ingresos, extractos y traducciones o legalizaciones cuando correspondan. También tendrás que coordinar la promesa, los poderes de representación y las firmas requeridas en Colombia, según la operación.",
            "Considera el riesgo cambiario: si recibes dinero en otra moneda y tu obligación se paga en pesos colombianos, la tasa de cambio puede afectar tu presupuesto. Calcula además transferencias internacionales, comisiones y los gastos del inmueble aunque no vayas a ocuparlo de inmediato."
        ],
        "ejemploPractico": "Caso hipotético: una colombiana en el exterior acredita ingresos equivalentes a $10.000.000 COP al mes y planea una cuota de $2.800.000 COP para una vivienda en Colombia. Debe validar si el banco acepta esos ingresos y presupuestar cambios de tasa de cambio y costos de transferencia antes de comprometerse.",
        "consejoExperto": "Consulta primero qué entidades reciben tu país de residencia y tipo de ingreso. Prepara los soportes y define quién podrá atender trámites presenciales si se requieren."
    },
    {
        "id": 7,
        "slug": "mejorar-condiciones-hipoteca",
        "titulo": "¿Te conviene trasladar tu crédito hipotecario?",
        "categoria": "Optimización del crédito",
        "descripcion": "La compra de cartera puede ser útil si otra entidad ofrece condiciones que mejoren tu situación financiera.",
        "puntosClave": [
            "Compara tasa y cuota bajo el mismo plazo.",
            "Incluye gastos de traslado y seguros.",
            "Calcula el ahorro a lo largo de la obligación."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "Trasladar una hipoteca mediante compra de cartera significa contratar una nueva obligación con una entidad que cancela la deuda anterior. Puede resultar conveniente si obtienes una tasa, un plazo o una cuota que se ajuste mejor a tus objetivos, pero la nueva oferta debe estudiarse completa.",
            "Compara el saldo actual, los meses restantes, la tasa, los seguros y los gastos de formalización o levantamiento de garantías cuando correspondan. Si la nueva cuota disminuye porque amplías el plazo, podrías terminar pagando más intereses, aunque el pago mensual parezca mejor.",
            "Antes de aceptar el traslado, solicita el saldo de cancelación de tu crédito actual y una tabla de pagos de la alternativa nueva. Incluye los costos de la operación y calcula en cuántos meses se recuperarían. Así separas ahorro verdadero de una simple reducción temporal de la cuota."
        ],
        "ejemploPractico": "Caso hipotético: debes $160.000.000 COP y la nueva entidad te ofrece bajar la cuota de $1.900.000 COP a $1.720.000 COP, manteniendo el mismo plazo restante y coberturas comparables. La diferencia sería $180.000 COP mensuales. Si cambiarte costara $3.600.000 COP, recuperarías ese gasto en 20 meses, antes de revisar otros cambios.",
        "consejoExperto": "Compara ambas tablas con igual plazo restante. No traslades el crédito sin estimar el ahorro neto y revisar todos los cargos asociados."
    },
    {
        "id": 8,
        "slug": "como-validar-subsidios-vivienda",
        "titulo": "Cómo comprobar si puedes acceder a un subsidio",
        "categoria": "Subsidios y beneficios",
        "descripcion": "Antes de contar con un apoyo en tu presupuesto, verifica la convocatoria, tus requisitos y el estado real de la asignación.",
        "puntosClave": [
            "Consulta siempre una fuente oficial.",
            "Confirma cupos, vigencia y condiciones.",
            "No comprometas dinero sin validar el beneficio."
        ],
        "tiempoLectura": "4 min",
        "contenidoDetallado": [
            "Un subsidio de vivienda es un apoyo sujeto a condiciones específicas, no un descuento automático por comprar un apartamento. Cada programa establece quién puede postularse, qué inmuebles aplican, cuáles documentos exige y de dónde provienen los recursos.",
            "Consulta fuentes oficiales como Minvivienda, el Fondo Nacional del Ahorro y tu caja de compensación. En particular, el FNA informa la suspensión de nuevas postulaciones a Mi Casa Ya; no conviene construir una promesa de pago suponiendo que ese beneficio está abierto.",
            "También distingue entre postularse, resultar habilitado y recibir una asignación. Antes de usar el subsidio como parte de la cuota inicial, confirma la disponibilidad, las condiciones para el desembolso y la compatibilidad con otros apoyos que estés considerando."
        ],
        "ejemploPractico": "Caso hipotético: un hogar planea comprar vivienda por $190.000.000 COP y espera un subsidio de $35.000.000 COP. Sin asignación confirmada, ese dinero no debe incluirse como disponible. Si cuenta con $25.000.000 COP de ahorros, primero debe verificar cómo completaría la cuota inicial y los gastos aun sin el apoyo.",
        "consejoExperto": "Solicita la respuesta oficial de elegibilidad y disponibilidad del programa antes de comprometer dinero. Conserva constancias de postulación y asignación."
    },
    {
        "id": 9,
        "slug": "comprar-vivienda-sobre-planos",
        "titulo": "Comprar vivienda sobre planos: revisa esto antes de separar",
        "categoria": "Compra segura",
        "descripcion": "Aprende a evaluar los plazos, pagos y documentos de un proyecto que todavía está en construcción.",
        "puntosClave": [
            "Consulta la información del proyecto y del constructor.",
            "Revisa precio, reajustes y fechas de entrega.",
            "Entiende las reglas de desistimiento y devolución."
        ],
        "tiempoLectura": "6 min",
        "contenidoDetallado": [
            "Comprar sobre planos significa comprometerse con un inmueble que se entregará en el futuro. Puede permitir pagar la cuota inicial por etapas, pero exige verificar la información del constructor, del proyecto y de la operación antes de entregar dinero.",
            "Revisa la separación y la promesa de compraventa: precio, forma de pago, posibles reajustes, fecha estimada de entrega, especificaciones del inmueble y consecuencias de retrasos o desistimientos. En proyectos VIS, pregunta cómo se determinará el precio definitivo si se expresa en salarios mínimos.",
            "Al acercarse la entrega, necesitarás coordinar el crédito, la documentación y la escrituración. Si tu capacidad de pago cambia entre la separación y la aprobación final, podrías necesitar más recursos propios. Por eso conviene hacer seguimiento al ahorro y mantener una reserva durante la construcción."
        ],
        "ejemploPractico": "Caso hipotético: separas un apartamento anunciado por $240.000.000 COP y acuerdas pagar $72.000.000 COP de cuota inicial durante 24 meses. Sin contar lo ya abonado al separar, el promedio sería $3.000.000 COP mensuales para completar esa cuota. Confirma por contrato si el precio puede cambiar y reserva gastos de cierre.",
        "consejoExperto": "Pide copia de la separación y de las condiciones del proyecto antes de pagar. Pregunta por reajustes, fechas, penalidades y manejo de los recursos entregados."
    }
];

// Alias para importar los artículos del blog
export const blog = articulosBlog;

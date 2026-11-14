/**
 * Vivienco | Datos para el sitio web
 *
 * Se conservan las exportaciones y propiedades originales de bancosAliados
 * e integrantesEquipo para no afectar componentes existentes.
 *
 * IMPORTANTE ANTES DE PUBLICAR:
 * - Las tasasEA y los topes/plazos numéricos originales son datos de ejemplo:
 *   NO constituyen una cotización, oferta ni condiciones bancarias vigentes.
 * - financiacionMax resume los porcentajes referenciales de CRÉDITO HIPOTECARIO
 *   del archivo original. Las condiciones del leasing pueden ser diferentes.
 * - Verificar las alianzas comerciales, logos y condiciones con cada entidad.
 * - Los integrantes son perfiles de ejemplo, no personas verificadas.
 * - El WhatsApp 573003398593 es el número de FORMATO proporcionado como
 *   ejemplo. Confirmar y reemplazar por los contactos autorizados de Vivienco.
 * - Los subsidios dependen de los requisitos, cupos y normas aplicables.
 *
 * Revisión editorial de los contenidos: noviembre de 2026.
 */

/* -------------------------------------------------------------------------- */
/* Bancos aliados                                                              */
/* -------------------------------------------------------------------------- */

export const bancosAliados = [
    {
        id: 1,
        nombre: "AV Villas",
        tasaEA: 11.5,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 20,
        descripcion:
            "AV Villas ofrece soluciones para financiar la compra de vivienda y alternativas de leasing habitacional No VIS. Su oferta de leasing contempla cánones periódicos y la posibilidad de ejercer una opción de compra.",
        financiacionMax: "Hasta 80% en VIS y 70% en No VIS",
        plazoMax: "Hasta 20 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Banco_AV_Villas_logo.svg",
        sitioWeb: "https://www.avvillas.com.co",
        fuenteUrl: "https://www.avvillas.com.co/productos-en-oficina/credito-para-vivienda/leasing-habitacional-familiar"
    },
    {
        id: 2,
        nombre: "Bancolombia",
        tasaEA: 10.5,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 30,
        descripcion:
            "Bancolombia dispone de crédito hipotecario y leasing habitacional para comprar vivienda nueva o usada. Su portafolio permite comparar modalidades de financiación y gestionar diferentes etapas del proceso por canales digitales.",
        financiacionMax: "Hasta 80% en VIS y 70% en No VIS",
        plazoMax: "Hasta 30 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Bancolombia_S.A._logo.svg",
        sitioWeb: "https://www.bancolombia.com",
        fuenteUrl: "https://www.bancolombia.com/personas/comprar-y-vender-casa/comparador-prestamos-para-vivienda"
    },
    {
        id: 3,
        nombre: "Banco de Bogotá",
        tasaEA: 11.2,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 30,
        descripcion:
            "Banco de Bogotá ofrece crédito hipotecario y leasing habitacional para la adquisición de inmuebles nuevos o usados. También cuenta con herramientas digitales para solicitar financiación y explorar opciones como compra de cartera.",
        financiacionMax: "Hasta 80% en VIS y 70% en No VIS",
        plazoMax: "Hasta 30 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_2.0_banco_de_bogota.png",
        sitioWeb: "https://www.bancodebogota.com",
        fuenteUrl: "https://oficinaviviendadigital.bancodebogota.com.co/"
    },
    {
        id: 4,
        nombre: "Banco de Occidente",
        tasaEA: 11.8,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 20,
        descripcion:
            "Banco de Occidente ofrece crédito hipotecario y leasing habitacional para viviendas nuevas y usadas. Su portafolio también contempla alternativas para colombianos que residen en el exterior y desean adquirir vivienda en el país.",
        financiacionMax: "Hasta 80% en VIS y 70% en No VIS",
        plazoMax: "Hasta 20 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Banco_de_Occidente_logo.svg",
        sitioWeb: "https://www.bancodeoccidente.com.co",
        fuenteUrl: "https://webavc.bancodeoccidente.com.co/wps/portal/banco-de-occidente/bancodeoccidente/para-personas/creditos/vivienda/"
    },
    {
        id: 5,
        nombre: "Itaú",
        tasaEA: 12.1,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 20,
        descripcion:
            "Itaú presenta opciones de crédito hipotecario para proyectos de vivienda No VIS, además de leasing habitacional. Estas alternativas permiten estudiar la financiación de viviendas nuevas o usadas según las condiciones del solicitante.",
        financiacionMax: "Hasta 70% en crédito hipotecario No VIS (referencial)",
        plazoMax: "Hasta 20 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/ITAU_LOGO.svg",
        sitioWeb: "https://banco.itau.co",
        fuenteUrl: "https://banco.itau.co/es-AR/web/personas/prestamos"
    },
    {
        id: 6,
        nombre: "Credifamilia",
        tasaEA: 13.2,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 20,
        descripcion:
            "Credifamilia es una entidad especializada en crédito hipotecario para adquirir o remodelar vivienda nueva o usada. Su proceso digital facilita la solicitud y la evaluación inicial para diferentes perfiles de ingresos.",
        financiacionMax: "Hasta 80% en VIS y 70% en No VIS",
        plazoMax: "Hasta 20 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_de_Credifamilia.png",
        sitioWeb: "https://credifamilia.com",
        fuenteUrl: "https://credifamilia.com/credito/hipotecario"
    },
    {
        id: 7,
        nombre: "Banco Caja Social",
        tasaEA: 10.9,
        financiacionVIS: 80,
        financiacionNoVIS: 70,
        plazoMaximoAnios: 30,
        descripcion:
            "Banco Caja Social ofrece crédito hipotecario para adquirir vivienda nueva o usada, tanto VIS como No VIS. Su portafolio incluye compra de cartera hipotecaria, aunque actualmente no ofrece leasing habitacional.",
        financiacionMax: "Hasta 80% en VIS y 70% en No VIS",
        plazoMax: "Hasta 30 años",
        logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Banco_Caja_Social_logo.svg",
        sitioWeb: "https://www.bancocajasocial.com",
        fuenteUrl: "https://www.bancocajasocial.com/centro-de-ayuda/creditos-y-tarjetas/como-funciona-el-leasing-habitacional/"
    }
];

/* -------------------------------------------------------------------------- */
/* Equipo de especialistas (perfiles de ejemplo)                               */
/* -------------------------------------------------------------------------- */

export const integrantesEquipo = [
    {
        id: 1,
        nombre: "Laura Martínez",
        cargo: "Asesora Especialista en Crédito Hipotecario",
        trayectoria:
            "Experiencia en asesoría financiera, estudios de crédito y acompañamiento a familias en la compra de vivienda.",
        fotoUrl: "",
        whatsapp: "573003398593",
        especialidad: "Especialista en Vivienda VIS y Subsidios"
    },
    {
        id: 2,
        nombre: "Andrés Rojas",
        cargo: "Bróker de Crédito de Vivienda",
        trayectoria:
            "Especialista en análisis de capacidad de endeudamiento, comparación de alternativas bancarias y financiación VIS y No VIS.",
        fotoUrl: "",
        whatsapp: "573003398593",
        especialidad: "Especialista en Leasing Habitacional y No VIS"
    },
    {
        id: 3,
        nombre: "Camila Torres",
        cargo: "Coordinadora de Procesos Hipotecarios",
        trayectoria:
            "Experiencia en gestión documental, seguimiento de solicitudes y acompañamiento durante el proceso de aprobación y desembolso.",
        fotoUrl: "",
        whatsapp: "573003398593",
        especialidad: "Especialista en Compra de Cartera y Colombianos en el Exterior"
    }
];

/* -------------------------------------------------------------------------- */
/* Educación financiera                                                        */
/* Cada elemento está listo para una tarjeta: categoría, resumen y viñetas.    */
/* -------------------------------------------------------------------------- */

export const educacionFinanciera = [
    {
        id: 1,
        slug: "credito-hipotecario",
        titulo: "¿Qué es un crédito hipotecario?",
        categoria: "Conceptos básicos",
        descripcion:
            "Es un préstamo para comprar vivienda en el que el inmueble respalda la obligación mientras pagas la deuda.",
        puntosClave: [
            "Pagas capital, intereses y seguros aplicables.",
            "La entidad evalúa ingresos y capacidad de pago.",
            "El inmueble queda como garantía hipotecaria."
        ],
        tiempoLectura: "3 min"
    },
    {
        id: 2,
        slug: "leasing-habitacional",
        titulo: "¿Cómo funciona el leasing habitacional?",
        categoria: "Tipos de financiación",
        descripcion:
            "Es una alternativa en la que la entidad financiera conserva la propiedad del inmueble durante el contrato y pacta una opción de compra.",
        puntosClave: [
            "Pagas un canon mensual.",
            "La opción de compra se acuerda por contrato.",
            "La financiación depende de la entidad y del perfil."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 3,
        slug: "credito-en-pesos-o-uvr",
        titulo: "Crédito en pesos vs. UVR",
        categoria: "Tasas y cuotas",
        descripcion:
            "La modalidad de pago influye en cómo evoluciona la cuota y en los riesgos que asumes durante el plazo.",
        puntosClave: [
            "En pesos, revisa el sistema de amortización.",
            "La UVR cambia con la inflación.",
            "Compara el costo total, no solo la primera cuota."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 4,
        slug: "capacidad-de-endeudamiento",
        titulo: "Calcula tu capacidad de endeudamiento",
        categoria: "Planeación financiera",
        descripcion:
            "Antes de solicitar financiación, identifica cuánto puedes pagar mensualmente sin comprometer tus gastos esenciales.",
        puntosClave: [
            "Suma ingresos demostrables del hogar.",
            "Resta obligaciones y gastos recurrentes.",
            "Reserva dinero para imprevistos."
        ],
        tiempoLectura: "3 min"
    },
    {
        id: 5,
        slug: "cuota-inicial-y-gastos",
        titulo: "Cuota inicial y gastos de compra",
        categoria: "Planeación financiera",
        descripcion:
            "Además de la cuota inicial, comprar vivienda puede implicar costos de avalúo, estudio de títulos, escrituración y registro.",
        puntosClave: [
            "Define cuánto necesitas ahorrar.",
            "Presupuesta trámites y seguros.",
            "Consulta los costos exactos antes de firmar."
        ],
        tiempoLectura: "3 min"
    },
    {
        id: 6,
        slug: "tasas-de-interes-ea",
        titulo: "Aprende a comparar tasas de interés",
        categoria: "Tasas y cuotas",
        descripcion:
            "La tasa efectiva anual (E. A.) ayuda a contrastar ofertas, pero no reemplaza la comparación completa del crédito.",
        puntosClave: [
            "Compara ofertas en la misma modalidad.",
            "Revisa plazo, seguros y cargos asociados.",
            "Solicita una simulación personalizada."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 7,
        slug: "historial-crediticio",
        titulo: "Prepara tu perfil crediticio",
        categoria: "Preparación para el crédito",
        descripcion:
            "Un buen manejo de tus obligaciones y soportes financieros puede facilitar el análisis de una solicitud hipotecaria.",
        puntosClave: [
            "Paga tus obligaciones oportunamente.",
            "Evita asumir deudas innecesarias.",
            "Ten a mano tus soportes de ingresos."
        ],
        tiempoLectura: "3 min"
    },
    {
        id: 8,
        slug: "abonos-a-capital-y-compra-de-cartera",
        titulo: "Abonos a capital y compra de cartera",
        categoria: "Optimización del crédito",
        descripcion:
            "Conoce dos alternativas para reorganizar el costo o el plazo de una obligación hipotecaria existente.",
        puntosClave: [
            "Consulta cómo aplicar abonos a capital.",
            "Compara las condiciones de traslado de deuda.",
            "Incluye costos de cambio y seguros en el cálculo."
        ],
        tiempoLectura: "4 min"
    }
];

/* -------------------------------------------------------------------------- */
/* Subsidios y coberturas                                                       */
/* Estados informativos: NO equivalen a una confirmación de disponibilidad.     */
/* -------------------------------------------------------------------------- */

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

/* Alias opcional para páginas que prefieran un nombre más descriptivo. */
export const subsidiosVivienda = subsidios;

/* -------------------------------------------------------------------------- */
/* Blog / biblioteca de artículos introductorios                               */
/* Los textos son propuestas editoriales, no publicaciones fechadas.           */
/* -------------------------------------------------------------------------- */

export const articulosBlog = [
    {
        id: 1,
        slug: "guia-primer-credito-hipotecario",
        titulo: "Tu primer crédito hipotecario: ¿por dónde empezar?",
        categoria: "Guías para comprar",
        descripcion:
            "Una ruta sencilla para ordenar tus finanzas, comparar opciones y preparar tu solicitud de vivienda.",
        puntosClave: [
            "Calcula tu presupuesto real.",
            "Reúne documentos e ingresos verificables.",
            "Compara simulaciones de varias entidades."
        ],
        tiempoLectura: "5 min"
    },
    {
        id: 2,
        slug: "diferencias-vis-vip-no-vis",
        titulo: "VIS, VIP y No VIS: diferencias esenciales",
        categoria: "Tipos de vivienda",
        descripcion:
            "Comprende cómo se clasifican los inmuebles y por qué esa clasificación afecta las opciones de financiación y subsidios.",
        puntosClave: [
            "VIS y VIP tienen topes definidos por norma.",
            "No VIS se rige por otras condiciones comerciales.",
            "Los topes pueden depender del año y del municipio."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 3,
        slug: "leasing-vs-credito-hipotecario",
        titulo: "Leasing o crédito hipotecario: ¿cuál elegir?",
        categoria: "Comparativas",
        descripcion:
            "Revisa las diferencias de titularidad, pagos y opción de compra para decidir según tus objetivos.",
        puntosClave: [
            "La propiedad del inmueble funciona distinto.",
            "Compara canon, cuota, plazo y gastos.",
            "Solicita ambas simulaciones si calificas."
        ],
        tiempoLectura: "5 min"
    },
    {
        id: 4,
        slug: "documentos-solicitar-credito-vivienda",
        titulo: "Documentos habituales para solicitar crédito de vivienda",
        categoria: "Trámites y documentos",
        descripcion:
            "Prepara una carpeta clara según tu situación laboral para evitar reprocesos durante el estudio.",
        puntosClave: [
            "Identificación y formulario de solicitud.",
            "Soportes de ingresos o actividad económica.",
            "Documentación del inmueble cuando corresponda."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 5,
        slug: "gastos-ocultos-comprar-vivienda",
        titulo: "Los gastos que debes calcular al comprar vivienda",
        categoria: "Ahorro y presupuesto",
        descripcion:
            "No todo termina con la cuota inicial: conoce los rubros que pueden aparecer antes y después de firmar.",
        puntosClave: [
            "Avalúo y estudio de títulos.",
            "Notaría, impuestos y registro.",
            "Seguros y costos de administración."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 6,
        slug: "comprar-vivienda-desde-exterior",
        titulo: "Comprar vivienda en Colombia desde el exterior",
        categoria: "Colombianos en el exterior",
        descripcion:
            "Conoce los puntos que conviene revisar si recibes ingresos fuera de Colombia y quieres financiar una vivienda en el país.",
        puntosClave: [
            "Pregunta qué monedas e ingresos aceptan.",
            "Prepara documentos y validaciones requeridas.",
            "Confirma trámites de firma y representación."
        ],
        tiempoLectura: "5 min"
    },
    {
        id: 7,
        slug: "mejorar-condiciones-hipoteca",
        titulo: "¿Te conviene trasladar tu crédito hipotecario?",
        categoria: "Optimización del crédito",
        descripcion:
            "La compra de cartera puede ser útil si otra entidad ofrece condiciones que mejoren tu situación financiera.",
        puntosClave: [
            "Compara tasa y cuota bajo el mismo plazo.",
            "Incluye gastos de traslado y seguros.",
            "Calcula el ahorro a lo largo de la obligación."
        ],
        tiempoLectura: "4 min"
    },
    {
        id: 8,
        slug: "como-validar-subsidios-vivienda",
        titulo: "Cómo comprobar si puedes acceder a un subsidio",
        categoria: "Subsidios y beneficios",
        descripcion:
            "Antes de contar con un apoyo en tu presupuesto, verifica la convocatoria, tus requisitos y el estado real de la asignación.",
        puntosClave: [
            "Consulta siempre una fuente oficial.",
            "Confirma cupos, vigencia y condiciones.",
            "No comprometas dinero sin validar el beneficio."
        ],
        tiempoLectura: "4 min"
    }
];

/* Alias de compatibilidad para componentes que usen el nombre blog. */
export const blog = articulosBlog;

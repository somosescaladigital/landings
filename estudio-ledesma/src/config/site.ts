/**
 * ESTUDIO LEDESMA & ASOCIADOS - CONFIGURACIÓN CENTRALIZADA (site.ts)
 * 
 * Este archivo centraliza la configuración completa para adaptar la landing
 * a cualquier nuevo cliente profesional (abogado o contador) en minutos.
 */

export type StudioBranch = 'juridico' | 'contable';

export interface StudioConfig {
  branch: StudioBranch;
  name: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;            // Formato visible: (011) 5555-0192
    whatsappRaw: string;      // Formato internacional sin símbolos: 5491155550192
    whatsappFormatted: string;// Formato legible: +54 9 11 5555-0192
    email: string;
    address: string;
    hours: string;
    mapsEmbedUrl: string;
  };
  branding: {
    palette: {
      primary: string;        // Hierro / Carbón
      accent: string;         // Ámbar / Mostaza
      secondary: string;      // Terracota / Esmeralda
      travertine: string;     // Fondo marfil cálido
    };
    typography: {
      serif: string;
      sans: string;
    };
  };
  hero: {
    badge: string;
    titleMain: string;
    titleAccent: string;
    subtitle: string;
    trustBullet1: string;
    trustBullet2: string;
  };
  quickChips: Array<{
    id: string;
    label: string;
    subject: string;
    prompt: string;
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    badge: string;
    isFeatured?: boolean;
  }>;
  processSteps: Array<{
    step: string;
    phase: string;
    title: string;
    description: string;
  }>;
  differentiators: Array<{
    title: string;
    description: string;
  }>;
  team: Array<{
    name: string;
    role: string;
    registration: string;
    bio: string;
    photo: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    schemaType: 'LegalService' | 'AccountingService';
  };
}

/* ==========================================================================
   CONFIGURACIÓN JURÍDICA
   ========================================================================== */
export const juridicoConfig: StudioConfig = {
  branch: 'juridico',
  name: 'Estudio Ledesma & Asociados',
  tagline: 'ESTUDIO JURÍDICO BOUTIQUE',
  description: 'Defensa legal estratégica de autor en Buenos Aires. Derecho laboral, sucesiones, daños y previsión con trato directo y honorarios transparentes.',
  contact: {
    phone: '(011) 5555-0192',
    whatsappRaw: '5491155550192',
    whatsappFormatted: '+54 9 11 5555-0192',
    email: 'consultas@estudioledesma.com.ar',
    address: 'Av. Corrientes 1450, Piso 6, CABA',
    hours: 'Lunes a Viernes de 9:00 a 18:00 hs',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016824982626!2d-58.38870192348332!3d-34.60373887295484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf1d1b9979%3A0xc39f75ec56bf4749!2sAv.%20Corrientes%201450%2C%20C1042AAZ%20CABA!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar'
  },
  branding: {
    palette: {
      primary: '#141416',
      accent: '#d99424',
      secondary: '#7c3520',
      travertine: '#f8f5ef'
    },
    typography: {
      serif: 'Playfair Display',
      sans: 'Plus Jakarta Sans'
    }
  },
  hero: {
    badge: 'Estudio Jurídico en Buenos Aires • Trato 1 a 1',
    titleMain: 'Defensa legal de autor:',
    titleAccent: 'estrategia personalizada para resguardar lo suyo.',
    subtitle: 'Abordamos cada causa con rigor artesanal, contacto directo con socios matriculados y honorarios sin letras chicas.',
    trustBullet1: 'Primera orientación confidencial',
    trustBullet2: 'Matriculados CPACF / CASI'
  },
  quickChips: [
    {
      id: 'laboral',
      label: '💼 Despido o Empleo',
      subject: 'Derecho Laboral y Despidos',
      prompt: 'Hola, me despidieron / tengo un reclamo laboral y necesito asesoramiento con urgencia.'
    },
    {
      id: 'sucesion',
      label: '📜 Sucesión o Familia',
      subject: 'Familia, Divorcios o Sucesiones',
      prompt: 'Hola, deseo iniciar un trámite de sucesión / divorcio y consultar plazos y costos.'
    },
    {
      id: 'previsional',
      label: '⏳ Jubilación ANSES',
      subject: 'Previsional y Jubilaciones',
      prompt: 'Hola, quiero consultar por una jubilación con o sin aportes en ANSES.'
    },
    {
      id: 'accidentes',
      label: '🚗 Accidente o ART',
      subject: 'Accidentes de Tránsito o ART',
      prompt: 'Hola, sufrí un accidente de tránsito / laboral y requiero reclamo indemnizatorio.'
    },
    {
      id: 'contratos',
      label: '🏢 Contratos',
      subject: 'Contratos y Comercial',
      prompt: 'Hola, requiero confección o revisión de un contrato comercial.'
    }
  ],
  services: [
    {
      id: 'laboral',
      title: 'Derecho Laboral e Indemnizaciones',
      description: 'Defensa integral ante despidos incausados, empleo no registrado («en negro») o deficientemente registrado, horas extras adeudadas y mediación ágil ante el SECLO.',
      badge: 'ÁREA PRINCIPAL',
      isFeatured: true
    },
    {
      id: 'familia',
      title: 'Sucesiones y Familia',
      description: 'Declaratorias de herederos, venta por tracto abreviado, convenios de partición, divorcios y régimen de alimentos.',
      badge: 'CIVIL'
    },
    {
      id: 'previsional',
      title: 'Previsional y Jubilaciones',
      description: 'Jubilaciones con moratoria, pensiones contributivas y reclamos judiciales de reajuste histórico de haberes.',
      badge: 'ANSES'
    },
    {
      id: 'accidentes',
      title: 'Daños y Accidentes',
      description: 'Accidentes viales y de trabajo. Negociación directa ante compañías aseguradoras y comisiones médicas de ART.',
      badge: 'SEGUROS & ART'
    },
    {
      id: 'contratos',
      title: 'Contratos y Comercial',
      description: 'Redacción y blindaje de acuerdos comerciales, locaciones complejas, rescisiones y cobranza de deudas.',
      badge: 'EMPRESAS'
    },
    {
      id: 'penal',
      title: 'Defensa Penal Técnica y Asistencia en Juzgados',
      description: 'Asistencia letrada urgente en comisarías, indagatorias, excarcelaciones y querellas criminales en fueros nacional y bonaerense.',
      badge: 'URGENCIAS'
    }
  ],
  processSteps: [
    { step: '01', phase: 'FASE INICIAL', title: 'Recepción y Escucha', description: 'Nos reunimos presencialmente en nuestro estudio o por videollamada para analizar su relato y documentación.' },
    { step: '02', phase: 'DIAGNÓSTICO', title: 'Estrategia Legal', description: 'Evaluamos la viabilidad procesal, jurisprudencia y calculamos los escenarios reales antes de presentar.' },
    { step: '03', phase: 'ACUERDO', title: 'Honorarios Claros', description: 'Formalizamos un presupuesto o convenio de cuota litis por escrito sin gastos ocultos.' },
    { step: '04', phase: 'SEGUIMIENTO', title: 'Ejecución y Reporte', description: 'Accionamos de forma inmediata con reportes periódicos por WhatsApp y correo hasta el cobro.' }
  ],
  differentiators: [
    { title: 'Trato directo con los socios', description: 'Su caso no es delegado a pasantes anónimos. Cada estrategia es liderada por socios matriculados.' },
    { title: 'Convenios por escrito sin sorpresas', description: 'Cumplimos rigurosamente la ley arancelaria con condiciones transparentes de cobro.' },
    { title: 'Respuesta ágil vía WhatsApp', description: 'Comunicación fluida y directa para dudas urgentes y notificaciones judiciales.' }
  ],
  team: [
    { name: 'Dr. Martín Ledesma', role: 'Socio Fundador • Litigios Laborales', registration: 'T° 108 F° 412 CPACF / CASI', bio: 'Especialista en despidos complejos, accidentes de trabajo y negociaciones ante SECLO y Cámaras Laborales.', photo: 'assets/equipo-1.webp' },
    { name: 'Dra. Valeria Rossi', role: 'Socia • Familia y Sucesiones', registration: 'T° 95 F° 301 CPACF', bio: 'Enfoque conciliatorio en juicios sucesorios, acuerdos de partición hereditaria y divorcios patrimoniales.', photo: 'assets/equipo-2.webp' },
    { name: 'Dr. Gonzalo Méndez', role: 'Asociado • Previsional y Contratos', registration: 'T° 114 F° 890 CPACF', bio: 'Dedicado a reajustes jubilatorios de haberes en ANSES y confección de contratos comerciales para pymes.', photo: 'assets/equipo-3.webp' }
  ],
  faq: [
    { question: '¿Cómo se pactan los honorarios para un caso laboral o de accidente?', answer: 'En casos laborales y accidentes, trabajamos habitualmente mediante pacto de cuota litis: usted abona un porcentaje del resultado efectivamente obtenido al finalizar el reclamo.' },
    { question: '¿Tiene costo la primera consulta de evaluación?', answer: 'La primera charla de orientación y evaluación de viabilidad no tiene cargo.' },
    { question: '¿Atienden presencialmente o también online?', answer: 'Brindamos ambas opciones. Puede coordinar una reunión presencial en nuestra sede de Av. Corrientes o gestionar todo de forma remota por WhatsApp.' },
    { question: '¿Cuánto tarda una sucesión en resolverse?', answer: 'Una sucesión sin discrepancias entre herederos obtiene la declaratoria de herederos en un promedio de 3 a 5 meses.' },
    { question: '¿Qué debo hacer si me llega una carta documento laboral?', answer: 'Los plazos de respuesta suelen ser de 48 horas hábiles. Es crucial enviarnos una fotografía legible de la notificación de inmediato.' }
  ],
  seo: {
    metaTitle: 'Estudio Ledesma & Asociados | Abogados en Buenos Aires • Atención de Autor',
    metaDescription: 'Estudio jurídico boutique en Buenos Aires. Asesoramiento legal estratégico y personalizado en derecho laboral, sucesiones, accidentes y jubilaciones.',
    canonicalUrl: 'https://estudioledesma.com.ar/juridico/',
    schemaType: 'LegalService'
  }
};

/* ==========================================================================
   CONFIGURACIÓN CONTABLE
   ========================================================================== */
export const contableConfig: StudioConfig = {
  branch: 'contable',
  name: 'Estudio Ledesma & Asociados',
  tagline: 'ESTUDIO CONTABLE BOUTIQUE',
  description: 'Asesoramiento impositivo y contable integral para pymes y profesionales en Argentina. ARCA, nóminas, balances y sociedades.',
  contact: {
    phone: '(011) 5555-0192',
    whatsappRaw: '5491155550192',
    whatsappFormatted: '+54 9 11 5555-0192',
    email: 'contable@estudioledesma.com.ar',
    address: 'Av. Corrientes 1450, Piso 6, CABA',
    hours: 'Lunes a Viernes de 9:00 a 18:00 hs',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016824982626!2d-58.38870192348332!3d-34.60373887295484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf1d1b9979%3A0xc39f75ec56bf4749!2sAv.%20Corrientes%201450%2C%20C1042AAZ%20CABA!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar'
  },
  branding: {
    palette: {
      primary: '#141416',
      accent: '#d99424',
      secondary: '#124a42',
      travertine: '#f8f5ef'
    },
    typography: {
      serif: 'Playfair Display',
      sans: 'Plus Jakarta Sans'
    }
  },
  hero: {
    badge: 'Asesoría Impositiva • Gestión Contable para Empresas',
    titleMain: 'Orden contable y certeza fiscal para',
    titleAccent: 'impulsar su negocio con tranquilidad.',
    subtitle: 'Acompañamos a pymes y directores con un esquema tributario riguroso, puntualidad estricta ante ARCA y atención directa de contadores matriculados.',
    trustBullet1: 'Diagnóstico preliminar sin cargo',
    trustBullet2: 'Matriculados CPCECABA'
  },
  quickChips: [
    { id: 'abono', label: '🏢 Abono Pyme', subject: 'Abono mensual contable para Pyme', prompt: 'Hola, quiero consultar por un abono mensual integral para mi pyme/empresa.' },
    { id: 'arca', label: '📊 Impuestos ARCA', subject: 'Impuestos ARCA / IVA / Ganancias', prompt: 'Hola, necesito asesoramiento para ordenar vencimientos y declaraciones de ARCA / Ingresos Brutos.' },
    { id: 'sueldos', label: '👥 Liquidación de Sueldos', subject: 'Liquidación de Sueldos (F.931)', prompt: 'Hola, requiero cotización para liquidación de sueldos y Libro de Sueldos Digital.' },
    { id: 'sociedades', label: '⚖️ Crear Sociedad', subject: 'Constitución de Sociedad (SRL / SAS)', prompt: 'Hola, deseo constituir una sociedad (SRL/SAS) ante IGJ y consultar plazos y aranceles.' },
    { id: 'balance', label: '📑 Balance & Auditoría', subject: 'Balance Anual y Auditoría', prompt: 'Hola, necesito certificar un balance anual ante el Consejo Profesional.' }
  ],
  services: [
    { id: 'abono', title: 'Abono Mensual Contable e Impositivo para Pymes', description: 'Liquidación mensual de IVA, Ganancias, Ingresos Brutos en AGIP/ARBA, Convenio Multilateral SIFERE y seguimiento de notificaciones oficiales.', badge: 'ABONO INTEGRAL', isFeatured: true },
    { id: 'sueldos', title: 'Liquidación de Sueldos y Cargas', description: 'Cálculo de haberes según convenios colectivos CCT, Libro de Sueldos Digital, Formulario 931 y certificados.', badge: 'NÓMINAS' },
    { id: 'monotributo', title: 'Monotributo y Profesionales', description: 'Inscripciones, recategorizaciones semestrales, facturación electrónica y transición ordenada al Régimen General.', badge: 'AUTÓNOMOS' },
    { id: 'sociedades', title: 'Constitución de Sociedades', description: 'Constitución exprés de SAS, SRL y SA ante IGJ y DPPJ, redacción de estatutos y rúbrica de libros.', badge: 'SOCIETARIO' },
    { id: 'balances', title: 'Balances y Auditoría Contable', description: 'Estados contables anuales, dictámenes de auditor independiente y certificaciones de ingresos legalizadas por CPCECABA.', badge: 'CERTIFICACIONES' },
    { id: 'planificacion', title: 'Planificación Fiscal Legal y Ahorro Tributario', description: 'Estructuración de esquemas financieros y comerciales para optimizar la carga fiscal legítima y evitar retenciones duplicadas.', badge: 'ESTRATÉGICO' }
  ],
  processSteps: [
    { step: '01', phase: 'DIAGNÓSTICO', title: 'Relevamiento Fiscal', description: 'Auditoría rápida del estado de cuentas ante ARCA y organismos provinciales, detectando saldos a favor o contingencias.' },
    { step: '02', phase: 'ESTRUCTURA', title: 'Diseño a Medida', description: 'Configuramos el cronograma operativo y definimos el abono fijo mensual adecuado a la envergadura de su negocio.' },
    { step: '03', phase: 'PUNTUALIDAD', title: 'Liquidación en Término', description: 'Presentamos declaraciones juradas y enviamos volantes de pago (VEP) con anticipación para planificar su flujo de fondos.' },
    { step: '04', phase: 'SOPORTE', title: 'Acompañamiento Continuo', description: 'Monitoreo diario de notificaciones de ARCA y consultas directas con los socios por WhatsApp y reuniones virtuales.' }
  ],
  differentiators: [
    { title: 'Trato directo con contadores socios', description: 'Atención personalizada por contadores matriculados que conocen su operación de primera mano.' },
    { title: 'Cero multas por vencimientos olvidados', description: 'Calendario impositivo riguroso y monitoreo preventivo constante del Domicilio Fiscal Electrónico de ARCA.' },
    { title: 'Operación 100% ágil y en la nube', description: 'Intercambio seguro de comprobantes mediante carpetas en la nube y respuestas por WhatsApp.' }
  ],
  team: [
    { name: 'Cdor. Martín Ledesma', role: 'Socio Fundador • Auditoría y Fiscal', registration: 'T° 230 F° 140 CPCECABA', bio: 'Contador Público (UBA). Especialista en auditoría de estados contables, peritajes económicos y planificación tributaria.', photo: 'assets/equipo-1.webp' },
    { name: 'Cdra. Valeria Rossi', role: 'Socia • Impuestos y Sociedades', registration: 'T° 198 F° 75 CPCECABA', bio: 'Especialista en estructuración societaria ante IGJ, liquidación de impuestos indirectos y regímenes de retención.', photo: 'assets/equipo-2.webp' },
    { name: 'Cdor. Gonzalo Méndez', role: 'Asociado • Nóminas y Monotributo', registration: 'T° 255 F° 112 CPCECABA', bio: 'A cargo de la liquidación de sueldos para empresas con convenios mercantiles e industriales y Libro de Sueldos Digital.', photo: 'assets/equipo-3.webp' }
  ],
  faq: [
    { question: '¿Cómo funciona el servicio de abono contable mensual?', answer: 'Establecemos un honorario mensual fijo y previsible según la estructura de su negocio, incluyendo liquidaciones, presentaciones y soporte diario.' },
    { question: '¿Qué ocurre si estoy cerca del límite del Monotributo?', answer: 'Monitoreamos mensualmente sus ingresos acumulados para evitar exclusiones de oficio y planificar el pasaje al Régimen General con beneficios puente.' },
    { question: '¿Qué documentación se necesita para crear una SRL o SAS?', answer: 'DNI y CUIT de los socios, acreditación de domicilio legal y constancia de capital. Nos encargamos de todo el trámite ante IGJ.' },
    { question: '¿Cómo nos enviamos la documentación cada mes?', answer: 'Habilitamos una carpeta privada en la nube donde sube extractos bancarios y comprobantes, y descarga sus VEP y recibos.' },
    { question: '¿Puedo cambiar de contador a mitad de año?', answer: 'Sí, la transición es habitual y ordenada. Nos comunicamos de colega a colega para solicitar el legajo sin frenar su operatoria.' }
  ],
  seo: {
    metaTitle: 'Estudio Ledesma & Asociados | Asesoría Contable • Tributaria de Autor',
    metaDescription: 'Estudio contable boutique en Buenos Aires. Asesoramiento impositivo estratégico para pymes, liquidación de sueldos, ARCA, balances y constitución de sociedades.',
    canonicalUrl: 'https://estudioledesma.com.ar/contable/',
    schemaType: 'AccountingService'
  }
};

/**
 * Switcher simple para alternar la configuración activa:
 * Cambie 'currentBranch' entre 'juridico' y 'contable'.
 */
export const currentBranch: StudioBranch = 'juridico';
export const activeSiteConfig: StudioConfig = currentBranch === 'juridico' ? juridicoConfig : contableConfig;
export default activeSiteConfig;

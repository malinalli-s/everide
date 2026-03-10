import { AITool, PromptExample, AssessmentQuestion, TeacherProfileResult, ClassroomActivity } from './types';

export const AI_TOOLS: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Asistente conversacional capaz de generar explicaciones, ideas y textos.',
    fullDescription: 'ChatGPT es un modelo de lenguaje avanzado desarrollado por OpenAI. Puede mantener conversaciones fluidas, responder preguntas complejas, redactar correos, resumir textos y mucho más.',
    category: 'Generación de texto',
    icon: 'MessageSquare',
    url: 'https://chat.openai.com',
    tags: ['Texto', 'Educación', 'Creatividad'],
    difficulty: 'Fácil',
    educationalUses: [
      'Explicar conceptos complejos de forma sencilla.',
      'Generar ejercicios y problemas de práctica.',
      'Lluvia de ideas para proyectos escolares.',
      'Preparar planes de clase y rúbricas.'
    ],
    warnings: [
      'Puede generar información incorrecta (alucinaciones).',
      'No tiene acceso en tiempo real a eventos muy recientes.',
      'Verificar siempre los datos críticos.'
    ],
    isRecommended: true,
    isTrending: true
  },
  {
    id: '2',
    name: 'Perplexity AI',
    description: 'Motor de búsqueda conversacional con fuentes citadas.',
    fullDescription: 'Perplexity combina la potencia de la IA con la búsqueda en tiempo real en la web, proporcionando respuestas precisas con citas directas a las fuentes de información.',
    category: 'Investigación',
    icon: 'Search',
    url: 'https://perplexity.ai',
    tags: ['Investigación', 'Fuentes', 'Búsqueda'],
    difficulty: 'Fácil',
    educationalUses: [
      'Investigación académica con fuentes verificables.',
      'Búsqueda de noticias y eventos actuales.',
      'Verificación de hechos y datos específicos.'
    ],
    warnings: [
      'Aunque cita fuentes, es necesario revisar que la cita sea relevante.',
      'La síntesis puede omitir matices importantes de los artículos originales.'
    ],
    isRecommended: true,
    isTrending: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Gamma',
    description: 'Crea presentaciones, documentos y páginas web en segundos.',
    fullDescription: 'Gamma utiliza IA para transformar un simple prompt o un esquema en una presentación visualmente atractiva y profesional, ahorrando horas de diseño.',
    category: 'Presentaciones',
    icon: 'Layout',
    url: 'https://gamma.app',
    tags: ['Presentaciones', 'Diseño', 'Productividad'],
    difficulty: 'Fácil',
    educationalUses: [
      'Crear material visual para clases rápidamente.',
      'Presentaciones de proyectos estudiantiles.',
      'Diseño de guías de estudio interactivas.'
    ],
    warnings: [
      'El diseño automático puede requerir ajustes manuales para mayor precisión.',
      'La versión gratuita tiene límites en el número de créditos.'
    ],
    isRecommended: true,
    isNew: true
  },
  {
    id: '4',
    name: 'Claude',
    description: 'IA enfocada en la seguridad y el análisis profundo de documentos.',
    fullDescription: 'Claude, desarrollado por Anthropic, destaca por su capacidad de procesar grandes volúmenes de texto y su enfoque en respuestas éticas y seguras.',
    category: 'Generación de texto',
    icon: 'FileText',
    url: 'https://claude.ai',
    tags: ['Análisis', 'Documentos', 'Ética'],
    difficulty: 'Intermedio',
    educationalUses: [
      'Análisis de textos literarios extensos.',
      'Resumen de artículos científicos complejos.',
      'Comparación de múltiples documentos.'
    ],
    warnings: [
      'Capacidad de búsqueda web limitada en comparación con otros modelos.',
      'Límites de mensajes diarios en la versión gratuita.'
    ],
    isRecommended: true,
    isTrending: true
  },
  {
    id: '5',
    name: 'Runway Gen-3',
    description: 'Generación de video hiperrealista a partir de texto.',
    fullDescription: 'Runway es una de las herramientas líderes en la creación de video mediante IA, permitiendo generar escenas cinematográficas desde descripciones textuales.',
    category: 'Video',
    icon: 'Video',
    url: 'https://runwayml.com',
    tags: ['Video', 'Cine', 'Arte'],
    difficulty: 'Avanzado',
    educationalUses: [
      'Creación de clips educativos visuales.',
      'Proyectos de artes audiovisuales.',
      'Visualización de conceptos históricos o científicos.'
    ],
    warnings: [
      'Requiere una curva de aprendizaje mayor para obtener resultados precisos.',
      'Alto consumo de recursos y créditos.'
    ],
    isNew: true,
    isTrending: true
  },
  {
    id: '6',
    name: 'Whimsical',
    description: 'Diagramas, mapas mentales y prototipos con ayuda de IA.',
    fullDescription: 'Whimsical integra IA para ayudar a expandir mapas mentales y diagramas de flujo de forma automática, facilitando la organización visual de ideas.',
    category: 'Educación',
    icon: 'GitBranch',
    url: 'https://whimsical.com',
    tags: ['Mapas mentales', 'Diagramas', 'Estudio'],
    difficulty: 'Fácil',
    educationalUses: [
      'Organización de conceptos en mapas mentales.',
      'Planificación de flujos de trabajo en proyectos.',
      'Lluvia de ideas colaborativa.'
    ],
    warnings: [
      'La IA sugiere ramas, pero la estructura lógica debe ser supervisada.'
    ],
    isRecommended: true
  },
  {
    id: '7',
    name: 'Canva Magic Studio',
    description: 'Suite completa de diseño gráfico potenciada por IA.',
    fullDescription: 'Canva ha integrado múltiples herramientas de IA para generar imágenes, editar fotos, escribir textos y crear diseños completos de forma intuitiva.',
    category: 'Imagen',
    icon: 'Palette',
    url: 'https://canva.com',
    tags: ['Diseño', 'Imagen', 'Creatividad'],
    difficulty: 'Fácil',
    educationalUses: [
      'Creación de pósteres y materiales para el aula.',
      'Edición rápida de imágenes para presentaciones.',
      'Generación de recursos visuales personalizados.'
    ],
    warnings: [
      'Las imágenes generadas pueden tener inconsistencias visuales.',
      'Muchas funciones avanzadas requieren Canva Pro.'
    ],
    isRecommended: true,
    isTrending: true
  },
  {
    id: '8',
    name: 'Elicit',
    description: 'Asistente de investigación que analiza artículos científicos.',
    fullDescription: 'Elicit utiliza modelos de lenguaje para automatizar partes del flujo de trabajo de investigación, como encontrar artículos relevantes y resumir sus hallazgos.',
    category: 'Investigación',
    icon: 'BookOpen',
    url: 'https://elicit.org',
    tags: ['Ciencia', 'Investigación', 'Académico'],
    difficulty: 'Intermedio',
    educationalUses: [
      'Revisión de literatura científica.',
      'Búsqueda de evidencia para trabajos de investigación.',
      'Síntesis de hallazgos en múltiples artículos.'
    ],
    warnings: [
      'Enfocado principalmente en ciencias exactas y de la salud.',
      'Requiere criterio académico para evaluar la relevancia de los resultados.'
    ],
    isRecommended: true
  }
];

export const PROMPT_EXAMPLES: PromptExample[] = [
  {
    id: '1',
    title: 'Explicación de conceptos',
    weak: 'Explica la fotosíntesis.',
    improved: 'Actúa como un tutor de biología para bachillerato. Explica la fotosíntesis usando una analogía cotidiana y termina con 3 preguntas de repaso.',
    explanation: 'Define el rol, el público objetivo y la estructura de salida.'
  },
  {
    id: '2',
    title: 'Creación de actividades',
    weak: 'Dame una idea para clase.',
    improved: 'Genera una actividad de 20 minutos para una clase de historia de 4to grado sobre la Revolución Francesa que fomente el debate grupal.',
    explanation: 'Especifica tiempo, tema, nivel y objetivo pedagógico.'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "¿Con qué frecuencia utilizas herramientas de inteligencia artificial en tu trabajo docente?",
    options: [
      { text: "Nunca las he utilizado", score: 1 },
      { text: "Las he probado ocasionalmente", score: 2 },
      { text: "Las uso con cierta frecuencia", score: 3 },
      { text: "Son parte habitual de mi proceso de trabajo", score: 4 }
    ]
  },
  {
    id: 2,
    question: "¿Para qué utilizas principalmente herramientas de IA?",
    options: [
      { text: "No las utilizo", score: 1 },
      { text: "Para generar ideas o inspiración inicial", score: 2 },
      { text: "Para crear materiales educativos", score: 3 },
      { text: "Para diseñar actividades completas o analizar información", score: 4 }
    ]
  },
  {
    id: 3,
    question: "Cuando un estudiante entrega un trabajo que pudo haber sido generado con IA, ¿qué haces normalmente?",
    options: [
      { text: "No sé cómo detectarlo", score: 1 },
      { text: "Lo acepto si parece correcto", score: 2 },
      { text: "Pregunto sobre el proceso de elaboración", score: 3 },
      { text: "Integro el uso de IA como parte del ejercicio de aprendizaje", score: 4 }
    ]
  },
  {
    id: 4,
    question: "¿Qué tan cómodo te sientes explicando a tus estudiantes cómo funciona la IA?",
    options: [
      { text: "No podría explicarlo", score: 1 },
      { text: "Solo conozco conceptos muy básicos", score: 2 },
      { text: "Puedo explicar su funcionamiento general", score: 3 },
      { text: "Puedo explicar ventajas, riesgos y limitaciones", score: 4 }
    ]
  },
  {
    id: 5,
    question: "¿Cómo integras la IA en la planificación de tus clases?",
    options: [
      { text: "No la utilizo", score: 1 },
      { text: "Solo para generar ideas iniciales", score: 2 },
      { text: "Para crear actividades o materiales específicos", score: 3 },
      { text: "Como herramienta constante para diseñar experiencias de aprendizaje", score: 4 }
    ]
  },
  {
    id: 6,
    question: "¿Cuál crees que es el principal riesgo del uso de IA en educación?",
    options: [
      { text: "No lo tengo claro", score: 1 },
      { text: "Que los estudiantes dependan demasiado", score: 2 },
      { text: "Que se use sin pensamiento crítico", score: 3 },
      { text: "Que se pierda el proceso de aprendizaje si no se guía correctamente", score: 4 }
    ]
  },
  {
    id: 7,
    question: "¿Has diseñado actividades donde los estudiantes analicen o cuestionen respuestas generadas por IA?",
    options: [
      { text: "Nunca", score: 1 },
      { text: "Lo he considerado pero no lo he hecho", score: 2 },
      { text: "Algunas veces", score: 3 },
      { text: "Es parte habitual de mis actividades", score: 4 }
    ]
  },
  {
    id: 8,
    question: "Cuando utilizas IA para preparar clases, ¿cómo verificas la información?",
    options: [
      { text: "No la verifico", score: 1 },
      { text: "Confío en la respuesta generada", score: 2 },
      { text: "Reviso algunas fuentes adicionales", score: 3 },
      { text: "Comparo con varias fuentes y reviso críticamente el contenido", score: 4 }
    ]
  },
  {
    id: 9,
    question: "¿Qué tan preparado te sientes para enseñar a tus estudiantes a usar IA de forma responsable?",
    options: [
      { text: "Nada preparado", score: 1 },
      { text: "Poco preparado", score: 2 },
      { text: "Moderadamente preparado", score: 3 },
      { text: "Muy preparado", score: 4 }
    ]
  },
  {
    id: 10,
    question: "¿Cuál de estas frases describe mejor tu relación con la IA?",
    options: [
      { text: "Es una tecnología que aún no entiendo", score: 1 },
      { text: "Es una herramienta ocasional", score: 2 },
      { text: "Es un apoyo importante en mi trabajo", score: 3 },
      { text: "Es un aliado para innovar en la enseñanza", score: 4 }
    ]
  }
];

export const TEACHER_PROFILES: Record<string, TeacherProfileResult> = {
  explorer: {
    name: "Explorador de IA",
    description: "Docentes que están comenzando a conocer la inteligencia artificial.",
    recommendations: ["ChatGPT", "Perplexity AI", "Claude"],
    activities: ["Generar ideas para temas", "Redactar correos administrativos", "Buscar inspiración para ejercicios"]
  },
  practical: {
    name: "Usuario práctico",
    description: "Docentes que utilizan IA ocasionalmente para tareas específicas.",
    recommendations: ["Gamma.app", "Canva Magic Studio", "SlidesAI"],
    activities: ["Crear presentaciones visuales", "Generar resúmenes de textos", "Diseñar rúbricas de evaluación"]
  },
  designer: {
    name: "Diseñador pedagógico con IA",
    description: "Docentes que integran la IA para crear materiales y actividades educativas.",
    recommendations: ["Curipod", "Mizou", "MagicSchool.ai"],
    activities: ["Personalizar lecturas por nivel", "Crear chatbots tutores", "Generar planes de clase adaptativos"]
  },
  mentor: {
    name: "Mentor de IA",
    description: "Docentes que utilizan la IA de forma crítica y ayudan a los estudiantes a comprenderla y cuestionarla.",
    recommendations: ["Elicit", "Consensus", "NotebookLM"],
    activities: ["Debates sobre sesgos en IA", "Análisis crítico de fuentes", "Proyectos de co-creación avanzada"]
  }
};

export const CLASSROOM_ACTIVITIES: ClassroomActivity[] = [
  {
    id: '1',
    title: 'Humano vs IA',
    objective: 'Desarrollar pensamiento crítico al comparar respuestas humanas con respuestas generadas por inteligencia artificial.',
    duration: '15 min',
    category: 'Pensamiento crítico',
    dynamics: [
      'El docente hace una pregunta abierta.',
      'Los estudiantes responden primero sin IA.',
      'Luego consultan una IA.',
      'Comparan ambas respuestas.'
    ],
    questions: [
      '¿Cuál es más clara?',
      '¿Cuál tiene errores?',
      '¿Cuál explica mejor?'
    ],
    learning: 'Entender que la IA no siempre da la mejor respuesta y que el análisis humano es fundamental.',
    icon: 'Users'
  },
  {
    id: '2',
    title: 'Detectives de errores',
    objective: 'Aprender que la IA puede equivocarse y desarrollar habilidades de verificación.',
    duration: '10 min',
    category: 'Análisis y verificación',
    dynamics: [
      'El docente muestra una respuesta generada por IA que contiene errores sutiles.',
      'Los estudiantes deben encontrar errores o afirmaciones dudosas.',
      'Deben proponer la corrección basada en fuentes confiables.'
    ],
    questions: [
      '¿Hay datos incorrectos?',
      '¿Hay fuentes confiables que contradigan a la IA?',
      '¿Por qué crees que la IA cometió ese error?'
    ],
    learning: 'Verificar información y no confiar ciegamente en los resultados de la IA.',
    icon: 'Search'
  },
  {
    id: '3',
    title: 'Mejora tu prompt',
    objective: 'Aprender a hacer mejores preguntas a la IA para obtener resultados precisos.',
    duration: '15 min',
    category: 'Pensamiento estructurado',
    dynamics: [
      'Se presenta un prompt inicial vago: "Explícame la energía".',
      'Los estudiantes deben identificar qué le falta al prompt (contexto, rol, formato).',
      'Los estudiantes deben mejorar el prompt siguiendo la fórmula maestra.',
      'Comparan los resultados del prompt inicial vs el mejorado.'
    ],
    questions: [
      '¿Cómo cambió la respuesta al ser más específicos?',
      '¿Qué elementos del nuevo prompt fueron más determinantes?'
    ],
    learning: 'La calidad del resultado depende directamente de la calidad y claridad del prompt.',
    icon: 'Terminal'
  },
  {
    id: '4',
    title: 'IA como generador de ideas',
    objective: 'Usar IA como herramienta creativa y punto de partida para proyectos.',
    duration: '10 min',
    category: 'Creatividad digital',
    dynamics: [
      'Los estudiantes piden a la IA: ideas de proyectos, preguntas de investigación o analogías.',
      'Después seleccionan la mejor idea y la desarrollan por su cuenta.',
      'Explican por qué esa idea es valiosa.'
    ],
    questions: [
      '¿La IA propuso algo que no habías pensado?',
      '¿Cómo puedes mejorar la idea de la IA con tu propio toque personal?'
    ],
    learning: 'La IA puede ser un gran disparador de creatividad, pero el desarrollo final es humano.',
    icon: 'Lightbulb'
  },
  {
    id: '5',
    title: 'Debate humano vs IA',
    objective: 'Fortalecer la capacidad de argumentación usando la IA como oponente.',
    duration: '20 min',
    category: 'Argumentación',
    dynamics: [
      'La IA genera una postura sobre un tema polémico (ej: "La tecnología mejora el aprendizaje").',
      'Un grupo de estudiantes debe defender la postura de la IA.',
      'Otro grupo debe refutarla con argumentos propios.',
      'Se analiza quién tuvo argumentos más sólidos.'
    ],
    questions: [
      '¿Qué argumentos de la IA fueron difíciles de refutar?',
      '¿Qué debilidades encontraron en la lógica de la IA?'
    ],
    learning: 'La IA puede ser un excelente oponente intelectual para practicar el debate.',
    icon: 'MessageSquare'
  },
  {
    id: '6',
    title: 'Tarea imposible para IA',
    objective: 'Entender los límites actuales de la inteligencia artificial.',
    duration: '10 min',
    category: 'Metacognición',
    dynamics: [
      'Los estudiantes deben crear una pregunta o tarea que la IA no pueda responder bien.',
      'Prueban sus preguntas en la IA.',
      'Analizan por qué la IA falla en esos casos (subjetividad, experiencias personales, etc.).'
    ],
    questions: [
      '¿Por qué la IA no puede responder sobre sentimientos reales?',
      '¿Qué diferencia hay entre procesar datos y tener una experiencia?'
    ],
    learning: 'Identificar la diferencia entre la generación algorítmica y la experiencia humana.',
    icon: 'ShieldAlert'
  },
  {
    id: '7',
    title: 'Reescribir respuesta IA',
    objective: 'Mejorar la comprensión y capacidad de síntesis adaptando contenidos.',
    duration: '10 min',
    category: 'Comprensión lectora',
    dynamics: [
      'La IA genera una explicación técnica o compleja.',
      'Los estudiantes deben reescribirla para que un niño de 10 años la entienda perfectamente.',
      'Se comparan las versiones para ver si se mantuvo la esencia.'
    ],
    questions: [
      '¿Qué partes fueron las más difíciles de simplificar?',
      '¿Se perdió información importante en la traducción?'
    ],
    learning: 'Capacidad de traducir y sintetizar conocimiento complejo.',
    icon: 'Edit3'
  },
  {
    id: '8',
    title: 'Verificación de fuentes',
    objective: 'Evitar la desinformación y aprender a contrastar datos de la IA.',
    duration: '15 min',
    category: 'Alfabetización mediática',
    dynamics: [
      'La IA responde una pregunta con datos específicos.',
      'Los estudiantes deben buscar fuentes externas (libros, sitios web oficiales) para confirmar cada dato.',
      'Marcan qué datos son correctos y cuáles son inventados o imprecisos.'
    ],
    questions: [
      '¿La IA inventó alguna fuente o autor?',
      '¿Qué tan fácil fue encontrar la fuente original?'
    ],
    learning: 'No confiar ciegamente en la IA y mantener siempre un hábito de verificación.',
    icon: 'CheckSquare'
  }
];

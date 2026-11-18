import type { Project } from "@/content/types";

export const balcarceProject = {
  slug: "balcarce-racing-simulator",
  path: { es: "/es/proyectos/balcarce-racing-simulator", en: "/en/projects/balcarce-racing-simulator" },
  featured: true,
  caseStudy: true,
  type: "personal",
  group: "simulator",
  title: "Balcarce Racing Simulator",
  year: "2026",
  summary: {
    es: "Simulador 3D del Autódromo Juan Manuel Fangio en Godot. Lo hice para aprender a desarrollar y mantener un proyecto complejo con IA y entender sus límites a largo plazo.",
    en: "A 3D simulator of the Juan Manuel Fangio circuit built in Godot. I made it to learn how to build and maintain a complex project with AI and understand its limits over time.",
  },
  problem: {
    es: "Elegí recrear Balcarce por sus desniveles, el paisaje serrano y el cruce del circuito a dos niveles. Quiero entender qué tareas puedo delegar a la IA, qué contexto necesita para que los cambios sean coherentes entre sí y qué resultados debo verificar a medida que crece el proyecto.",
    en: "I chose to recreate Balcarce because of its elevation changes, hillside setting, and two-level crossing. I want to understand which tasks I can delegate to AI, what context it needs to keep changes consistent, and which results I need to verify as the project grows.",
  },
  solution: {
    es: "El circuito, el terreno y los vehículos se desarrollan como sistemas separados. La pista combina referencias cartográficas y visuales con ajustes propios del modelo; las pruebas automatizadas recorren el circuito y registran el contacto de las ruedas y la respuesta de la suspensión.",
    en: "The circuit, terrain, and vehicles are developed as separate systems. The track combines map and visual references with adjustments to the model. Automated runs around the circuit log wheel contact and suspension response.",
  },
  role: {
    es: "Defino las prioridades de la recreación, reviso el trazado contra referencias y dirijo la validación de geometría y conducción.",
    en: "I set priorities for the recreation, compare the track with reference material, and guide geometry and driving validation.",
  },
  features: {
    es: [
      "Circuito y entorno serrano modelados en 3D, con desniveles y cruce a dos niveles.",
      "Cuatro vehículos con ajustes de transmisión, suspensión y sonido.",
      "Física a 120 pasos por segundo y conducción local sin conexión.",
      "Vueltas de prueba automatizadas, telemetría de contacto y suspensión, y documentación de las aproximaciones del trazado.",
    ],
    en: [
      "A 3D circuit and hillside environment with elevation changes and a two-level crossing.",
      "Four vehicles with distinct transmission, suspension, and sound settings.",
      "A 120 Hz physics simulation and offline driving.",
      "Automated test laps, wheel contact and suspension telemetry, and documentation of track approximations.",
    ],
  },
  technologies: ["Godot", "GDScript", "Blender", "Python"],
  image: "/images/projects/balcarce/model-track.webp",
  imageDescription: {
    es: "Plano del trazado base del simulador, rotado para facilitar la lectura. El circuito se cruza sobre sí mismo.",
    en: "Plan view of the simulator’s base track, rotated for readability. The circuit crosses over itself.",
  },
  imageCredit: { label: "© OpenStreetMap contributors", url: "https://www.openstreetmap.org/copyright" },
  status: { es: "Simulador en desarrollo", en: "Simulator in development" },
  learnings: {
    es: "Las referencias visuales ayudan a orientar el paisaje, y las pruebas del modelo permiten evaluar cómo se conduce. La geometría es una aproximación del circuito real.",
    en: "Visual references guide the landscape, and tests on the model help evaluate how it drives. The geometry is an approximation of the real circuit.",
  },
  aiAssisted: "throughout",
  aiContribution: {
    es: "La IA participó en toda la implementación del simulador. Yo definí el alcance y las prioridades, contrasté el trazado con las referencias y dirigí las pruebas de geometría y conducción.",
    en: "I used AI throughout the simulator’s implementation. I defined the scope and priorities, checked the track against reference material, and guided geometry and driving tests.",
  },
} satisfies Project;

import type { Locale } from "./portfolio";

export type FrameworkView = "home" | "components" | "screens" | "icons";
export type ScreenView = "initiative" | "form" | "gallery" | "replace";

export const frameworkPalette = [
  { variable: "_color.Brand.Primary", hex: "#07539B" },
  { variable: "_color.Brand.Secondary", hex: "#287FC8" },
  { variable: "_color.Brand.Light", hex: "#A8C9F2" },
  { variable: "_color.Accent.Violet", hex: "#8253AD" },
  { variable: "_color.Feedback.Success", hex: "#0A9B71" },
  { variable: "_color.Feedback.Warning", hex: "#E97700" },
  { variable: "_color.Feedback.Danger", hex: "#DC4C4C" },
  { variable: "_color.Neutral.Strong", hex: "#30343A" },
  { variable: "_color.Neutral.Mid", hex: "#8B93A1" },
  { variable: "_color.Neutral.Light", hex: "#E7EBF0" },
  { variable: "_color.Surface.Default", hex: "#F7F8FA" },
  { variable: "_color.Surface.Raised", hex: "#FFFFFF" },
] as const;

export const frameworkIcons = [
  ["plus", "+"], ["check", "✓"], ["close", "×"], ["search", "⌕"],
  ["settings", "⚙"], ["person", "♙"], ["home", "⌂"], ["favorite", "♥"],
  ["bookmark", "▮"], ["chart", "▥"], ["notification", "♢"], ["star", "★"],
  ["location", "⌖"], ["globe", "◎"], ["folder", "□"], ["mail", "✉"],
  ["copy", "▣"], ["edit", "╱"], ["info", "i"], ["warning", "!"],
  ["arrow-right", "→"], ["arrow-left", "←"], ["more", "•••"], ["lock", "▰"],
] as const;

export const frameworkPrototypeCopy: Record<Locale, {
  prototype: string;
  product: string;
  homeTitle: string;
  homeLead: string;
  back: string;
  views: Record<Exclude<FrameworkView, "home">, { title: string; description: string }>;
  paletteTitle: string;
  paletteHelp: string;
  copied: string;
  typography: string;
  componentExamples: string;
  primaryAction: string;
  secondaryAction: string;
  inputLabel: string;
  placeholder: string;
  activeStatus: string;
  iconSearch: string;
  iconPreview: string;
  iconVariants: string;
  iconVariantNames: string[];
  iconSize: string;
  iconPagination: string;
  small: string;
  large: string;
  darkMode: string;
  lightMode: string;
  saved: string;
  screenTabs: Record<ScreenView, string>;
  formTitle: string;
  formLead: string;
  fields: string[];
  select: string;
  cancel: string;
  save: string;
  step: string;
  draft: string;
  review: string;
  discovery: string;
  approval: string;
  pending: string;
  areaOptions: string[];
  priorityOptions: string[];
  galleryTitle: string;
  galleryLead: string;
  dataView: string;
  newItem: string;
  galleryColumns: string[];
  galleryRows: string[][];
  replaceTitle: string;
  replaceLead: string;
  input: string;
  output: string;
  search: string;
  replacement: string;
  emptyReplace: string;
  utility: string;
  initiative: {
    title: string; lead: string; stages: string[]; panels: string[];
    fields: string[]; values: string[]; approvers: string; approved: string;
    pendingApproval: string; attachments: string; attachmentHelp: string;
    history: string; historyItems: string[]; nextLevel: string; completed: string;
  };
}> = {
  es: {
    prototype: "Prototipo conceptual interactivo",
    product: "Enterprise UI Kit",
    homeTitle: "Una base compartida para diseñar y construir.",
    homeLead: "Explorá una representación pública y sanitizada del sistema: tokens, componentes y pantallas reutilizables.",
    back: "Volver al inicio",
    views: {
      components: { title: "Componentes reutilizables", description: "Paleta, tipografía y estados listos para aplicar." },
      screens: { title: "Pantallas estandarizadas", description: "Formularios, galerías y utilidades con patrones consistentes." },
      icons: { title: "Iconografía y patrones", description: "Una galería filtrable con selección y vista previa." },
    },
    paletteTitle: "Tokens de color",
    paletteHelp: "Posá el cursor para ver el hexadecimal. Seleccioná un color para copiar su variable.",
    copied: "Variable copiada",
    typography: "Escala tipográfica",
    componentExamples: "Estados de componentes",
    primaryAction: "Acción principal",
    secondaryAction: "Acción secundaria",
    inputLabel: "Campo de texto",
    placeholder: "Texto de ejemplo",
    activeStatus: "Estado · Activo",
    iconSearch: "Filtrar iconos",
    iconPreview: "Icono seleccionado",
    iconVariants: "Variante de color",
    iconVariantNames: ["Azul sólido", "Azul suave", "Azul con contorno", "Rojo sólido", "Naranja sólido"],
    iconSize: "Tamaño",
    iconPagination: "Páginas de iconos",
    small: "Pequeño",
    large: "Grande",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    saved: "Cambios guardados correctamente",
    screenTabs: { initiative: "Flujo de iniciativa", form: "Formulario", gallery: "Galería", replace: "Reemplazar código" },
    formTitle: "Solicitud de mejora",
    formLead: "Ejemplo de pantalla estándar para relevar y acompañar una iniciativa.",
    fields: ["Título", "Área", "Descripción", "Prioridad"],
    select: "Seleccionar",
    cancel: "Cancelar",
    save: "Guardar borrador",
    step: "PASO 02 / 04",
    draft: "Borrador",
    review: "Revisión",
    discovery: "Descubrimiento de producto",
    approval: "Aprobación",
    pending: "Pendiente",
    areaOptions: ["Operaciones", "Tecnología"],
    priorityOptions: ["Baja", "Media", "Alta"],
    galleryTitle: "Galería de iniciativas",
    galleryLead: "Tabla de ejemplo con información completamente ficticia.",
    dataView: "VISTA DE DATOS",
    newItem: "+ Nueva",
    galleryColumns: ["ID", "Iniciativa", "Área", "Estado"],
    galleryRows: [
      ["1042", "Simplificar solicitud operativa", "Operaciones", "En análisis"],
      ["1041", "Panel de seguimiento", "Servicios", "Piloto"],
      ["1038", "Mejora de experiencia interna", "Tecnología", "Pendiente"],
      ["1035", "Automatizar una validación", "Administración", "Aprobada"],
    ],
    replaceTitle: "Transformador de código",
    replaceLead: "Utilidad para adaptar propiedades repetitivas durante la construcción de componentes.",
    input: "Código de entrada",
    output: "Resultado",
    search: "Buscar",
    replacement: "Reemplazar por",
    emptyReplace: "Ingresá un texto de búsqueda para transformar el ejemplo.",
    utility: "UTILIDAD",
    initiative: {
      title: "Evolución de una iniciativa",
      lead: "Prototipo sanitizado de un proceso transversal con formularios, evidencia y aprobaciones por nivel.",
      stages: ["Explorar", "Dimensionar", "Piloto", "Planificar", "Ejecutar", "Cerrar"],
      panels: ["Información inicial", "Evaluación y alcance", "Archivos adjuntos", "Planificación y captura"],
      fields: ["Nombre de la iniciativa", "Área", "Detalle", "Tipo de beneficio"],
      values: ["Mejora del circuito de solicitudes", "Operaciones", "Propuesta ficticia para demostrar el flujo sin exponer información interna.", "Recurrente"],
      approvers: "Aprobaciones del nivel", approved: "Aprobado", pendingApproval: "Pendiente de revisión",
      attachments: "Adjuntar evidencia", attachmentHelp: "Documentos, imágenes o material de soporte",
      history: "Historial y conversación", historyItems: ["La iniciativa fue enviada a revisión.", "El referente solicitó ampliar el alcance.", "Se actualizó la documentación del nivel."],
      nextLevel: "Continuar al siguiente nivel",
      completed: "Iniciativa completada",
    },
  },
  en: {
    prototype: "Interactive conceptual prototype",
    product: "Enterprise UI Kit",
    homeTitle: "A shared foundation for designing and building.",
    homeLead: "Explore a public, sanitized representation of the system: reusable tokens, components, and screens.",
    back: "Back to start",
    views: {
      components: { title: "Reusable components", description: "Palette, typography, and states ready to apply." },
      screens: { title: "Standardized screens", description: "Forms, galleries, and utilities with consistent patterns." },
      icons: { title: "Iconography and patterns", description: "A filterable gallery with selection and preview." },
    },
    paletteTitle: "Color tokens",
    paletteHelp: "Hover to reveal the hex value. Select a color to copy its variable.",
    copied: "Variable copied",
    typography: "Type scale",
    componentExamples: "Component states",
    primaryAction: "Primary action",
    secondaryAction: "Secondary action",
    inputLabel: "Text field",
    placeholder: "Example text",
    activeStatus: "Status · Active",
    iconSearch: "Filter icons",
    iconPreview: "Selected icon",
    iconVariants: "Color variant",
    iconVariantNames: ["Solid blue", "Soft blue", "Outlined blue", "Solid red", "Solid orange"],
    iconSize: "Size",
    iconPagination: "Icon pages",
    small: "Small",
    large: "Large",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    saved: "Changes saved successfully",
    screenTabs: { initiative: "Initiative flow", form: "Form", gallery: "Gallery", replace: "Replace code" },
    formTitle: "Improvement request",
    formLead: "A standardized screen example for discovering and supporting an initiative.",
    fields: ["Title", "Area", "Description", "Priority"],
    select: "Select",
    cancel: "Cancel",
    save: "Save draft",
    step: "STEP 02 / 04",
    draft: "Draft",
    review: "Review",
    discovery: "Product discovery",
    approval: "Approval",
    pending: "Pending",
    areaOptions: ["Operations", "Technology"],
    priorityOptions: ["Low", "Medium", "High"],
    galleryTitle: "Initiatives gallery",
    galleryLead: "Sample table using entirely fictional information.",
    dataView: "DATA VIEW",
    newItem: "+ New",
    galleryColumns: ["ID", "Initiative", "Area", "Status"],
    galleryRows: [
      ["1042", "Simplify an operational request", "Operations", "Under review"],
      ["1041", "Tracking dashboard", "Services", "Pilot"],
      ["1038", "Improve the internal experience", "Technology", "Pending"],
      ["1035", "Automate a validation", "Administration", "Approved"],
    ],
    replaceTitle: "Code transformer",
    replaceLead: "A utility for adapting repetitive properties while building components.",
    input: "Input code",
    output: "Result",
    search: "Find",
    replacement: "Replace with",
    emptyReplace: "Enter a search value to transform the example.",
    utility: "UTILITY",
    initiative: {
      title: "Initiative progression",
      lead: "A sanitized prototype of a cross-functional process with forms, evidence, and level-based approvals.",
      stages: ["Explore", "Assess", "Pilot", "Plan", "Execute", "Close"],
      panels: ["Initial information", "Assessment and scope", "Attachments", "Planning and capture"],
      fields: ["Initiative name", "Area", "Details", "Benefit type"],
      values: ["Improve the request workflow", "Operations", "Fictional proposal used to demonstrate the flow without exposing internal information.", "Recurring"],
      approvers: "Level approvals", approved: "Approved", pendingApproval: "Pending review",
      attachments: "Attach evidence", attachmentHelp: "Documents, images, or supporting material",
      history: "History and conversation", historyItems: ["The initiative was submitted for review.", "The reviewer requested a broader scope.", "The level documentation was updated."],
      nextLevel: "Continue to the next level",
      completed: "Initiative completed",
    },
  },
};

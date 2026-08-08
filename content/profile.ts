const publicEmailParts = ["joaquin.oviedo.fernandez", "gmail.com"] as const;

export function getPublicEmail() {
  return `${publicEmailParts[0]}@${publicEmailParts[1]}`;
}

export const profile = {
  name: "Joaquín Nicolás Oviedo",
  location: "Argentina",
  role: {
    es: "Supervisor de Desarrollo y Desarrollador Power Platform",
    en: "Development Supervisor & Power Platform Developer",
  },
  availability: {
    es: "Actualmente trabajando · abierto a nuevas oportunidades",
    en: "Currently employed · open to new opportunities",
  },
  linkedin: "https://www.linkedin.com/in/joaquin-oviedo/",
  github: "https://github.com/JoaquinOviedo",
  photo: "/images/joaquin-oviedo.png",
  cv: {
    es: "/cv/joaquin-oviedo-es.pdf",
    en: "/cv/joaquin-oviedo-en.pdf",
  },
  cvUpdated: { es: "2026-08-08", en: "2026-08-08" },
} as const;


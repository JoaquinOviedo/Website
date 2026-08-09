"""Single source of truth for the bilingual CV generators."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROFILE_IMAGE = ROOT / "public" / "images" / "joaquin-oviedo-profile-v2.webp"

CONTACT = {
    "name": "Joaquín Nicolás Oviedo",
    "location": "Argentina",
    "email": "joaquin.oviedo.fernandez@gmail.com",
    "linkedin_label": "linkedin.com/in/joaquin-oviedo",
    "linkedin_url": "https://www.linkedin.com/in/joaquin-oviedo/",
    "github_label": "github.com/JoaquinOviedo",
    "github_url": "https://github.com/JoaquinOviedo",
    "portfolio_label": "joaquinoviedo.github.io/Website",
}

CV = {
    "es": {
        "filename": "Joaquin_Oviedo_CV_ES.docx",
        "pdf_filename": "joaquin-oviedo-es.pdf",
        "portfolio_url": "https://joaquinoviedo.github.io/Website/es/",
        "title": "Supervisor de Desarrollo | Power Platform & Software Developer",
        "photo": True,
        "sections": {
            "summary": "RESUMEN PROFESIONAL",
            "experience": "EXPERIENCIA PROFESIONAL",
            "projects": "PROYECTOS SELECCIONADOS",
            "education": "EDUCACIÓN",
            "skills": "HABILIDADES TÉCNICAS Y DE GESTIÓN",
            "languages": "IDIOMAS Y FORMACIÓN",
        },
        "summary": (
            "Supervisor de desarrollo y desarrollador de software con experiencia en soluciones "
            "empresariales con Power Platform, .NET, React y TypeScript. Gestiono la evolución de "
            "producto desde el relevamiento y la viabilidad hasta la priorización, delegación y "
            "entrega. Me apropio del problema e integro IA para explorar y validar con mayor rapidez, "
            "manteniendo bajo mi responsabilidad las decisiones técnicas, la calidad y los resultados."
        ),
        "experience": {
            "company": "Circo Studio | Proyectos para YPF",
            "role": "Supervisor de Desarrollo y Desarrollador Power Platform",
            "period": "Marzo 2024 - Actualidad",
            "bullets": [
                "Gestiono la evolución cotidiana de una aplicación corporativa transversal: relevo pedidos con la persona usuaria cliente y análisis funcional, evalúo viabilidad, estimo, priorizo y delego tareas.",
                "Documento casos de uso y validaciones; ejecuto pruebas funcionales y registro evidencia con Azure DevOps Test & Feedback para acompañar entregas y seguimiento de incidencias.",
                "Administro roles y permisos en Dataverse, sitios y grupos de SharePoint y grupos de Microsoft Entra ID, alineando accesos con las responsabilidades de cada perfil.",
                "Desarrollé y evoluciono un framework UX reutilizable para Power Apps junto al equipo de diseño. Lideré su adopción mediante capacitaciones al equipo de desarrollo y al equipo de YPF; actualmente coordino mejoras, delego evoluciones y acompaño a nuevos integrantes.",
            ],
        },
        "projects": [
            {
                "heading": "WIRIN | Desarrollador Backend | Proyecto académico en equipo",
                "period": "2025 - Actualidad",
                "bullets": [
                    "Contribuí principalmente al backend de un sistema de accesibilidad bibliográfica: ASP.NET Core Web API sobre .NET 8, Entity Framework Core, JWT, SQL Server/PostgreSQL e integración de OCR de Azure.",
                    "El equipo presentó WIRIN en la 23.ª JBDU y actualmente valida el producto con personal bibliotecario como paso previo a su implementación en la biblioteca de la UNLaM.",
                ],
            },
        ],
        "education": [
            ("Licenciatura en Gestión de Tecnología | Universidad Nacional de La Matanza", "2026 - 2027 | En curso"),
            ("Tecnicatura Universitaria en Desarrollo Web | Universidad Nacional de La Matanza", "2022 - 2025 | Promedio: 8,6/10"),
            ("Técnico en Electrónica | Instituto San José (A-355)", "2014 - 2019"),
        ],
        "skills": [
            ("Power Platform", "Power Apps, Power Automate, Dataverse, SharePoint, administración de roles y permisos"),
            ("Desarrollo", ".NET 8, ASP.NET Core Web API, React, TypeScript, Angular, Node.js"),
            ("Datos, Azure y entrega", "Entity Framework Core, SQL Server, PostgreSQL, Azure, Azure DevOps, Git, Test & Feedback"),
            ("Gestión y producto", "Relevamiento con usuarios, análisis de viabilidad, estimación, priorización, delegación, capacitación y validación funcional"),
        ],
        "languages": "Español: nativo | Inglés: intermedio alto y comunicación laboral funcional | Portugués: A2",
        "training": "Curso de Data Science | Universidad Tecnológica Nacional (UTN) | Noviembre 2024",
    },
    "en": {
        "filename": "Joaquin_Oviedo_CV_EN.docx",
        "pdf_filename": "joaquin-oviedo-en.pdf",
        "portfolio_url": "https://joaquinoviedo.github.io/Website/en/",
        "title": "Development Supervisor | Power Platform & Software Developer",
        "photo": False,
        "sections": {
            "summary": "PROFESSIONAL SUMMARY",
            "experience": "PROFESSIONAL EXPERIENCE",
            "projects": "SELECTED PROJECTS",
            "education": "EDUCATION",
            "skills": "TECHNICAL AND LEADERSHIP SKILLS",
            "languages": "LANGUAGES AND TRAINING",
        },
        "summary": (
            "Development supervisor and software developer experienced in enterprise solutions with "
            "Power Platform, .NET, React, and TypeScript. I manage product evolution from discovery "
            "and feasibility through prioritization, delegation, and delivery. I take ownership of "
            "problems and use AI to explore and validate faster while remaining accountable for "
            "technical decisions, quality, and outcomes."
        ),
        "experience": {
            "company": "Circo Studio | Projects for YPF",
            "role": "Development Supervisor and Power Platform Developer",
            "period": "March 2024 - Present",
            "bullets": [
                "Manage the day-to-day evolution of a cross-company corporate application: gather requests with the client user and functional analyst, assess feasibility, estimate, prioritize, and delegate work.",
                "Document use cases and validations; perform functional testing and capture evidence with Azure DevOps Test & Feedback to support releases and issue tracking.",
                "Manage roles and permissions across Dataverse, SharePoint sites and groups, and Microsoft Entra ID groups, aligning access with each user profile's responsibilities.",
                "Built and continue to evolve a reusable Power Apps UX framework with the design team. Led its adoption through training for the development team and YPF stakeholders; currently coordinate improvements, delegate enhancements, and support new team members.",
            ],
        },
        "projects": [
            {
                "heading": "WIRIN | Backend Developer | Academic team project",
                "period": "2025 - Present",
                "bullets": [
                    "Contributed mainly to the backend of a bibliographic accessibility system: ASP.NET Core Web API on .NET 8, Entity Framework Core, JWT, SQL Server/PostgreSQL, and Azure OCR integration.",
                    "The team presented WIRIN at the 23rd University Digital Library Conference and is validating the product with library staff before its implementation at UNLaM's library.",
                ],
            },
        ],
        "education": [
            ("Bachelor's Degree in Technology Management | Universidad Nacional de La Matanza", "2026 - 2027 | In progress"),
            ("University Degree in Web Development | Universidad Nacional de La Matanza", "2022 - 2025 | GPA: 8.6/10"),
            ("Electronics Technician | Instituto San José (A-355)", "2014 - 2019"),
        ],
        "skills": [
            ("Power Platform", "Power Apps, Power Automate, Dataverse, SharePoint, role and permission management"),
            ("Development", ".NET 8, ASP.NET Core Web API, React, TypeScript, Angular, Node.js"),
            ("Data, Azure, and delivery", "Entity Framework Core, SQL Server, PostgreSQL, Azure, Azure DevOps, Git, Test & Feedback"),
            ("Leadership and product", "User discovery, feasibility analysis, estimation, prioritization, delegation, training, and functional validation"),
        ],
        "languages": "Spanish: native | English: upper-intermediate with functional workplace communication | Portuguese: A2",
        "training": "Data Science course | Universidad Tecnológica Nacional (UTN) | November 2024",
    },
}

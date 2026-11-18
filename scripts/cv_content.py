"""Single source of truth for the bilingual CV generators.

The public ``CV`` records are the general-purpose resumes linked by the site.
``CV_VARIANTS`` derives role-specific application resumes from the same facts,
so contact, dates, education, and verified experience do not drift.
"""

from copy import deepcopy

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
    "portfolio_label": "joaquinoviedo.com",
}

CV = {
    "es": {
        "filename": "Joaquin_Oviedo_CV_ES.docx",
        "pdf_filename": "joaquin-oviedo-es.pdf",
        "portfolio_url": "https://joaquinoviedo.com/es/",
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
            "empresariales con Power Platform y .NET. Coordino el desarrollo de una aplicación "
            "corporativa y participo en su implementación, desde el relevamiento de necesidades "
            "hasta la entrega de mejoras."
        ),
        "experience": {
            "company": "Circo Studio | Proyectos para YPF",
            "role": "Supervisor de Desarrollo y Desarrollador Power Platform",
            "period": "Marzo 2024 - Actualidad",
            "bullets": [
                "Relevo necesidades con el cliente y el analista funcional. Evalúo su viabilidad, estimo el esfuerzo y distribuyo las tareas según su prioridad.",
                "Configuro datos en Dataverse y automatizo procesos con Power Automate. Valido los cambios antes de pasarlos a producción.",
                "Administro roles y permisos en Dataverse, SharePoint y grupos AD corporativos, alineando accesos con las responsabilidades de cada perfil.",
                "Desarrollé un framework de UX para Power Apps junto al equipo de diseño. Capacité a los equipos de desarrollo y de YPF en su uso. Hoy coordino las mejoras y acompaño a quienes se incorporan.",
            ],
        },
        "projects": [
            {
                "heading": "WIRIN | Desarrollador Backend | Proyecto académico en equipo",
                "period": "2025 - Actualidad",
                "bullets": [
                    "Mi aporte principal fue el backend. Desarrollé la API en .NET 8, trabajé en la persistencia con Entity Framework Core y me encargué del despliegue en Azure.",
                    "El equipo presentó WIRIN en la 23.ª JBDU y valida el producto con personal bibliotecario antes de implementarlo en la biblioteca de la UNLaM.",
                ],
            },
            {
                "heading": "Balcarce Racing Simulator",
                "period": "2026",
                "bullets": [
                    "Simulador 3D en Godot realizado íntegramente con IA para aprender a sostener un proyecto complejo a largo plazo y evaluar los límites de ese enfoque.",
                ],
            },
        ],
        "education": [
            ("Licenciatura en Gestión de Tecnología | Universidad Nacional de La Matanza", "2026 - 2027 | En curso"),
            ("Tecnicatura Universitaria en Desarrollo Web | Universidad Nacional de La Matanza", "2022 - 2025 | Promedio: 8,6/10"),
            ("Técnico en Electrónica | Instituto San José (A-355)", "2014 - 2019"),
        ],
        "skills": [
            ("Power Platform", "Power Apps, Power Automate, Dataverse y SharePoint"),
            ("Desarrollo", ".NET 8, ASP.NET Core Web API, Angular, Node.js"),
            ("Datos, Azure y entrega", "Entity Framework Core, SQL Server, PostgreSQL, Azure, Azure DevOps, Git, Test & Feedback"),
            ("Gestión y producto", "Relevamiento con usuarios, análisis de viabilidad, estimación, priorización, delegación, capacitación y validación funcional"),
        ],
        "languages": "Español: nativo | Inglés: intermedio alto y comunicación laboral funcional | Portugués: A2",
        "training": "Curso de Data Science | Universidad Tecnológica Nacional (UTN) | Noviembre 2024",
    },
    "en": {
        "filename": "Joaquin_Oviedo_CV_EN.docx",
        "pdf_filename": "joaquin-oviedo-en.pdf",
        "portfolio_url": "https://joaquinoviedo.com/en/",
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
            "Power Platform and .NET. I coordinate development of an enterprise application and "
            "contribute to its implementation, from gathering requirements to delivering "
            "improvements."
        ),
        "experience": {
            "company": "Circo Studio | Projects for YPF",
            "role": "Development Supervisor and Power Platform Developer",
            "period": "March 2024 - Present",
            "bullets": [
                "Gather requirements with the client and the functional analyst. Assess feasibility, estimate effort, and assign work according to priority.",
                "Configure data in Dataverse and automate workflows with Power Automate. Test changes before releasing them to production.",
                "Manage roles and permissions across Dataverse, SharePoint, and corporate AD groups, aligning access with each user profile's responsibilities.",
                "Built a reusable Power Apps UX framework with the design team and trained the development team and YPF stakeholders to use it. I now coordinate improvements and help new team members get started.",
            ],
        },
        "projects": [
            {
                "heading": "WIRIN | Backend Developer | Academic team project",
                "period": "2025 - Present",
                "bullets": [
                    "My main contribution was the backend. I developed the .NET 8 API, worked on data persistence with Entity Framework Core, and handled deployment on Azure.",
                    "The team presented WIRIN at the 23rd University Digital Library Conference and is validating it with library staff before implementation at UNLaM's library.",
                ],
            },
            {
                "heading": "Balcarce Racing Simulator",
                "period": "2026",
                "bullets": [
                    "3D simulator built in Godot entirely with AI to learn how to maintain a complex project over time and assess the limits of that approach.",
                ],
            },
        ],
        "education": [
            ("Bachelor's Degree in Technology Management | Universidad Nacional de La Matanza", "2026 - 2027 | In progress"),
            ("University Degree in Web Development | Universidad Nacional de La Matanza", "2022 - 2025 | GPA: 8.6/10"),
            ("Electronics Technician | Instituto San José (A-355)", "2014 - 2019"),
        ],
        "skills": [
            ("Power Platform", "Power Apps, Power Automate, Dataverse, and SharePoint"),
            ("Development", ".NET 8, ASP.NET Core Web API, Angular, Node.js"),
            ("Data, Azure, and delivery", "Entity Framework Core, SQL Server, PostgreSQL, Azure, Azure DevOps, Git, Test & Feedback"),
            ("Leadership and product", "User discovery, feasibility analysis, estimation, prioritization, delegation, training, and functional validation"),
        ],
        "languages": "Spanish: native | English: upper-intermediate with functional workplace communication | Portuguese: A2",
        "training": "Data Science course | Universidad Tecnológica Nacional (UTN) | November 2024",
    },
}


VARIANT_DEFINITIONS = {
    "power-platform": {
        "es": {
            "title": "Power Platform Developer | Power Apps, Dataverse y SharePoint",
            "summary": (
                "Desarrollador Power Platform con experiencia construyendo y evolucionando soluciones "
                "empresariales con Power Apps, Dataverse, Power Automate y SharePoint. Combino desarrollo "
                "con relevamiento, validación funcional, administración de accesos y acompañamiento de "
                "entregas entre ambientes."
            ),
            "experience_bullets": [
                "Desarrollo y evoluciono una aplicación corporativa transversal con Power Apps, Dataverse, Power Automate y SharePoint; también relevo necesidades, evalúo viabilidad y participo en la priorización de mejoras.",
                "Modelo datos en Dataverse, automatizo procesos con Power Automate y preparo las soluciones para producción.",
                "Administro roles y permisos en Dataverse, sitios y grupos de SharePoint y grupos AD corporativos, alineando accesos con cada perfil.",
                "Valido las entregas con pruebas funcionales y doy seguimiento a las incidencias en Azure DevOps.",
                "Desarrollé un framework UX reutilizable para Power Apps junto al equipo de diseño y capacité inicialmente al equipo de desarrollo y al equipo de YPF; hoy coordino mejoras y acompaño a nuevos integrantes.",
            ],
            "skills": [
                ("Power Platform", "Power Apps, Dataverse, Power Automate, SharePoint, soluciones, variables de entorno y pasajes a producción"),
                ("Gobierno y calidad", "Roles y permisos, ambientes, grupos AD, pruebas funcionales, Azure DevOps Test & Feedback"),
                ("Desarrollo e integración", ".NET 8, ASP.NET Core Web API, SQL Server, PostgreSQL, Azure, Git"),
                ("Trabajo con producto", "Relevamiento, viabilidad, estimación, priorización, coordinación, capacitación y comunicación"),
            ],
        },
        "en": {
            "title": "Power Platform Developer | Power Apps, Dataverse & SharePoint",
            "summary": (
                "Power Platform developer experienced in building and evolving enterprise solutions with "
                "Power Apps, Dataverse, Power Automate, and SharePoint. I combine hands-on development with "
                "requirements discovery, functional validation, access management, and release support across environments."
            ),
            "experience_bullets": [
                "Develop and evolve a cross-functional corporate application with Power Apps, Dataverse, Power Automate, and SharePoint; gather needs, assess feasibility, and help prioritize improvements.",
                "Model data in Dataverse, automate workflows with Power Automate, and prepare solutions for release.",
                "Manage roles and permissions across Dataverse, SharePoint sites and groups, and corporate AD groups, aligning access with each profile.",
                "Validate releases through functional testing and track issues in Azure DevOps.",
                "Built a reusable Power Apps UX framework with the design team and initially trained both the development and YPF teams; now coordinate improvements and support new team members.",
            ],
            "skills": [
                ("Power Platform", "Power Apps, Dataverse, Power Automate, SharePoint, solutions, environment variables, and production releases"),
                ("Governance and quality", "Roles and permissions, environments, AD groups, functional testing, Azure DevOps Test & Feedback"),
                ("Development and integration", ".NET 8, ASP.NET Core Web API, SQL Server, PostgreSQL, Azure, Git"),
                ("Product collaboration", "Discovery, feasibility, estimation, prioritization, coordination, training, and communication"),
            ],
        },
    },
    "development-supervisor": {
        "es": {
            "title": "Supervisor de Desarrollo | Power Platform y Gestión de Producto",
            "summary": (
                "Supervisor de desarrollo con base técnica en Power Platform y desarrollo web. Coordino la "
                "evolución cotidiana de una aplicación corporativa: relevo necesidades, evalúo viabilidad, "
                "priorizo el trabajo del equipo y participo en la implementación de mejoras."
            ),
            "experience_bullets": [
                "Relevo pedidos con el cliente y el analista funcional. Con el equipo de desarrollo, estimo el esfuerzo y organizo las entregas.",
                "Participo en el desarrollo y evalúo dependencias y riesgos al definir cambios con el equipo.",
                "Valido las entregas con pruebas funcionales y doy seguimiento a las incidencias en Azure DevOps.",
                "Coordino mejoras del framework UX de Power Apps, delego evoluciones y acompaño a nuevos integrantes; inicialmente capacité al equipo de desarrollo y al equipo de YPF.",
                "Gestiono configuración y accesos en Dataverse, Power Automate y SharePoint, incluyendo ambientes de prueba, pasajes a producción, roles y permisos.",
            ],
            "skills": [
                ("Liderazgo y producto", "Relevamiento, viabilidad, estimación, priorización, delegación, seguimiento, capacitación y comunicación"),
                ("Power Platform", "Power Apps, Dataverse, Power Automate, SharePoint, ambientes, pasajes a producción, roles y permisos"),
                ("Calidad y entrega", "Pruebas funcionales, casos de uso, Azure DevOps Test & Feedback, Git"),
                ("Desarrollo", ".NET 8, ASP.NET Core Web API, SQL Server, PostgreSQL, Azure"),
            ],
        },
        "en": {
            "title": "Development Supervisor | Power Platform & Product Delivery",
            "summary": (
                "Development supervisor with a hands-on foundation in Power Platform and web development. "
                "I coordinate the day-to-day evolution of a corporate application through discovery, feasibility, "
                "estimation, and prioritization. I assign work to the team and help implement improvements."
            ),
            "experience_bullets": [
                "Gather requirements with the client and the functional analyst. Work with the development team to estimate effort and plan releases.",
                "Develop improvements and assess dependencies and risks with the team when planning changes.",
                "Validate releases through functional testing and track issues in Azure DevOps.",
                "Coordinate improvements to the Power Apps UX framework, delegate enhancements, and support new team members; initially trained both the development and YPF teams.",
                "Manage configuration and access across Dataverse, Power Automate, and SharePoint, including test environments, production releases, roles, and permissions.",
            ],
            "skills": [
                ("Leadership and product", "Discovery, feasibility, estimation, prioritization, delegation, follow-up, training, and communication"),
                ("Power Platform", "Power Apps, Dataverse, Power Automate, SharePoint, environments, releases, roles, and permissions"),
                ("Quality and delivery", "Functional testing, use cases, Azure DevOps Test & Feedback, Git"),
                ("Development", ".NET 8, ASP.NET Core Web API, SQL Server, PostgreSQL, Azure"),
            ],
        },
    },
    "software-developer": {
        "es": {
            "title": "Software Developer | .NET y Power Platform",
            "summary": (
                "Desarrollador de software con experiencia profesional en soluciones empresariales y formación "
                "en desarrollo web. Trabajo con .NET y Power Platform, combinando APIs, datos, "
                "integraciones y frontend con comprensión del problema y validación funcional."
            ),
            "experience_bullets": [
                "Desarrollo y evoluciono soluciones empresariales con Power Apps, Dataverse, Power Automate y SharePoint, participando también en relevamiento, viabilidad y estimación.",
                "Configuro datos y automatizaciones, gestiono los accesos y preparo los cambios para producción.",
                "Valido las entregas con pruebas funcionales y doy seguimiento a las incidencias en Azure DevOps.",
                "Desarrollé un framework UX reutilizable para Power Apps con componentes, estilos y pantallas estandarizadas, trabajando junto al equipo de diseño.",
                "Actualmente combino desarrollo con coordinación de mejoras, distribución de tareas y acompañamiento técnico a integrantes del equipo.",
            ],
            "skills": [
                ("Backend y datos", ".NET 8, ASP.NET Core Web API, Entity Framework Core, SQL Server, PostgreSQL"),
                ("Frontend", "Angular, SharePoint Framework"),
                ("Soluciones empresariales", "Power Apps, Dataverse, Power Automate, SharePoint, integraciones, roles y permisos"),
                ("Entrega y colaboración", "Azure, Git, Azure DevOps, pruebas funcionales, relevamiento, estimación, trabajo en equipo y comunicación"),
            ],
        },
        "en": {
            "title": "Software Developer | .NET & Power Platform",
            "summary": (
                "Software developer with professional experience in enterprise solutions and a web development "
                "background. I work with .NET and Power Platform across APIs, data, integrations, "
                "and frontend development, grounded in problem understanding and functional validation."
            ),
            "experience_bullets": [
                "Develop and evolve enterprise solutions with Power Apps, Dataverse, Power Automate, and SharePoint, also contributing to discovery, feasibility, and estimation.",
                "Configure data and workflows, manage access, and prepare changes for production.",
                "Validate releases through functional testing and track issues in Azure DevOps.",
                "Built a reusable Power Apps UX framework with standardized components, styles, and screens in collaboration with the design team.",
                "Currently combine hands-on development with improvement coordination, task distribution, and technical support for team members.",
            ],
            "skills": [
                ("Backend and data", ".NET 8, ASP.NET Core Web API, Entity Framework Core, SQL Server, PostgreSQL"),
                ("Frontend", "Angular, SharePoint Framework"),
                ("Enterprise solutions", "Power Apps, Dataverse, Power Automate, SharePoint, integrations, roles, and permissions"),
                ("Delivery and collaboration", "Azure, Git, Azure DevOps, functional testing, discovery, estimation, teamwork, and communication"),
            ],
        },
    },
}


def _variant_filename(slug, locale, extension):
    profile = slug.replace("-", "_").title().replace("_", "_")
    return f"Joaquin_Oviedo_{profile}_{locale.upper()}.{extension}"


CV_VARIANTS = {}
for slug, localized in VARIANT_DEFINITIONS.items():
    CV_VARIANTS[slug] = {}
    for locale, overrides in localized.items():
        data = deepcopy(CV[locale])
        data["title"] = overrides["title"]
        data["summary"] = overrides["summary"]
        data["experience"]["bullets"] = overrides["experience_bullets"]
        data["skills"] = overrides["skills"]
        data["filename"] = _variant_filename(slug, locale, "docx")
        data["pdf_filename"] = _variant_filename(slug, locale, "pdf")
        data["variant_slug"] = slug
        CV_VARIANTS[slug][locale] = data

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "cv"
OUTPUT = ROOT / "output" / "pdf"
PUBLIC.mkdir(parents=True, exist_ok=True)
OUTPUT.mkdir(parents=True, exist_ok=True)

arial = Path("C:/Windows/Fonts/arial.ttf")
arial_bold = Path("C:/Windows/Fonts/arialbd.ttf")
pdfmetrics.registerFont(TTFont("CVArial", arial))
pdfmetrics.registerFont(TTFont("CVArial-Bold", arial_bold))


def styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle("Name", parent=base["Normal"], fontName="CVArial-Bold", fontSize=17, leading=18, alignment=TA_CENTER, spaceAfter=2),
        "title": ParagraphStyle("Title", parent=base["Normal"], fontName="CVArial-Bold", fontSize=9.2, leading=10.5, textColor=colors.HexColor("#4b4b4b"), alignment=TA_CENTER, spaceAfter=2),
        "contact": ParagraphStyle("Contact", parent=base["Normal"], fontName="CVArial", fontSize=7.8, leading=9.3, alignment=TA_CENTER, spaceAfter=2),
        "section": ParagraphStyle("Section", parent=base["Normal"], fontName="CVArial-Bold", fontSize=9, leading=10, spaceBefore=4.2, spaceAfter=1.2),
        "body": ParagraphStyle("Body", parent=base["Normal"], fontName="CVArial", fontSize=8.1, leading=9.7, spaceAfter=1.2),
        "heading": ParagraphStyle("Heading", parent=base["Normal"], fontName="CVArial-Bold", fontSize=8.5, leading=9.6, spaceBefore=1.5, spaceAfter=0.4),
        "sub": ParagraphStyle("Sub", parent=base["Normal"], fontName="CVArial", fontSize=7.9, leading=9, textColor=colors.HexColor("#4b4b4b"), spaceAfter=0.5),
        "bullet": ParagraphStyle("Bullet", parent=base["Normal"], fontName="CVArial", fontSize=8.0, leading=9.3, leftIndent=11, firstLineIndent=-6, bulletIndent=1, spaceAfter=0.7),
        "compact": ParagraphStyle("Compact", parent=base["Normal"], fontName="CVArial", fontSize=7.9, leading=9.1, spaceAfter=0.7),
    }


def section(story, s, text):
    story.append(Paragraph(text.upper(), s["section"]))
    story.append(HRFlowable(width="100%", thickness=0.65, color=colors.HexColor("#353535"), spaceBefore=0, spaceAfter=1.5))


def heading(story, s, left, date, subtitle=None):
    row = Table(
        [[Paragraph(left, s["heading"]), Paragraph(date, ParagraphStyle("Date", parent=s["heading"], alignment=2))]],
        colWidths=[5.45 * inch, 1.9 * inch],
        hAlign="LEFT",
    )
    row.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(row)
    if subtitle:
        story.append(Paragraph(f"<i>{subtitle}</i>", s["sub"]))


def build(locale, target):
    s = styles()
    es = locale == "es"
    story = [
        Paragraph("JOAQUÍN NICOLÁS OVIEDO", s["name"]),
        Paragraph(("SUPERVISOR DE DESARROLLO Y DESARROLLADOR POWER PLATFORM" if es else "DEVELOPMENT SUPERVISOR &amp; POWER PLATFORM DEVELOPER"), s["title"]),
        Paragraph("Argentina | <link href='mailto:joaquin.oviedo.fernandez@gmail.com'>joaquin.oviedo.fernandez@gmail.com</link> | <link href='https://www.linkedin.com/in/joaquin-oviedo/'>LinkedIn</link> | <link href='https://github.com/JoaquinOviedo'>GitHub</link>", s["contact"]),
        HRFlowable(width="100%", thickness=0.65, color=colors.HexColor("#353535"), spaceBefore=0, spaceAfter=0),
    ]

    if es:
        section(story, s, "Perfil profesional")
        story.append(Paragraph("Desarrollador de software y supervisor de desarrollo con experiencia en soluciones empresariales, Power Platform y backend. Combino relevamiento, estimación, priorización y liderazgo operativo con una base técnica en .NET, React y TypeScript. Enfocado en productos claros, mantenibles y centrados en las personas.", s["body"]))
        section(story, s, "Experiencia")
        heading(story, s, "Circo Studio | Proyectos para YPF", "Marzo 2024 - Actualidad", "Supervisor de Desarrollo y Desarrollador Power Platform | Argentina")
        bullets = [
            "Gestiono la evolución cotidiana de una aplicación corporativa transversal: relevo pedidos con la persona usuaria cliente y análisis funcional, evalúo viabilidad, estimo, priorizo y delego tareas.",
            "Diseñé y desarrollé un framework UX reutilizable para Power Apps junto al equipo de diseño, estandarizando componentes, estilos y pantallas para mejorar consistencia y reutilización.",
            "Capacito a ingresantes, coordino aportes al framework y acompaño al equipo durante la entrega, anticipando dependencias, riesgos y necesidades futuras del producto.",
            "Experiencia complementaria con Power Automate, SharePoint, Azure DevOps, Git y PowerShell; formación inicial en React, TypeScript y SharePoint Framework.",
        ]
        for item in bullets: story.append(Paragraph(item, s["bullet"], bulletText="•"))
        section(story, s, "Proyectos seleccionados")
        heading(story, s, "WIRIN | Desarrollador Backend", "2025", "Proyecto académico en equipo - UNLaM")
        story.append(Paragraph("Desarrollé principalmente el backend de un sistema de accesibilidad bibliográfica: ASP.NET Core Web API sobre .NET 8, Entity Framework Core, JWT, SQL Server/PostgreSQL e integración de OCR de Azure.", s["bullet"], bulletText="•"))
        story.append(Paragraph("La plataforma coordina digitalización, tareas de voluntariado, estados, administración y usuarios; el equipo presentó WIRIN en la 23.ª JBDU de la UNLaM en noviembre de 2025.", s["bullet"], bulletText="•"))
        heading(story, s, "Aplicaciones personales locales | Desarrollo asistido por IA", "2026")
        story.append(Paragraph("Herramientas React y TypeScript para gestión financiera personal y seguimiento de la Licenciatura en Gestión de Tecnología, con privacidad y persistencia local como criterios centrales.", s["bullet"], bulletText="•"))
        section(story, s, "Educación")
        heading(story, s, "Licenciatura en Gestión de Tecnología | UNLaM", "2026 - 2027", "En curso")
        heading(story, s, "Tecnicatura Universitaria en Desarrollo Web | UNLaM", "2022 - 2025", "Promedio: 8,6/10")
        heading(story, s, "Técnico en Electrónica | Instituto San José (A-355)", "2014 - 2019")
        section(story, s, "Tecnologías e idiomas")
        story.append(Paragraph("<b>Tecnologías:</b> Power Apps, Power Automate, .NET 8, ASP.NET Core, React, TypeScript, Angular, SQL, SharePoint, Azure, Git, Azure DevOps y PowerShell", s["compact"]))
        story.append(Paragraph("<b>Idiomas:</b> Español nativo | Inglés B2 | Portugués A2 &nbsp;&nbsp; <b>Formación adicional:</b> Data Science - UTN (noviembre de 2024)", s["compact"]))
    else:
        section(story, s, "Professional summary")
        story.append(Paragraph("Software developer and development supervisor experienced in enterprise solutions, Power Platform, and backend development. I combine discovery, estimation, prioritization, and operational leadership with a technical foundation in .NET, React, and TypeScript. Focused on clear, maintainable, people-centered products.", s["body"]))
        section(story, s, "Experience")
        heading(story, s, "Circo Studio | Projects for YPF", "March 2024 - Present", "Development Supervisor &amp; Power Platform Developer | Argentina")
        bullets = [
            "Manage the day-to-day evolution of a cross-company corporate application: gather requests with the client user and functional analysis, assess feasibility, estimate, prioritize, and delegate work.",
            "Designed and built a reusable Power Apps UX framework with the design team, standardizing components, styles, and screens to improve consistency and reuse.",
            "Train new team members, coordinate framework contributions, and support delivery while anticipating dependencies, risks, and future product needs.",
            "Additional experience with Power Automate, SharePoint, Azure DevOps, Git, and PowerShell; initial training in React, TypeScript, and SharePoint Framework.",
        ]
        for item in bullets: story.append(Paragraph(item, s["bullet"], bulletText="•"))
        section(story, s, "Selected projects")
        heading(story, s, "WIRIN | Backend Developer", "2025", "Academic team project - UNLaM")
        story.append(Paragraph("Contributed mainly to the backend of a bibliographic accessibility system: ASP.NET Core Web API on .NET 8, Entity Framework Core, JWT, SQL Server/PostgreSQL, and Azure OCR integration.", s["bullet"], bulletText="•"))
        story.append(Paragraph("The platform coordinates digitization, volunteer tasks, statuses, administration, and users; the team presented WIRIN at UNLaM's 23rd University Digital Library Conference in November 2025.", s["bullet"], bulletText="•"))
        heading(story, s, "Local personal applications | AI-assisted development", "2026")
        story.append(Paragraph("React and TypeScript tools for personal finance management and Technology Management degree tracking, with privacy and local persistence as core constraints.", s["bullet"], bulletText="•"))
        section(story, s, "Education")
        heading(story, s, "Bachelor's Degree in Technology Management | UNLaM", "2026 - 2027", "In progress")
        heading(story, s, "University Degree in Web Development | UNLaM", "2022 - 2025", "GPA: 8.6/10")
        heading(story, s, "Electronics Technician | Instituto San José (A-355)", "2014 - 2019")
        section(story, s, "Technologies and languages")
        story.append(Paragraph("<b>Technologies:</b> Power Apps, Power Automate, .NET 8, ASP.NET Core, React, TypeScript, Angular, SQL, SharePoint, Azure, Git, Azure DevOps, and PowerShell", s["compact"]))
        story.append(Paragraph("<b>Languages:</b> Spanish: native | English: B2 | Portuguese: A2 &nbsp;&nbsp; <b>Additional training:</b> Data Science - UTN (November 2024)", s["compact"]))

    doc = SimpleDocTemplate(str(target), pagesize=letter, leftMargin=0.55*inch, rightMargin=0.55*inch, topMargin=0.38*inch, bottomMargin=0.38*inch, title="Joaquín Oviedo - Curriculum Vitae", author="")
    doc.build(story)


for locale, filename in (("es", "joaquin-oviedo-es.pdf"), ("en", "joaquin-oviedo-en.pdf")):
    public_target = PUBLIC / filename
    build(locale, public_target)
    (OUTPUT / filename).write_bytes(public_target.read_bytes())
    print(public_target)

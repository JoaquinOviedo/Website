from pathlib import Path
from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT, WD_TAB_LEADER
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tmp" / "cv-build"
OUT.mkdir(parents=True, exist_ok=True)

BLACK = RGBColor(18, 18, 18)
GRAY = RGBColor(75, 75, 75)
RULE = "353535"
FONT = "Arial"


def font(run, size=9.0, bold=False, italic=False, color=BLACK):
    run.font.name = FONT
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), FONT)
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), FONT)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color
    return run


def add_hyperlink(paragraph, text, url, size=8.3):
    part = paragraph.part
    rel = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), rel)
    run = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "1F1F1F")
    rpr.append(color)
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    rpr.append(underline)
    size_el = OxmlElement("w:sz")
    size_el.set(qn("w:val"), str(int(size * 2)))
    rpr.append(size_el)
    fonts = OxmlElement("w:rFonts")
    fonts.set(qn("w:ascii"), FONT)
    fonts.set(qn("w:hAnsi"), FONT)
    rpr.append(fonts)
    run.append(rpr)
    text_el = OxmlElement("w:t")
    text_el.text = text
    run.append(text_el)
    link.append(run)
    paragraph._p.append(link)


def paragraph_border_bottom(paragraph):
    ppr = paragraph._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "7")
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), RULE)
    pbdr.append(bottom)
    ppr.append(pbdr)


def keep_with_next(paragraph):
    ppr = paragraph._p.get_or_add_pPr()
    ppr.append(OxmlElement("w:keepNext"))


def section_heading(doc, text):
    p = doc.add_paragraph(style="Section Heading")
    p.paragraph_format.space_before = Pt(5.5)
    p.paragraph_format.space_after = Pt(2.5)
    font(p.add_run(text.upper()), 9.2, bold=True)
    paragraph_border_bottom(p)
    keep_with_next(p)
    return p


def dated_heading(doc, left, date, subtitle=None):
    p = doc.add_paragraph(style="Item Heading")
    p.paragraph_format.tab_stops.add_tab_stop(
        Inches(7.35), WD_TAB_ALIGNMENT.RIGHT, WD_TAB_LEADER.SPACES
    )
    font(p.add_run(left), 9.1, bold=True)
    font(p.add_run(f"\t{date}"), 8.7, bold=True)
    if subtitle:
        font(p.add_run(f"\n{subtitle}"), 8.5, italic=True, color=GRAY)
    keep_with_next(p)
    return p


def bullet(doc, text):
    p = doc.add_paragraph(style="Resume Bullet")
    font(p.add_run(text), 8.55)
    return p


def compact_line(doc, label, text):
    p = doc.add_paragraph(style="Compact")
    font(p.add_run(f"{label}: "), 8.45, bold=True)
    font(p.add_run(text), 8.45)
    return p


def configure(doc):
    section = doc.sections[0]
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(0.43)
    section.bottom_margin = Inches(0.43)
    section.left_margin = Inches(0.57)
    section.right_margin = Inches(0.57)
    section.header_distance = Inches(0.2)
    section.footer_distance = Inches(0.2)

    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal._element.rPr.rFonts.set(qn("w:ascii"), FONT)
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
    normal.font.size = Pt(8.7)
    normal.paragraph_format.space_after = Pt(1.8)
    normal.paragraph_format.line_spacing = 1.02

    for name in ["Section Heading", "Item Heading", "Compact", "Resume Bullet"]:
        if name not in doc.styles:
            doc.styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)

    section_style = doc.styles["Section Heading"]
    section_style.font.name = FONT
    section_style.font.size = Pt(9.2)
    section_style.font.bold = True

    item_style = doc.styles["Item Heading"]
    item_style.font.name = FONT
    item_style.font.size = Pt(9.1)
    item_style.paragraph_format.space_before = Pt(2.5)
    item_style.paragraph_format.space_after = Pt(1.5)

    compact = doc.styles["Compact"]
    compact.font.name = FONT
    compact.font.size = Pt(8.45)
    compact.paragraph_format.space_after = Pt(1.4)
    compact.paragraph_format.line_spacing = 1.0

    bullet_style = doc.styles["Resume Bullet"]
    bullet_style.base_style = doc.styles["List Bullet"]
    bullet_style.font.name = FONT
    bullet_style.font.size = Pt(8.55)
    bullet_style.paragraph_format.left_indent = Inches(0.17)
    bullet_style.paragraph_format.first_line_indent = Inches(-0.13)
    bullet_style.paragraph_format.space_after = Pt(1.25)
    bullet_style.paragraph_format.line_spacing = 1.0

    doc.core_properties.title = "Joaquin Oviedo - Curriculum Vitae"
    doc.core_properties.subject = "Software development, Power Platform and backend"
    doc.core_properties.author = ""
    doc.core_properties.last_modified_by = ""


def header(doc, title):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(0.5)
    font(p.add_run("JOAQUIN NICOLAS OVIEDO"), 17.5, bold=True)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(1.8)
    font(p.add_run(title.upper()), 9.2, bold=True, color=GRAY)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(2.5)
    font(p.add_run("Argentina | "), 8.3)
    add_hyperlink(p, "joaquin.oviedo.fernandez@gmail.com", "mailto:joaquin.oviedo.fernandez@gmail.com")
    font(p.add_run(" | "), 8.3)
    add_hyperlink(p, "linkedin.com/in/joaquin-oviedo", "https://www.linkedin.com/in/joaquin-oviedo/")
    font(p.add_run(" | "), 8.3)
    add_hyperlink(p, "github.com/JoaquinOviedo", "https://github.com/JoaquinOviedo")
    paragraph_border_bottom(p)


def build_es():
    doc = Document()
    configure(doc)
    header(doc, "Supervisor de Desarrollo y Desarrollador Power Platform")

    section_heading(doc, "Perfil profesional")
    p = doc.add_paragraph(style="Compact")
    font(
        p.add_run(
            "Desarrollador de software y supervisor de desarrollo con experiencia en soluciones empresariales, Power Platform y backend. Combino relevamiento, estimación, priorización y liderazgo operativo con una base técnica en .NET, React y TypeScript. Enfocado en productos claros, mantenibles y centrados en las personas."
        ),
        8.55,
    )

    section_heading(doc, "Experiencia")
    dated_heading(
        doc,
        "Circo Studio | Proyectos para YPF",
        "Marzo 2024 - Actualidad",
        "Supervisor de Desarrollo y Desarrollador Power Platform | Buenos Aires, Argentina",
    )
    bullet(doc, "Gestiono la evolución cotidiana de una aplicación corporativa transversal: relevo pedidos con la persona usuaria cliente y análisis funcional, evalúo viabilidad, estimo, priorizo y delego tareas.")
    bullet(doc, "Diseñé y desarrollé un framework UX reutilizable para Power Apps junto al equipo de diseño, estandarizando componentes, estilos y pantallas para mejorar consistencia y reutilización.")
    bullet(doc, "Capacito a ingresantes, coordino aportes al framework y acompaño al equipo durante la entrega, anticipando dependencias, riesgos y necesidades futuras del producto.")
    bullet(doc, "Experiencia complementaria con Power Automate, SharePoint, Azure DevOps, Git y PowerShell; formación inicial en React, TypeScript y SharePoint Framework.")

    section_heading(doc, "Proyectos seleccionados")
    dated_heading(doc, "WIRIN | Desarrollador Backend", "2025", "Proyecto académico en equipo - UNLaM")
    bullet(doc, "Desarrollé principalmente el backend de un sistema de accesibilidad bibliográfica: ASP.NET Core Web API sobre .NET 8, Entity Framework Core, JWT, SQL Server/PostgreSQL e integración de OCR de Azure.")
    bullet(doc, "La plataforma coordina digitalización, tareas de voluntariado, estados, administración y usuarios; el equipo presentó WIRIN en la 23.ª JBDU de la UNLaM en noviembre de 2025.")
    dated_heading(doc, "Aplicaciones personales locales | Desarrollo asistido por IA", "2026")
    bullet(doc, "Construcción de herramientas React y TypeScript para gestión financiera personal y seguimiento de la Licenciatura en Gestión de Tecnología, con privacidad y persistencia local como criterios centrales.")

    section_heading(doc, "Educación")
    dated_heading(doc, "Licenciatura en Gestión de Tecnología | UNLaM", "2026 - 2027", "En curso")
    dated_heading(doc, "Tecnicatura Universitaria en Desarrollo Web | UNLaM", "2022 - 2025", "Promedio: 8,6/10")
    dated_heading(doc, "Técnico en Electrónica | Instituto San José (A-355)", "2014 - 2019")

    section_heading(doc, "Tecnologías e idiomas")
    compact_line(doc, "Tecnologías", "Power Apps, Power Automate, .NET 8, ASP.NET Core, React, TypeScript, Angular, SQL, SharePoint, Azure, Git, Azure DevOps y PowerShell")
    compact_line(doc, "Idiomas", "Español nativo | Inglés B2 | Portugués A2")
    compact_line(doc, "Formación adicional", "Curso de Data Science - UTN (noviembre de 2024)")

    path = OUT / "Joaquin_Oviedo_CV_ES_raw.docx"
    doc.save(path)
    return path


def build_en():
    doc = Document()
    configure(doc)
    header(doc, "Development Supervisor & Power Platform Developer")

    section_heading(doc, "Professional summary")
    p = doc.add_paragraph(style="Compact")
    font(
        p.add_run(
            "Software developer and development supervisor experienced in enterprise solutions, Power Platform, and backend development. I combine discovery, estimation, prioritization, and operational leadership with a technical foundation in .NET, React, and TypeScript. Focused on clear, maintainable, people-centered products."
        ),
        8.55,
    )

    section_heading(doc, "Experience")
    dated_heading(
        doc,
        "Circo Studio | Projects for YPF",
        "March 2024 - Present",
        "Development Supervisor & Power Platform Developer | Buenos Aires, Argentina",
    )
    bullet(doc, "Manage the day-to-day evolution of a cross-company corporate application: gather requests with the client user and functional analysis, assess feasibility, estimate, prioritize, and delegate work.")
    bullet(doc, "Designed and built a reusable Power Apps UX framework with the design team, standardizing components, styles, and screens to improve consistency and reuse.")
    bullet(doc, "Train new team members, coordinate framework contributions, and support delivery while anticipating dependencies, risks, and future product needs.")
    bullet(doc, "Additional experience with Power Automate, SharePoint, Azure DevOps, Git, and PowerShell; initial training in React, TypeScript, and SharePoint Framework.")

    section_heading(doc, "Selected projects")
    dated_heading(doc, "WIRIN | Backend Developer", "2025", "Academic team project - UNLaM")
    bullet(doc, "Contributed mainly to the backend of a bibliographic accessibility system: ASP.NET Core Web API on .NET 8, Entity Framework Core, JWT, SQL Server/PostgreSQL, and Azure OCR integration.")
    bullet(doc, "The platform coordinates digitization, volunteer tasks, statuses, administration, and users; the team presented WIRIN at UNLaM's 23rd University Digital Library Conference in November 2025.")
    dated_heading(doc, "Local personal applications | AI-assisted development", "2026")
    bullet(doc, "Built React and TypeScript tools for personal finance management and Technology Management degree tracking, with privacy and local persistence as core constraints.")

    section_heading(doc, "Education")
    dated_heading(doc, "Bachelor's Degree in Technology Management | UNLaM", "2026 - 2027", "In progress")
    dated_heading(doc, "University Degree in Web Development | UNLaM", "2022 - 2025", "GPA: 8.6/10")
    dated_heading(doc, "Electronics Technician | Instituto San Jose (A-355)", "2014 - 2019")

    section_heading(doc, "Technologies and languages")
    compact_line(doc, "Technologies", "Power Apps, Power Automate, .NET 8, ASP.NET Core, React, TypeScript, Angular, SQL, SharePoint, Azure, Git, Azure DevOps, and PowerShell")
    compact_line(doc, "Languages", "Spanish: native | English: B2 | Portuguese: A2")
    compact_line(doc, "Additional training", "Data Science course - UTN (November 2024)")

    path = OUT / "Joaquin_Oviedo_CV_EN_raw.docx"
    doc.save(path)
    return path


if __name__ == "__main__":
    print(build_es())
    print(build_en())

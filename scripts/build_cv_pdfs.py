"""Build selectable, linked, one-column A4 PDFs from cv_content.py."""

from html import escape
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch, mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Image as RLImage, KeepTogether, Paragraph, SimpleDocTemplate, Spacer

from cv_content import CONTACT, CV, PROFILE_IMAGE, ROOT

PUBLIC = ROOT / "public" / "cv"; OUTPUT = ROOT / "output" / "pdf"; TMP = ROOT / "tmp" / "cv-build"
for folder in (PUBLIC, OUTPUT, TMP): folder.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("CVArial", "C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("CVArial-Bold", "C:/Windows/Fonts/arialbd.ttf"))
pdfmetrics.registerFont(TTFont("CVArial-Italic", "C:/Windows/Fonts/ariali.ttf"))


def crop_photo():
    target = TMP / "profile-square-pdf.jpg"
    image = Image.open(PROFILE_IMAGE).convert("RGB")
    side = min(image.size); left = (image.width - side) // 2
    top = max(0, min((image.height - side) // 2 - 70, image.height - side))
    image.crop((left, top, left + side, top + side)).resize((900, 900), Image.Resampling.LANCZOS).save(target, quality=92, optimize=True)
    return target


def make_styles():
    base = getSampleStyleSheet()["Normal"]
    return {
        "name": ParagraphStyle("CVName", parent=base, fontName="CVArial-Bold", fontSize=17.5, leading=19, alignment=TA_CENTER, spaceAfter=0),
        "title": ParagraphStyle("CVTitle", parent=base, fontName="CVArial-Bold", fontSize=10.1, leading=12, textColor=colors.HexColor("#464646"), alignment=TA_CENTER, spaceAfter=2),
        "contact": ParagraphStyle("CVContact", parent=base, fontName="CVArial", fontSize=8.6, leading=10.4, alignment=TA_CENTER, spaceAfter=1),
        "section": ParagraphStyle("CVSection", parent=base, fontName="CVArial-Bold", fontSize=10.3, leading=12, spaceBefore=4.3, spaceAfter=1),
        "body": ParagraphStyle("CVBody", parent=base, fontName="CVArial", fontSize=9.7, leading=11.3, spaceAfter=1),
        "heading": ParagraphStyle("CVHeading", parent=base, fontName="CVArial-Bold", fontSize=9.8, leading=11.3, spaceBefore=1.5, spaceAfter=0.3),
        "sub": ParagraphStyle("CVSub", parent=base, fontName="CVArial-Italic", fontSize=9.2, leading=10.5, textColor=colors.HexColor("#505050"), spaceAfter=0.4),
        "bullet": ParagraphStyle("CVBullet", parent=base, fontName="CVArial", fontSize=9.5, leading=10.9, leftIndent=11, firstLineIndent=-8, spaceAfter=0.9),
        "compact": ParagraphStyle("CVCompact", parent=base, fontName="CVArial", fontSize=9.35, leading=10.7, spaceAfter=0.6),
    }


def section(story, style, title):
    story.append(Paragraph(escape(title), style["section"]))
    story.append(HRFlowable(width="100%", thickness=0.45, color=colors.HexColor("#777777"), spaceBefore=0, spaceAfter=1.2))


def heading(story, style, title, period, subtitle=None):
    block = [Paragraph(f"{escape(title)} <font color='#505050'>| {escape(period)}</font>", style["heading"])]
    if subtitle: block.append(Paragraph(escape(subtitle), style["sub"]))
    story.append(KeepTogether(block))


def bullet(story, style, text):
    story.append(Paragraph(f"- {escape(text)}", style["bullet"]))


def build(locale, target):
    data = CV[locale]; style = make_styles(); story = []
    if data["photo"]:
        photo = RLImage(str(crop_photo()), width=27*mm, height=27*mm); photo.hAlign = "CENTER"
        story.extend([photo, Spacer(1, 2)])
    story.append(Paragraph(escape(CONTACT["name"]), style["name"]))
    story.append(Paragraph(escape(data["title"]), style["title"]))
    contact = (
        f'{CONTACT["location"]} | <link href="mailto:{CONTACT["email"]}">{CONTACT["email"]}</link> | '
        f'<link href="{CONTACT["linkedin_url"]}">{CONTACT["linkedin_label"]}</link> | '
        f'<link href="{CONTACT["github_url"]}">{CONTACT["github_label"]}</link>'
    )
    story.append(Paragraph(contact, style["contact"]))
    story.append(Paragraph(f'<link href="{data["portfolio_url"]}">{CONTACT["portfolio_label"]}</link>', style["contact"]))
    story.append(HRFlowable(width="100%", thickness=0.45, color=colors.HexColor("#777777"), spaceBefore=0, spaceAfter=0))

    section(story, style, data["sections"]["summary"]); story.append(Paragraph(escape(data["summary"]), style["body"]))
    section(story, style, data["sections"]["experience"])
    exp = data["experience"]; heading(story, style, exp["company"], exp["period"], exp["role"])
    for text in exp["bullets"]: bullet(story, style, text)
    section(story, style, data["sections"]["projects"])
    for project in data["projects"]:
        heading(story, style, project["heading"], project["period"])
        for text in project["bullets"]: bullet(story, style, text)
    section(story, style, data["sections"]["education"])
    for title, period in data["education"]: heading(story, style, title, period)
    section(story, style, data["sections"]["skills"])
    for label, value in data["skills"]:
        story.append(Paragraph(f"<b>{escape(label)}:</b> {escape(value)}", style["compact"]))
    section(story, style, data["sections"]["languages"])
    story.append(Paragraph(escape(data["languages"]), style["compact"])); story.append(Paragraph(escape(data["training"]), style["compact"]))

    doc = SimpleDocTemplate(str(target), pagesize=A4, leftMargin=0.65*inch, rightMargin=0.65*inch, topMargin=0.50*inch, bottomMargin=0.46*inch, title="Joaquín Nicolás Oviedo - Curriculum Vitae", author="", subject="Professional resume")
    doc.build(story)


if __name__ == "__main__":
    for locale in ("es", "en"):
        data = CV[locale]; target = PUBLIC / data["pdf_filename"]
        build(locale, target); (OUTPUT / data["pdf_filename"]).write_bytes(target.read_bytes())
        print(target)

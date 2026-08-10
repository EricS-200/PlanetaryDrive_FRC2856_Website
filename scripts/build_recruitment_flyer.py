from pathlib import Path

from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Planetary-Drive-Recruitment-Flyer.pdf"

W, H = letter
INK = HexColor("#070A10")
INK_SOFT = HexColor("#0C111B")
PAPER = HexColor("#F3F0E9")
PAPER_BRIGHT = HexColor("#FBFAF7")
STEEL = HexColor("#9AA6B8")
LINE = HexColor("#283142")
LINE_LIGHT = HexColor("#CBD1DA")
BLUE = HexColor("#1647FF")
BLUE_LIGHT = HexColor("#7EA0FF")
ORANGE = HexColor("#FF9C2F")
WHITE = HexColor("#FFFFFF")

DISCORD_URL = "https://discord.gg/d36XRMfYUF"
DISCORD_DISPLAY = "discord.gg/d36XRMfYUF"
WEBSITE = "teamplanetarydrive.com"


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    choices = {
        "Body": font_dir / "segoeui.ttf",
        "BodyBold": font_dir / "segoeuib.ttf",
        "Display": font_dir / "arialbd.ttf",
        "Mono": font_dir / "consola.ttf",
        "MonoBold": font_dir / "consolab.ttf",
    }
    for name, path in choices.items():
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))


def font(name):
    fallback = {
        "Body": "Helvetica",
        "BodyBold": "Helvetica-Bold",
        "Display": "Helvetica-Bold",
        "Mono": "Courier",
        "MonoBold": "Courier-Bold",
    }
    return name if name in pdfmetrics.getRegisteredFontNames() else fallback[name]


def wrap_lines(text, face, size, width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if pdfmetrics.stringWidth(candidate, face, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_paragraph(c, text, x, y, width, size=10, leading=14, color=INK, face=None):
    face = face or font("Body")
    c.setFillColor(color)
    c.setFont(face, size)
    for line in wrap_lines(text, face, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_contained_image(c, path, x, y, width, height):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = min(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    dx = x + (width - dw) / 2
    dy = y + (height - dh) / 2
    c.drawImage(image, dx, dy, width=dw, height=dh, preserveAspectRatio=True, mask="auto")


def draw_wordmark(c, x, y):
    logo = ROOT / "public" / "blue_logo.png"
    size = 39
    c.drawImage(str(logo), x, y - size + 5, width=size, height=size, preserveAspectRatio=True, mask="auto")
    c.setFillColor(WHITE)
    c.setFont(font("BodyBold"), 15.2)
    c.drawString(x + 48, y - 7, "planetary drive")
    c.setFillColor(BLUE_LIGHT)
    c.setFont(font("MonoBold"), 6.2)
    c.drawString(x + 49, y - 20, "FIRST ROBOTICS COMPETITION")


def draw_qr(c, data, x, y, size):
    quiet = 8
    c.setFillColor(WHITE)
    c.rect(x, y, size, size, fill=1, stroke=0)

    qr = QrCodeWidget(data)
    qr.barFillColor = INK
    qr.barWidth = size - quiet * 2
    qr.barHeight = size - quiet * 2
    bounds = qr.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    drawing = Drawing(size - quiet * 2, size - quiet * 2)
    drawing.add(qr)
    drawing.width = width
    drawing.height = height
    renderPDF.draw(drawing, c, x + quiet, y + quiet)


def draw_grid(c):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.3)
    for x in range(0, int(W) + 1, 24):
        c.line(x, 370, x, H)
    for y in range(370, int(H) + 1, 24):
        c.line(0, y, W, y)

    c.setStrokeColor(HexColor("#354052"))
    c.setLineWidth(0.55)
    c.circle(509, 621, 88, fill=0, stroke=1)
    c.circle(509, 621, 103, fill=0, stroke=1)
    c.setFillColor(ORANGE)
    c.circle(596, 665, 3.4, fill=1, stroke=0)


def draw_corner_marks(c, x, y, width, height):
    c.setStrokeColor(BLUE_LIGHT)
    c.setLineWidth(1)
    mark = 11
    c.line(x, y + height, x + mark, y + height)
    c.line(x, y + height, x, y + height - mark)
    c.line(x + width, y + height, x + width - mark, y + height)
    c.line(x + width, y + height, x + width, y + height - mark)
    c.line(x, y, x + mark, y)
    c.line(x, y, x, y + mark)
    c.line(x + width, y, x + width - mark, y)
    c.line(x + width, y, x + width, y + mark)


def draw_pathway(c, number, title, detail, y):
    x = 38
    c.setFillColor(BLUE)
    c.setFont(font("MonoBold"), 7.2)
    c.drawString(x, y + 4, number)
    c.setStrokeColor(BLUE)
    c.setLineWidth(1.4)
    c.line(x + 23, y + 7, x + 53, y + 7)

    c.setFillColor(INK)
    c.setFont(font("BodyBold"), 10.6)
    c.drawString(x + 64, y + 1, title)
    c.setFillColor(HexColor("#566170"))
    c.setFont(font("Body"), 8.6)
    c.drawString(x + 64, y - 12, detail)


def build_flyer():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()

    c = canvas.Canvas(str(OUT), pagesize=letter, pageCompression=1)
    c.setTitle("Planetary Drive Robotics Recruitment Flyer")
    c.setAuthor("Planetary Drive Robotics - FRC Team 2856")
    c.setSubject("Student recruitment information for Planetary Drive Robotics")

    # Hero field
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    draw_grid(c)
    draw_wordmark(c, 38, H - 36)

    c.setFillColor(STEEL)
    c.setFont(font("MonoBold"), 6.5)
    c.drawRightString(W - 38, H - 36, "FRC TEAM 2856  /  LEXINGTON, KY")

    c.setFillColor(BLUE_LIGHT)
    c.setFont(font("MonoBold"), 7)
    c.drawString(38, 690, "OPEN TO FCPS HIGH-SCHOOL STUDENTS")

    robot_x, robot_y, robot_w, robot_h = 205, 400, 381, 279
    c.setFillColor(HexColor("#2D3543"))
    c.rect(robot_x, robot_y, robot_w, robot_h, fill=1, stroke=0)
    draw_contained_image(
        c,
        ROOT / "public" / "robot-assets" / "robot iso front lower angle.png",
        robot_x,
        robot_y,
        robot_w,
        robot_h,
    )
    draw_corner_marks(c, robot_x, robot_y, robot_w, robot_h)
    c.setFillColor(BLUE_LIGHT)
    c.setFont(font("MonoBold"), 6)
    c.drawRightString(robot_x + robot_w - 10, robot_y + 10, "2026 ROBOT  /  CAD DEVELOPMENT VIEW")

    c.setFillColor(WHITE)
    c.setFont(font("Display"), 50)
    c.drawString(38, 636, "BUILD")
    c.setFont(font("Display"), 42)
    c.drawString(38, 588, "SOMETHING")
    c.setFillColor(ORANGE)
    c.setFont(font("Display"), 58)
    c.drawString(38, 526, "REAL.")

    c.setFillColor(STEEL)
    c.setFont(font("Body"), 9.5)
    c.drawString(40, 500, "Design it. Program it. Fabricate it.")
    c.setFillColor(WHITE)
    c.setFont(font("BodyBold"), 9.5)
    c.drawString(40, 485, "Then put it on the field.")

    # Discipline band
    c.setFillColor(BLUE)
    c.rect(0, 336, W, 40, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(font("MonoBold"), 8.2)
    c.drawCentredString(W / 2, 351, "PROGRAM  /  FABRICATE  /  WIRE  /  COMPETE")

    # Recruitment field
    c.setFillColor(PAPER)
    c.rect(0, 0, W, 336, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.rect(38, 300, 23, 4, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(font("Display"), 23)
    c.drawString(38, 270, "JOIN PLANETARY DRIVE")

    intro = (
        "Design, build, and program a full-size competition robot with other "
        "Fayette County students. No previous robotics experience required."
    )
    draw_paragraph(c, intro, 38, 248, 348, size=9.6, leading=13, color=HexColor("#394351"))

    draw_pathway(c, "01", "PROGRAMMING", "Java, WPILib, sensors, controls", 202)
    draw_pathway(c, "02", "ELECTROMECHANICAL", "CAD, fabrication, wiring, assembly", 164)
    draw_pathway(c, "03", "BEYOND THE ROBOT", "competition, media, teamwork, leadership", 126)

    c.setStrokeColor(LINE_LIGHT)
    c.setLineWidth(0.6)
    c.line(38, 92, 386, 92)
    c.setFillColor(BLUE)
    c.setFont(font("MonoBold"), 6.5)
    c.drawString(38, 76, "TYPICAL BUILD-SEASON MEETINGS")
    c.setFillColor(INK)
    c.setFont(font("BodyBold"), 8.4)
    c.drawString(38, 62, "Mon / Wed / Fri 4-9 PM  +  Sat 10 AM-4 PM")
    c.setFillColor(HexColor("#566170"))
    c.setFont(font("Body"), 7.7)
    c.drawString(38, 48, "Newton's Attic  /  Confirm the current schedule in Discord")

    # QR callout
    qr_x, qr_y, qr_size = 424, 91, 144
    c.setFillColor(ORANGE)
    c.rect(qr_x, 272, qr_size, 27, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(font("MonoBold"), 10)
    c.drawCentredString(qr_x + qr_size / 2, 281, "JOIN NOW")
    c.setFillColor(INK)
    c.setFont(font("BodyBold"), 9.4)
    c.drawCentredString(qr_x + qr_size / 2, 255, "Scan for the team Discord")
    draw_qr(c, DISCORD_URL, qr_x, qr_y, qr_size)
    c.linkURL(DISCORD_URL, (qr_x, 72, qr_x + qr_size, 272), relative=0, thickness=0)
    c.setFillColor(INK)
    c.setFont(font("MonoBold"), 6.8)
    c.drawCentredString(qr_x + qr_size / 2, 75, DISCORD_DISPLAY)

    # Footer
    c.setFillColor(INK)
    c.rect(0, 0, W, 29, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(font("MonoBold"), 8)
    c.drawString(38, 10, WEBSITE)
    c.linkURL("https://teamplanetarydrive.com", (36, 5, 181, 24), relative=0, thickness=0)
    c.setFillColor(STEEL)
    c.setFont(font("Mono"), 6.4)
    c.drawRightString(W - 38, 10, "PLANETARY DRIVE ROBOTICS  /  TEAM 2856")

    c.showPage()
    c.save()


if __name__ == "__main__":
    build_flyer()
    print(OUT)

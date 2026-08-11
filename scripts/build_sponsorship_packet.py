from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Planetary-Drive-Sponsorship-Packet.pdf"
PUBLIC_COPY = ROOT / "public" / "sponsors" / "Sponsorship-Packet.pdf"

W, H = letter
INK = HexColor("#070A10")
INK_SOFT = HexColor("#0C111B")
INK_RAISED = HexColor("#121925")
PAPER = HexColor("#F3F0E9")
PAPER_BRIGHT = HexColor("#FBFAF7")
STEEL = HexColor("#9AA6B8")
LINE = HexColor("#283142")
LINE_LIGHT = HexColor("#CBD1DA")
BLUE = HexColor("#1647FF")
BLUE_LIGHT = HexColor("#7EA0FF")
ORANGE = HexColor("#FF9C2F")
WHITE = HexColor("#FFFFFF")

MARGIN = 44


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


def paragraph(c, text, x, y, width, size=10.2, leading=15, color=INK, face=None):
    face = face or font("Body")
    c.setFillColor(color)
    c.setFont(face, size)
    for line in wrap_lines(text, face, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def label(c, text, x, y, color=BLUE):
    c.setFillColor(color)
    c.setFont(font("MonoBold"), 6.6)
    c.drawString(x, y, text.upper())


def title(c, text, x, y, width, size=34, color=INK, leading=None):
    face = font("Display")
    leading = leading or size * 0.95
    c.setFillColor(color)
    c.setFont(face, size)
    for line in wrap_lines(text, face, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def cover_image(c, path, x, y, width, height, anchor_x=0.5, anchor_y=0.5):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = max(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    dx = x - (dw - width) * anchor_x
    dy = y - (dh - height) * anchor_y
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, width, height)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(image, dx, dy, width=dw, height=dh, mask="auto")
    c.restoreState()


def wordmark(c, x, y, color=INK, compact=False):
    mark = ROOT / "public" / "blue_logo.png"
    size = 26 if compact else 34
    c.drawImage(str(mark), x, y - size + 4, width=size, height=size, preserveAspectRatio=True, mask="auto")
    c.setFillColor(color)
    c.setFont(font("BodyBold"), 11 if compact else 14)
    c.drawString(x + size + 8, y - 7, "PLANETARY DRIVE")
    c.setFillColor(BLUE if color != WHITE else BLUE_LIGHT)
    c.setFont(font("MonoBold"), 5.8 if compact else 6.7)
    c.drawString(x + size + 8, y - 18, "FIRST ROBOTICS COMPETITION TEAM 2856")


def page_header(c, number, dark=False):
    fg = WHITE if dark else INK
    line = LINE if dark else LINE_LIGHT
    wordmark(c, MARGIN, H - 31, fg, compact=True)
    c.setStrokeColor(line)
    c.setLineWidth(0.6)
    c.line(MARGIN, H - 62, W - MARGIN, H - 62)
    c.setFillColor(STEEL if dark else HexColor("#667080"))
    c.setFont(font("MonoBold"), 6.2)
    c.drawRightString(W - MARGIN, H - 31, f"SPONSORSHIP OVERVIEW  /  0{number}")


def page_footer(c, number, dark=False):
    fg = STEEL if dark else HexColor("#667080")
    line = LINE if dark else LINE_LIGHT
    c.setStrokeColor(line)
    c.setLineWidth(0.6)
    c.line(MARGIN, 34, W - MARGIN, 34)
    c.setFillColor(fg)
    c.setFont(font("Mono"), 6.2)
    c.drawString(MARGIN, 20, "TEAMPLANETARYDRIVE.COM  /  PLANETARYDRIVE2856@GMAIL.COM")
    c.drawRightString(W - MARGIN, 20, f"FRC 2856  /  {number:02d}")


def draw_cover(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setStrokeColor(LINE)
    c.setLineWidth(0.35)
    for x in range(0, int(W) + 1, 36):
        c.line(x, 340, x, H)
    for y in range(340, int(H) + 1, 36):
        c.line(0, y, W, y)

    wordmark(c, MARGIN, H - 54, WHITE)
    c.setFillColor(ORANGE)
    c.rect(MARGIN, H - 98, 95, 17, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(font("MonoBold"), 6.4)
    c.drawCentredString(MARGIN + 47.5, H - 92.5, "LEXINGTON, KENTUCKY")

    label(c, "PARTNERSHIP MATERIALS", MARGIN, H - 145, BLUE_LIGHT)
    c.setFillColor(WHITE)
    c.setFont(font("Display"), 45)
    c.drawString(MARGIN, H - 205, "SPONSORSHIP")
    c.drawString(MARGIN, H - 250, "OVERVIEW")
    c.setFillColor(STEEL)
    c.setFont(font("Body"), 10.5)
    c.drawString(MARGIN, H - 280, "Support the students, tools, travel, and iteration behind the robot.")

    robot = ROOT / "public" / "robot-assets" / "robot iso front lower angle.png"
    cover_image(c, robot, 0, 0, W, 330, anchor_x=0.52, anchor_y=0.52)
    c.setFillColor(HexColor("#070A10B8"))
    c.rect(0, 0, W, 42, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(font("MonoBold"), 6.2)
    c.drawString(MARGIN, 19, "PLANETARY DRIVE ROBOTICS")
    c.drawRightString(W - MARGIN, 19, "FRC TEAM 2856  /  FOUNDED 2009")
    c.showPage()


def draw_about(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    page_header(c, 2)

    label(c, "ABOUT THE TEAM", MARGIN, H - 94)
    y = title(c, "A student team with real deadlines.", MARGIN, H - 125, 325, 31)
    y -= 9
    y = paragraph(
        c,
        "Founded in Lexington in 2009, Planetary Drive is FIRST Robotics Competition Team 2856. Fayette County high-school students design, build, and program a new competition robot each season.",
        MARGIN,
        y,
        300,
        size=10.3,
        leading=15.2,
    )
    y -= 13
    paragraph(
        c,
        "Students lead the day-to-day work. Mentors teach safe practice, share technical experience, and help the team manage the registration, travel, and logistics required to compete.",
        MARGIN,
        y,
        300,
        size=9.7,
        leading=14.5,
        color=HexColor("#4D5664"),
    )

    photo = ROOT / "source-assets" / "additional-photos" / "IMG_1720.jpg"
    cover_image(c, photo, 380, H - 342, 188, 232, anchor_x=0.52, anchor_y=0.45)
    c.setFillColor(ORANGE)
    c.rect(380, H - 358, 188, 16, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(font("MonoBold"), 5.8)
    c.drawString(387, H - 352.5, "TEAM 2856  /  COMPETITION PIT")

    c.setStrokeColor(LINE_LIGHT)
    c.line(MARGIN, 424, W - MARGIN, 424)
    facts = [("2009", "FOUNDED"), ("2856", "FRC TEAM"), ("FCPS", "STUDENT ELIGIBILITY")]
    fx = MARGIN
    for idx, (big, small) in enumerate(facts):
        c.setFillColor(BLUE)
        c.setFont(font("Display"), 25)
        c.drawString(fx, 388, big)
        c.setFillColor(HexColor("#667080"))
        c.setFont(font("MonoBold"), 5.7)
        c.drawString(fx, 375, small)
        if idx < 2:
            c.setStrokeColor(LINE_LIGHT)
            c.line(fx + 150, 372, fx + 150, 413)
        fx += 174

    c.setFillColor(INK_SOFT)
    c.rect(MARGIN, 118, W - 2 * MARGIN, 218, fill=1, stroke=0)
    label(c, "OUR MISSION", MARGIN + 25, 304, ORANGE)
    title(c, "Make room for students to learn by doing.", MARGIN + 25, 276, 270, 25, WHITE, 25)
    paragraph(
        c,
        "Planetary Drive gives students a place to apply classroom knowledge to a real machine. The work develops critical thinking, collaboration, creativity, perseverance, communication, and leadership because the team needs those skills to solve the problem in front of it.",
        MARGIN + 25,
        185,
        265,
        size=9.3,
        leading=14,
        color=HexColor("#C5CDD8"),
    )
    c.setStrokeColor(LINE)
    c.line(350, 142, 350, 305)
    label(c, "WHAT IS FRC?", 378, 304, BLUE_LIGHT)
    paragraph(
        c,
        "FIRST Robotics Competition challenges high-school teams to solve a new game each year by designing, fabricating, programming, and driving a full-size robot. Teams compete hard while sharing knowledge, parts, and help across the community.",
        378,
        272,
        164,
        size=9.3,
        leading=14,
        color=HexColor("#C5CDD8"),
    )

    page_footer(c, 2)
    c.showPage()


def draw_support(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    page_header(c, 3, dark=True)
    label(c, "WHAT SUPPORT ENABLES", MARGIN, H - 94, ORANGE)
    title(c, "A season is built from practical needs.", MARGIN, H - 126, 480, 34, WHITE)
    paragraph(
        c,
        "Needs change with each game, but these categories remain central to building a robot and giving students a complete competition season.",
        MARGIN,
        H - 205,
        445,
        size=9.7,
        leading=14.5,
        color=STEEL,
    )

    cards = [
        ("01", "Competition registration", "A place to put months of engineering work on the field."),
        ("02", "Travel and lodging", "Transportation for students, mentors, tools, and the robot."),
        ("03", "Raw materials", "Metal, sheet goods, fasteners, and fabrication stock."),
        ("04", "Electronics and parts", "Motors, sensors, controllers, wiring, and standard components."),
        ("05", "Tools and upgrades", "Reliable tools, replacement parts, and targeted improvements."),
        ("06", "Outreach", "Materials that help students share the work with the community."),
    ]
    grid_x, grid_y = MARGIN, 164
    card_w = (W - 2 * MARGIN) / 2
    card_h = 126
    for i, (number, heading, copy) in enumerate(cards):
        col = i % 2
        row = 2 - i // 2
        x = grid_x + col * card_w
        y = grid_y + row * card_h
        c.setFillColor(INK_RAISED)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.7)
        c.rect(x, y, card_w, card_h, fill=1, stroke=1)
        c.setFillColor(BLUE_LIGHT)
        c.setFont(font("MonoBold"), 6.4)
        c.drawString(x + 16, y + card_h - 20, number)
        c.setFillColor(ORANGE)
        c.circle(x + card_w - 22, y + card_h - 18, 3, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(font("Display"), 14.3)
        for line_idx, line in enumerate(wrap_lines(heading, font("Display"), 14.3, card_w - 32)):
            c.drawString(x + 16, y + 74 - line_idx * 15, line)
        paragraph(c, copy, x + 16, y + 38, card_w - 32, size=7.8, leading=11.2, color=STEEL)

    c.setFillColor(ORANGE)
    c.rect(MARGIN, 79, W - 2 * MARGIN, 54, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(font("Display"), 16)
    c.drawString(MARGIN + 18, 105, "Financial and in-kind support are both useful.")
    c.setFont(font("Body"), 7.8)
    c.drawString(MARGIN + 18, 91, "Materials, parts, supplies, tools, equipment, and professional services may fit current needs.")
    page_footer(c, 3, dark=True)
    c.showPage()


def draw_impact(c):
    c.setFillColor(PAPER_BRIGHT)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    page_header(c, 4)
    label(c, "STUDENT IMPACT", MARGIN, H - 94)
    title(c, "What students take with them.", MARGIN, H - 126, 430, 34)
    paragraph(
        c,
        "Sponsor support gives students the time, tools, and access to develop skills through the real work of building and competing.",
        MARGIN,
        H - 185,
        435,
        size=9.7,
        leading=14.5,
        color=HexColor("#4D5664"),
    )

    columns = [
        ("01", "Programming", ["Java and WPILib", "Testing and debugging", "GitHub and team workflows"]),
        ("02", "Engineering", ["CAD and mechanical design", "Fabrication and safe shop practice", "Electrical systems and wiring"]),
        ("03", "Teamwork", ["Problem-solving under deadlines", "Communication and leadership", "Outreach and organization"]),
    ]
    col_w = (W - 2 * MARGIN - 28) / 3
    for i, (number, heading, items) in enumerate(columns):
        x = MARGIN + i * (col_w + 14)
        c.setStrokeColor(LINE_LIGHT)
        c.line(x, 554, x + col_w, 554)
        c.setFillColor(BLUE)
        c.setFont(font("MonoBold"), 6.2)
        c.drawString(x, 537, number)
        c.setFillColor(INK)
        c.setFont(font("Display"), 18)
        c.drawString(x, 508, heading)
        yy = 480
        for item in items:
            c.setFillColor(ORANGE)
            c.rect(x, yy + 3, 5, 5, fill=1, stroke=0)
            yy = paragraph(c, item, x + 13, yy + 8, col_w - 13, size=8.1, leading=11.8, color=HexColor("#4D5664")) - 8

    build_photo = ROOT / "source-assets" / "additional-photos" / "IMG_6122.jpg"
    cover_image(c, build_photo, MARGIN, 186, 256, 190, anchor_x=0.5, anchor_y=0.48)
    c.setFillColor(INK_SOFT)
    c.rect(318, 186, 250, 190, fill=1, stroke=0)
    label(c, "PARTNER WITH THE TEAM", 342, 345, ORANGE)
    heading_y = title(c, "Start with a conversation.", 342, 314, 196, 18.5, WHITE, 20)
    paragraph(
        c,
        "The team can confirm its current priorities, answer questions about financial or in-kind support, and discuss current recognition opportunities directly.",
        342,
        heading_y - 8,
        196,
        size=8.7,
        leading=13,
        color=HexColor("#C5CDD8"),
    )
    c.setStrokeColor(LINE)
    c.line(342, 220, 540, 220)
    c.setFillColor(WHITE)
    c.setFont(font("BodyBold"), 8.4)
    c.drawString(342, 204, "planetarydrive2856@gmail.com")

    c.setFillColor(BLUE)
    c.rect(MARGIN, 74, W - 2 * MARGIN, 80, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(font("Display"), 20)
    c.drawString(MARGIN + 19, 118, "Build the next season with Team 2856.")
    c.setFont(font("MonoBold"), 6.4)
    c.drawString(MARGIN + 19, 95, "TEAMPLANETARYDRIVE.COM/SPONSORS")
    c.drawRightString(W - MARGIN - 19, 95, "LEXINGTON, KENTUCKY")
    page_footer(c, 4)
    c.showPage()


def build():
    register_fonts()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=letter, pageCompression=1)
    c.setTitle("Planetary Drive Robotics Sponsorship Overview")
    c.setAuthor("Planetary Drive Robotics - FIRST Robotics Competition Team 2856")
    c.setSubject("Sponsorship information for Planetary Drive Robotics in Lexington, Kentucky")
    draw_cover(c)
    draw_about(c)
    draw_support(c)
    draw_impact(c)
    c.save()
    PUBLIC_COPY.write_bytes(OUT.read_bytes())
    print(OUT)
    print(PUBLIC_COPY)


if __name__ == "__main__":
    build()

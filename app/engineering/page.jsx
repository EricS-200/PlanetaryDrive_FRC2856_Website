import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Braces, Cable, DraftingCompass, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import RobotExplorer from "@/components/RobotExplorer";
import robotPit from "../../public/images/team/IMG_1664.webp";
import wiring from "../../public/images/team/IMG_7231.webp";
import assembly from "../../public/images/team/IMG_7342.webp";
import field from "../../public/images/team/IMG_1740.webp";

export const metadata = {
  title: "Engineering",
  description:
    "Explore Planetary Drive's 2026 robot CAD and the design, fabrication, electrical, and programming work behind FRC Team 2856.",
  alternates: { canonical: "/engineering" },
};

const disciplines = [
  {
    icon: DraftingCompass,
    number: "01",
    title: "CAD & design",
    text: "Before material is cut, the team turns strategy into layouts, mechanisms, interfaces, and assemblies that can be discussed and improved.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Fabrication & assembly",
    text: "Students measure, machine, fasten, align, and rebuild mechanisms while learning how tolerances and serviceability affect the whole robot.",
  },
  {
    icon: Cable,
    number: "03",
    title: "Electrical systems",
    text: "Power distribution, motor controllers, sensors, pneumatics, and careful wiring turn a mechanical frame into a controllable machine.",
  },
  {
    icon: Braces,
    number: "04",
    title: "Programming & controls",
    text: "Java and WPILib connect driver controls, sensors, and mechanisms. Testing and debugging happen on the same hardware the robot takes to the field.",
  },
];

export default function EngineeringPage() {
  return (
    <main id="main-content" className="engineering-page">
      <section className="engineering-hero">
        <div className="site-shell engineering-hero-grid">
          <div className="engineering-hero-copy">
            <p className="eyebrow">ROBOT / ENGINEERING / 2026</p>
            <h1>The robot is the syllabus.</h1>
            <p>
              A competition robot forces every discipline to meet in one machine.
              It has to survive contact, respond to code, fit the rules, and be
              repairable between matches.
            </p>
            <div className="button-row">
              <a
                href="https://github.com/TeamPlanetaryDrive"
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
              >
                View our code <ArrowRight size={18} />
              </a>
              <Link href="/join" className="button button-ghost">
                Learn with us
              </Link>
            </div>
          </div>
          <figure className="engineering-hero-robot">
            <Image
              src="/robot-assets/robot iso front.png"
              alt="CAD render of Planetary Drive's 2026 FRC robot"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <figcaption>
              <span>2026 COMPETITION ROBOT</span>
              <span>CAD / ISOMETRIC FRONT</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section cad-section">
        <div className="site-shell">
          <Reveal className="section-heading-row cad-heading">
            <div>
              <p className="eyebrow">THE 2026 MACHINE</p>
              <h2 className="display-heading">Study it from every side.</h2>
            </div>
            <p>
              The full CAD assembly lets the team inspect packaging, clearances,
              structure, and access before parts reach the workshop. Use the
              controls below to move between five derived views.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <RobotExplorer />
          </Reveal>
        </div>
      </section>

      <section className="section discipline-section">
        <div className="site-shell">
          <Reveal className="section-heading-row">
            <div>
              <p className="eyebrow">ONE ROBOT · MANY DISCIPLINES</p>
              <h2 className="display-heading">Engineering is a relay race.</h2>
            </div>
            <p>
              A mechanism is not finished when it looks right in CAD. It still has
              to be built, wired, controlled, tested, repaired, and explained to the
              rest of the team.
            </p>
          </Reveal>
          <div className="discipline-list">
            {disciplines.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="discipline-row" delay={index * 70} key={item.number}>
                  <span className="discipline-number">{item.number}</span>
                  <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="engineering-photo-section">
        <div className="site-shell engineering-photo-grid">
          <Reveal className="engineering-photo-large">
            <Image
              src={robotPit}
              alt="Planetary Drive students servicing a previous-season robot in the competition pits"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <figcaption>Previous-season robot · pit service</figcaption>
          </Reveal>
          <div className="engineering-photo-stack">
            <Reveal className="engineering-photo-small" delay={80}>
              <Image
                src={wiring}
                alt="Planetary Drive robot frame during electrical wiring work"
                fill
                placeholder="blur"
                sizes="(max-width: 800px) 100vw, 34vw"
              />
              <figcaption>Electrical integration</figcaption>
            </Reveal>
            <Reveal className="engineering-photo-small" delay={140}>
              <Image
                src={assembly}
                alt="Planetary Drive student assembling a robot mechanism in the workshop"
                fill
                placeholder="blur"
                sizes="(max-width: 800px) 100vw, 34vw"
              />
              <figcaption>Mechanical assembly</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section iteration-section">
        <div className="site-shell iteration-grid">
          <Reveal className="iteration-copy">
            <p className="eyebrow">THE LOOP THAT MATTERS</p>
            <h2 className="display-heading">Build it. Run it. Find the next problem.</h2>
            <p className="large-copy">
              Competition makes feedback immediate. A change that works in the
              shop still has to work with drivers, game pieces, defense, a match
              clock, and the rest of the robot. That is why iteration is not a
              cleanup step—it is the process.
            </p>
            <Link href="/about" className="text-link">
              How the team works <ArrowRight size={17} />
            </Link>
          </Reveal>
          <Reveal className="iteration-media" delay={100}>
            <Image
              src={field}
              alt="Planetary Drive robot operating during a FIRST Robotics match"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 46vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="engineering-cta">
        <div className="site-shell engineering-cta-inner">
          <span className="technical-label">THE NEXT BUILD STARTS WITH PEOPLE</span>
          <h2>Want to write the code, make the part, or help students do both?</h2>
          <div className="button-row">
            <Link href="/join" className="button button-light">
              Join or mentor <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="button button-light-outline">
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

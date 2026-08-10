import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CircuitBoard,
  DraftingCompass,
  Wrench,
} from "lucide-react";
import HeroRobot from "@/components/HeroRobot";
import Reveal from "@/components/Reveal";
import SponsorGrid from "@/components/SponsorGrid";
import pitRobot from "../public/images/team/IMG_1720.webp";
import buildFloor from "../public/images/team/IMG_0627.webp";
import fieldRobot from "../public/images/team/IMG_1740.webp";
import pitWork from "../public/images/team/IMG_5151.webp";

const buildPhases = [
  {
    number: "01",
    title: "Understand the game",
    text: "Read the rules, study how points are scored, and decide what the robot must do well.",
    icon: DraftingCompass,
  },
  {
    number: "02",
    title: "Design and fabricate",
    text: "Turn sketches and CAD into mechanisms, wiring, structure, and a machine that can take a hit.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Write the controls",
    text: "Build the Java and WPILib software that connects driver input, sensors, and every moving part.",
    icon: Braces,
  },
  {
    number: "04",
    title: "Test, break, repeat",
    text: "Run the robot, find the weak point, fix it, and go again until competition day.",
    icon: CircuitBoard,
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="site-shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">FIRST ROBOTICS · TEAM 2856 · LEXINGTON, KY</p>
            <h1>
              We build robots
              <span>that have to work.</span>
            </h1>
            <p className="hero-intro">
              Planetary Drive is a student-led high-school engineering team. Every
              season, we design, fabricate, wire, and program a new competition
              robot from the ground up.
            </p>
            <div className="button-row">
              <Link href="/engineering" className="button button-primary">
                Explore the robot <ArrowRight size={18} />
              </Link>
              <Link href="/join" className="button button-ghost">
                Join Team 2856
              </Link>
            </div>
          </div>
          <HeroRobot />
        </div>

        <div className="site-shell hero-data-rail" aria-label="Team facts">
          <div>
            <span>2856</span>
            <p>FRC team number</p>
          </div>
          <div>
            <span>2009</span>
            <p>Founded in Lexington</p>
          </div>
          <div>
            <span>Every season</span>
            <p>A new game and a new robot</p>
          </div>
          <div>
            <span>Student led</span>
            <p>Mentor supported</p>
          </div>
        </div>
      </section>

      <section className="section home-story-section">
        <div className="site-shell home-story-grid">
          <Reveal className="home-story-copy">
            <p className="eyebrow">THIS IS PLANETARY DRIVE</p>
            <h2 className="display-heading">
              A full-size robot is a very good reason to learn something new.
            </h2>
            <p className="large-copy">
              We are FRC Team 2856, a group of Fayette County high-school students
              who like making ambitious things real. Programming and
              electromechanical students work side by side, guided by mentors and
              a deadline that does not move.
            </p>
            <Link href="/about" className="text-link">
              Meet the team <ArrowRight size={17} />
            </Link>
          </Reveal>

          <Reveal className="home-photo-composition" delay={100}>
            <figure className="photo-main">
              <Image
                src={pitRobot}
                alt="Planetary Drive students working around their robot in the competition pits"
                fill
                placeholder="blur"
                sizes="(max-width: 800px) 90vw, 48vw"
              />
              <figcaption>Competition pit · hands on, heads in</figcaption>
            </figure>
            <figure className="photo-inset">
              <Image
                src={buildFloor}
                alt="Two Planetary Drive students assembling robot parts on the workshop floor"
                fill
                placeholder="blur"
                sizes="(max-width: 800px) 42vw, 18vw"
              />
            </figure>
            <span className="photo-index" aria-hidden="true">2856 / PEOPLE</span>
          </Reveal>
        </div>
      </section>

      <section className="first-section">
        <div className="site-shell first-grid">
          <Reveal className="first-media">
            <Image
              src={fieldRobot}
              alt="Planetary Drive robot 2856 competing on a FIRST Robotics field"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 55vw"
            />
            <span>ROBOT 2856 · ON FIELD</span>
          </Reveal>
          <Reveal className="first-copy" delay={100}>
            <p className="eyebrow">WHAT IS FIRST?</p>
            <h2>Part engineering challenge. Part live sport.</h2>
            <p>
              Each January, FIRST releases a new game. Teams design and build a
              robot for that game, then meet on a field where alliances compete,
              troubleshoot, and help one another under real pressure.
            </p>
            <p>
              The robot changes every year. The habits—curiosity, resilience,
              communication, and learning from failure—stay with us much longer.
            </p>
            <a
              href="https://www.firstinspires.org/robotics/frc"
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              About FIRST Robotics <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section process-section">
        <div className="site-shell">
          <Reveal className="section-heading-row">
            <div>
              <p className="eyebrow">HOW A SEASON MOVES</p>
              <h2 className="display-heading">Idea. Metal. Code. Repeat.</h2>
            </div>
            <p>
              There is no single “robotics skill.” A working machine takes strategy,
              CAD, fabrication, electronics, software, communication, and a lot of
              iteration.
            </p>
          </Reveal>

          <div className="process-rail">
            {buildPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <Reveal className="process-step" delay={index * 80} key={phase.number}>
                  <div className="process-step-top">
                    <span>{phase.number}</span>
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section pathways-section">
        <div className="site-shell pathways-grid">
          <Reveal className="pathways-media">
            <Image
              src={pitWork}
              alt="Planetary Drive students and a mentor inspecting their robot at competition"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 45vw"
            />
            <div className="pathways-media-label">NO EXPERIENCE REQUIRED</div>
          </Reveal>
          <Reveal className="pathways-copy" delay={100}>
            <p className="eyebrow">THERE IS A PLACE TO START</p>
            <h2 className="display-heading">Learn by contributing to something real.</h2>
            <div className="pathway-row">
              <span>01</span>
              <div>
                <h3>Programming</h3>
                <p>Java, WPILib, sensors, controls, testing, and debugging on the actual robot.</p>
              </div>
            </div>
            <div className="pathway-row">
              <span>02</span>
              <div>
                <h3>Electromechanical</h3>
                <p>CAD, fabrication, assembly, wiring, pneumatics, and safe workshop practice.</p>
              </div>
            </div>
            <Link href="/join" className="button button-primary">
              How to join <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section home-sponsors-section">
        <div className="site-shell">
          <Reveal className="section-heading-row sponsor-heading">
            <div>
              <p className="eyebrow">POWERED BY COMMUNITY</p>
              <h2 className="display-heading">The people behind the machine.</h2>
            </div>
            <div>
              <p>
                Sponsors help cover the parts, tools, registration, and travel that
                turn a school-year project into a competition robot.
              </p>
              <Link href="/sponsors" className="text-link">
                See every sponsor <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SponsorGrid compact />
          </Reveal>
        </div>
      </section>

      <section className="home-final-cta">
        <div className="site-shell home-final-cta-inner">
          <p className="eyebrow">YOUR NEXT MOVE</p>
          <h2>Build with us. Back the team. Come see what 2856 can do.</h2>
          <div className="button-row">
            <Link href="/join" className="button button-light">
              Join the team <ArrowRight size={18} />
            </Link>
            <Link href="/sponsors" className="button button-light-outline">
              Sponsor Planetary Drive
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

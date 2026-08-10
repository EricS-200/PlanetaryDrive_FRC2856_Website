import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Braces, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import teamPhoto from "../../public/team_pics/main-banner2.jpg";
import shopGroup from "../../public/images/team/IMG_6122.webp";
import fabrication from "../../public/images/team/IMG_6124.webp";
import competition from "../../public/images/team/IMG_1721.webp";

export const metadata = {
  title: "About the Team",
  description:
    "Meet Planetary Drive Robotics, FRC Team 2856: a student-led team founded in 2009 in Lexington, Kentucky.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Users,
    title: "Teamwork",
    text: "The robot only works when mechanical, electrical, programming, strategy, and drive-team decisions work together.",
  },
  {
    icon: ShieldCheck,
    title: "Dedication",
    text: "Hard problems take patience. We learn to stay with them, ask for help, and keep improving the work.",
  },
  {
    icon: Sparkles,
    title: "Creativity",
    text: "There is rarely one correct mechanism or one clean path to a solution. Good ideas can come from anyone.",
  },
  {
    icon: Heart,
    title: "Fun",
    text: "Long build days are better when the workshop is welcoming, curious, and full of people who enjoy the challenge.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <PageHero
        eyebrow="ABOUT TEAM 2856"
        title="A student team with real deadlines."
        intro="Planetary Drive brings Fayette County high-school students together to design, build, and program a new FIRST Robotics Competition robot each season."
        image={teamPhoto}
        imageAlt="Planetary Drive students together at a robotics event"
        imagePosition="center 42%"
      >
        <Link href="/join" className="button button-primary">
          Find your place <ArrowRight size={18} />
        </Link>
      </PageHero>

      <section className="section about-intro-section">
        <div className="site-shell about-intro-grid">
          <Reveal>
            <p className="eyebrow">WHO WE ARE</p>
            <h2 className="display-heading">Serious about the work. Still very much a team of students.</h2>
          </Reveal>
          <Reveal className="about-intro-copy" delay={100}>
            <p className="large-copy">
              Founded in 2009, Planetary Drive is FRC Team 2856 in Lexington,
              Kentucky. Students lead the design decisions and day-to-day work;
              mentors bring experience, teach safe practice, and help the team
              manage everything required to compete.
            </p>
            <p>
              Robotics gives us a place to use what we learn in class and discover
              the things a classroom cannot simulate: changing requirements,
              limited time, imperfect parts, and teammates who are counting on us.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-mission-section">
        <div className="site-shell about-mission-grid">
          <Reveal className="about-mission-media">
            <Image
              src={shopGroup}
              alt="Planetary Drive students learning around workshop equipment"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 48vw"
            />
          </Reveal>
          <Reveal className="about-mission-copy" delay={100}>
            <p className="eyebrow">OUR MISSION</p>
            <h2>Make room for students to learn by doing.</h2>
            <p>
              We give members the chance to learn new skills, apply them to a real
              robot, and have fun doing it. The work develops critical thinking,
              collaboration, creativity, perseverance, communication, and
              leadership—not as abstract lessons, but as things the team needs.
            </p>
            <p className="mission-note">
              <span>WORKING PRINCIPLE</span>
              Learning happens in the revision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section values-section">
        <div className="site-shell">
          <Reveal className="section-heading-row">
            <div>
              <p className="eyebrow">WHAT GUIDES THE WORK</p>
              <h2 className="display-heading">Four values. Visible in the shop.</h2>
            </div>
            <p>
              They are simple on purpose. The test is whether they still matter
              when time is short and something just broke.
            </p>
          </Reveal>
          <div className="value-list">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal className="value-row" delay={index * 70} key={value.title}>
                  <span>0{index + 1}</span>
                  <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section team-roles-section">
        <div className="site-shell team-roles-grid">
          <Reveal className="team-roles-copy">
            <p className="eyebrow">HOW THE TEAM FITS TOGETHER</p>
            <h2 className="display-heading">Student-led. Mentor-supported. One robot.</h2>
            <div className="role-item">
              <Braces size={25} aria-hidden="true" />
              <div>
                <h3>Programming</h3>
                <p>
                  Students write and maintain the Java and WPILib software, test
                  controls, debug the robot, and often help with assembly when the
                  work crosses disciplines.
                </p>
              </div>
            </div>
            <div className="role-item">
              <span className="role-symbol" aria-hidden="true">M</span>
              <div>
                <h3>Electromechanical</h3>
                <p>
                  Students design and build the machine through CAD, fabrication,
                  mechanics, electronics, pneumatics, wiring, and safe workshop
                  practice.
                </p>
              </div>
            </div>
            <div className="role-item">
              <span className="role-symbol" aria-hidden="true">+</span>
              <div>
                <h3>Mentors & leadership</h3>
                <p>
                  Student leaders organize work and strategy. Adult mentors teach,
                  supervise safety, and help with registration, travel, and the
                  logistics behind competition.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="team-roles-photos">
            <Reveal className="role-photo role-photo-one" delay={80}>
              <Image
                src={fabrication}
                alt="Planetary Drive student carefully using a bandsaw in the workshop"
                fill
                placeholder="blur"
                sizes="(max-width: 800px) 90vw, 28vw"
              />
            </Reveal>
            <Reveal className="role-photo role-photo-two" delay={150}>
              <Image
                src={competition}
                alt="Planetary Drive students carrying their robot at competition"
                fill
                placeholder="blur"
                sizes="(max-width: 800px) 70vw, 24vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="site-shell history-grid">
          <Reveal>
            <p className="eyebrow">A SHORT HISTORY</p>
            <h2>Built season by season since 2009.</h2>
          </Reveal>
          <div className="history-rail">
            <Reveal className="history-event">
              <span>2009</span>
              <div>
                <h3>Team 2856 begins</h3>
                <p>Planetary Drive joins the FIRST Robotics Competition in Lexington, Kentucky.</p>
              </div>
            </Reveal>
            <Reveal className="history-event" delay={80}>
              <span>Every season</span>
              <div>
                <h3>A new challenge</h3>
                <p>New rules and game pieces mean a new strategy, design, codebase, and robot.</p>
              </div>
            </Reveal>
            <Reveal className="history-event" delay={140}>
              <span>Today</span>
              <div>
                <h3>The work continues</h3>
                <p>Students keep learning from mentors, one another, and the machine in front of them.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="site-shell about-cta-inner">
          <div>
            <p className="eyebrow">STEP INTO THE WORKSHOP</p>
            <h2>You do not have to know how to build a robot before you join.</h2>
          </div>
          <div className="button-row">
            <Link href="/join" className="button button-light">
              Start here <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="button button-light-outline">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

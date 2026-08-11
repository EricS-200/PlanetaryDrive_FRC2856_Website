import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Code2,
  MapPin,
  Megaphone,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site, typicalSchedule } from "@/data/site";
import pitWork from "../../public/about-us/robot-work2.jpg";
import workshop from "../../public/join/workshop.jpg";

export const metadata = {
  title: "Join Team 2856",
  description:
    "Join Planetary Drive Robotics, FIRST Robotics Competition Team 2856 in Lexington, Kentucky. No previous robotics experience is required.",
  alternates: { canonical: "/join" },
};

const pathways = [
  {
    number: "01",
    title: "Programming",
    icon: Code2,
    description:
      "Write and test the software that makes the robot respond to drivers, sensors, and the game around it.",
    details: [
      "Learn Java and the WPILib robotics library",
      "Test, debug, and maintain code on the real robot",
      "Work with the build team as mechanisms change",
    ],
  },
  {
    number: "02",
    title: "Electromechanical",
    icon: Wrench,
    description:
      "Turn ideas and CAD into a machine through fabrication, assembly, wiring, and careful iteration in the workshop.",
    details: [
      "Design and fabricate robot mechanisms",
      "Build mechanical and electrical systems safely",
      "Diagnose problems and improve the robot through testing",
    ],
  },
  {
    number: "03",
    title: "Business",
    icon: BriefcaseBusiness,
    description:
      "Keep the season organized through budgeting, purchasing, travel planning, sponsor relationships, and team operations.",
    details: [
      "Help plan budgets, purchases, registration, and travel",
      "Prepare sponsor materials and maintain partner relationships",
      "Learn project management and professional communication",
    ],
  },
  {
    number: "04",
    title: "Outreach",
    icon: Megaphone,
    description:
      "Share the team's work through school and community events, media, demonstrations, and student recruitment.",
    details: [
      "Plan demonstrations and community events",
      "Create team photos, video, social updates, and printed materials",
      "Help new students and visitors understand FIRST Robotics",
    ],
  },
];

const resources = [
  {
    title: "WPILib documentation",
    description: "The software library and reference used by FRC programmers.",
    href: "https://docs.wpilib.org/en/stable/index.html",
  },
  {
    title: "Robot hardware basics",
    description: "A visual introduction to the major systems found on an FRC robot.",
    href: "https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html",
  },
  {
    title: "Planetary Drive on GitHub",
    description: "Explore code from Team 2856 and see how a robot project is organized.",
    href: site.github,
  },
];

export default function Join() {
  return (
    <main id="main-content" className="join-page">
      <PageHero
        eyebrow="JOIN PLANETARY DRIVE"
        title="Join Team 2856."
        intro="Planetary Drive welcomes Fayette County high-school students interested in engineering, programming, business, or outreach. No previous robotics experience is required."
        image={pitWork}
        imageAlt="Planetary Drive students inspecting and repairing their competition robot"
        imagePosition="center 38%"
      >
        <div className="button-row join-hero-actions">
          <a
            href={site.discord}
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
          >
            Join the member Discord <ArrowRight size={18} aria-hidden="true" />
          </a>
          <Link href="/contact" className="button button-ghost">
            Ask a question
          </Link>
        </div>
      </PageHero>

      <section className="section join-overview-section" aria-labelledby="join-overview-title">
        <div className="site-shell join-overview-grid">
          <Reveal className="join-overview-copy">
            <p className="eyebrow">WHO CAN JOIN?</p>
            <h2 id="join-overview-title" className="display-heading">
              No prior robotics experience required.
            </h2>
            <p className="large-copy">
              If you are an FCPS high-school student, there is a place to start.
              Prior Java, CAD, shop, or robotics experience is welcome, but none
              is required. What matters is showing up ready to learn, ask
              questions, and contribute.
            </p>
          </Reveal>

          <Reveal className="join-fact-list" delay={100}>
            <div className="join-fact">
              <span aria-hidden="true">01</span>
              <div>
                <h3>Open to FCPS students</h3>
                <p>High-school students across Fayette County Public Schools are welcome.</p>
              </div>
            </div>
            <div className="join-fact">
              <span aria-hidden="true">02</span>
              <div>
                <h3>Learn from the beginning</h3>
                <p>Previous programming, CAD, shop, or robotics experience is not required.</p>
              </div>
            </div>
            <div className="join-fact">
              <span aria-hidden="true">03</span>
              <div>
                <h3>Build with a real team</h3>
                <p>Students work alongside one another with guidance from mentors.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section join-pathways-section" aria-labelledby="join-pathways-title">
        <div className="site-shell">
          <Reveal className="section-heading-row join-pathways-heading">
            <div>
              <p className="eyebrow">FOUR WAYS TO CONTRIBUTE</p>
              <h2 id="join-pathways-title" className="display-heading">
                Choose where you want to contribute.
              </h2>
            </div>
            <p>
              Programming, electromechanical, business, and outreach students
              work together throughout the season. Start with the work that
              interests you and learn across groups as projects overlap.
            </p>
          </Reveal>

          <div className="join-pathway-grid">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <Reveal
                  as="article"
                  className="join-pathway"
                  delay={index * 90}
                  key={pathway.title}
                >
                  <div className="join-pathway-top">
                    <span>{pathway.number}</span>
                    <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{pathway.title}</h3>
                  <p>{pathway.description}</p>
                  <ul>
                    {pathway.details.map((detail) => (
                      <li key={detail}>
                        <Check size={17} aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>

          <Reveal as="article" className="join-mentor-callout" delay={120}>
            <div className="join-mentor-icon" aria-hidden="true">
              <Users size={26} strokeWidth={1.5} />
              <ShieldCheck size={19} strokeWidth={1.5} />
            </div>
            <div>
              <p className="eyebrow">MENTOR WITH US</p>
              <h3>Mentors teach, supervise, and keep projects moving.</h3>
              <p>
                Mentors guide students through programming, design, fabrication,
                and problem-solving. They also help maintain safe workshop
                practices and support the organization that keeps a season moving.
              </p>
            </div>
            <Link href="/contact" className="text-link">
              Ask about mentoring <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="join-meetings-section" aria-labelledby="join-meetings-title">
        <div className="site-shell join-meetings-grid">
          <Reveal className="join-meetings-copy">
            <p className="eyebrow">BUILD-SEASON MEETINGS</p>
            <h2 id="join-meetings-title">Meet at Newton&apos;s Attic.</h2>
            <p>
              Most build-season meetings are held at Newton&apos;s Attic in
              Lexington. The hours below are the team&apos;s typical schedule, not a
              guarantee—plans can change as the season and robot change.
            </p>

            <a
              className="join-location-link"
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={20} aria-hidden="true" />
              <span>
                <strong>Newton&apos;s Attic</strong>
                {site.address}
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>

            <dl className="join-schedule">
              {typicalSchedule.map((meeting) => (
                <div key={meeting.days}>
                  <dt>{meeting.days}</dt>
                  <dd>{meeting.time}</dd>
                </div>
              ))}
            </dl>

            <div className="join-schedule-note">
              <BookOpen size={21} aria-hidden="true" />
              <p>
                Confirm the current meeting time in Discord before traveling.
                Members do not need to attend every minute, but regular
                participation matters—especially for competition travel.
              </p>
            </div>

            <a
              href={site.discord}
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              Check Discord <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal as="figure" className="join-workshop-photo" delay={100}>
            <Image
              src={workshop}
              alt="The wood and metal workshop at Newton's Attic where Planetary Drive often meets"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 48vw"
            />
            <figcaption>
              <span>NEWTON&apos;S ATTIC</span>
              <span>TYPICAL BUILD-SEASON WORKSPACE</span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="section join-resources-section" aria-labelledby="join-resources-title">
        <div className="site-shell">
          <Reveal className="join-resources-heading">
            <p className="eyebrow">OPTIONAL, NOT REQUIRED</p>
            <h2 id="join-resources-title" className="display-heading">
              Resources for learning before a meeting.
            </h2>
            <p>
              There is no homework for joining. If you want a preview, these are
              useful places to explore how FRC hardware and software fit together.
            </p>
          </Reveal>

          <ul className="join-resource-list">
            {resources.map((resource, index) => (
              <Reveal
                as="li"
                className="join-resource-item"
                delay={index * 70}
                key={resource.title}
              >
                <a href={resource.href} target="_blank" rel="noreferrer">
                  <span className="join-resource-number">0{index + 1}</span>
                  <span className="join-resource-copy">
                    <strong>{resource.title}</strong>
                    <span>{resource.description}</span>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="join-final-cta" aria-labelledby="join-final-title">
        <div className="site-shell join-final-cta-inner">
          <Reveal>
            <p className="eyebrow">YOUR FIRST STEP</p>
            <h2 id="join-final-title">Join the member Discord for current meeting details.</h2>
            <p>
              Use Discord for the latest meeting details, or send us a message at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <div className="button-row join-final-actions">
              <a
                href={site.discord}
                target="_blank"
                rel="noreferrer"
                className="button button-light"
              >
                Join the member Discord <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link href="/contact" className="button button-light-outline">
                Contact Team 2856
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

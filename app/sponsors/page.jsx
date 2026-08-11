import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  Bus,
  Check,
  CircuitBoard,
  FileText,
  Megaphone,
  Wrench,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SponsorGrid from "@/components/SponsorGrid";
import { site } from "@/data/site";
import pitRobot from "../../public/images/team/IMG_1720.webp";
import workshopBuild from "../../public/images/team/IMG_6122.webp";

export const metadata = {
  title: "Sponsors",
  description:
    "Support Planetary Drive Robotics, FIRST Robotics Competition Team 2856, and help Lexington students build, program, and compete with a full-size robot.",
  alternates: { canonical: "/sponsors" },
};

const supportAreas = [
  {
    number: "01",
    title: "Competition registration",
    description:
      "Registration gives the team a place to put months of engineering work on the field.",
    icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Travel and lodging",
    description:
      "Transportation and lodging help students, mentors, tools, and the robot reach competition.",
    icon: Bus,
  },
  {
    number: "03",
    title: "Raw materials",
    description:
      "Metal, sheet goods, fasteners, and fabrication stock become the structure and mechanisms of the robot.",
    icon: Box,
  },
  {
    number: "04",
    title: "Electronics and parts",
    description:
      "Motors, sensors, controllers, wiring, and standard components connect software to the machine.",
    icon: CircuitBoard,
  },
  {
    number: "05",
    title: "Tools and upgrades",
    description:
      "Reliable tools, replacement parts, and targeted improvements keep the build moving safely.",
    icon: Wrench,
  },
  {
    number: "06",
    title: "Team outreach",
    description:
      "Event materials, team apparel, and community outreach help students share what they have built.",
    icon: Megaphone,
  },
];

const inKindSupport = [
  "Raw materials and fabrication stock",
  "Robot parts, electronics, and shop supplies",
  "Tools, equipment, and useful professional services",
];

export default function Sponsors() {
  return (
    <main id="main-content" className="sponsors-page">
      <PageHero
        eyebrow="SUPPORT TEAM 2856"
        title="Support Team 2856's competition season."
        intro="Sponsor support pays for the materials, tools, registration, and travel that let students design a robot and bring it to competition."
        image={pitRobot}
        imageAlt="Planetary Drive students preparing robot 2856 in the competition pit"
        imagePosition="center 42%"
      >
        <div className="button-row sponsors-hero-actions">
          <a
            href={site.sponsorshipPacket}
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
          >
            View sponsorship packet <FileText size={18} aria-hidden="true" />
          </a>
          <Link href="/contact" className="button button-ghost">
            Start a conversation
          </Link>
        </div>
      </PageHero>

      <section className="section sponsors-case-section" aria-labelledby="sponsors-case-title">
        <div className="site-shell sponsors-case-grid">
          <Reveal className="sponsors-case-copy">
            <p className="eyebrow">WHY SPONSORSHIP MATTERS</p>
            <h2 id="sponsors-case-title" className="display-heading">
              What it takes to complete an FRC season.
            </h2>
          </Reveal>
          <Reveal className="sponsors-case-detail" delay={100}>
            <p className="large-copy">
              FIRST Robotics gives students a deadline, a difficult game, and a
              reason to put classroom skills to work. Sponsor support helps cover
              the unglamorous essentials behind that opportunity—from the stock
              on the workbench to the trip that brings the finished robot to an
              event.
            </p>
            <p>
              That support gives students room to test ideas, recover from
              mistakes, improve the machine, and learn what collaborative
              engineering feels like under real constraints.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section sponsors-needs-section" aria-labelledby="sponsors-needs-title">
        <div className="site-shell">
          <Reveal className="section-heading-row sponsors-needs-heading">
            <div>
              <p className="eyebrow">WHAT SUPPORT ENABLES</p>
              <h2 id="sponsors-needs-title" className="display-heading">
                From kickoff to competition.
              </h2>
            </div>
            <p>
              Needs change with each game, but these categories remain central
              to building a robot and giving students a complete FRC season.
            </p>
          </Reveal>

          <div className="sponsors-needs-grid">
            {supportAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Reveal
                  as="article"
                  className="sponsors-need-card"
                  delay={(index % 3) * 70}
                  key={area.title}
                >
                  <div className="sponsors-need-top">
                    <span>{area.number}</span>
                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sponsors-in-kind-section" aria-labelledby="sponsors-in-kind-title">
        <div className="site-shell sponsors-in-kind-grid">
          <Reveal as="figure" className="sponsors-in-kind-photo">
            <Image
              src={workshopBuild}
              alt="Planetary Drive students using workshop equipment to fabricate robot parts"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 48vw"
            />
            <figcaption>
              <span>STUDENT FABRICATION</span>
              <span>MATERIALS BECOME MECHANISMS</span>
            </figcaption>
          </Reveal>

          <Reveal className="sponsors-in-kind-copy" delay={100}>
            <p className="eyebrow">MORE THAN A CHECK</p>
            <h2 id="sponsors-in-kind-title">Materials, equipment, and professional services help too.</h2>
            <p>
              Financial contributions are valuable, but organizations can also
              help by providing materials, parts, supplies, tools, equipment, or
              useful services. If you have something that may fit the team&apos;s
              current needs, the best first step is to ask.
            </p>
            <ul>
              {inKindSupport.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="button button-light">
              Discuss an in-kind contribution
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section sponsors-grid-section" aria-labelledby="sponsors-grid-title">
        <div className="site-shell">
          <Reveal className="section-heading-row sponsors-grid-heading">
            <div>
              <p className="eyebrow">OUR SUPPORTERS</p>
              <h2 id="sponsors-grid-title" className="display-heading">
                Organizations supporting Team 2856.
              </h2>
            </div>
            <p>
              These organizations help Planetary Drive give students meaningful
              access to engineering, programming, fabrication, and competition.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <SponsorGrid />
          </Reveal>
        </div>
      </section>

      <section className="sponsors-final-cta" aria-labelledby="sponsors-final-title">
        <div className="site-shell sponsors-final-cta-inner">
          <Reveal>
            <p className="eyebrow">BUILD THE NEXT SEASON WITH US</p>
            <h2 id="sponsors-final-title">Help fund the next competition season.</h2>
            <p>
              Review the sponsorship packet, or contact Planetary Drive directly
              at <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <div className="button-row sponsors-final-actions">
              <a
                href={site.sponsorshipPacket}
                target="_blank"
                rel="noreferrer"
                className="button button-light"
              >
                Open sponsorship packet
                <ArrowUpRight size={17} aria-hidden="true" />
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

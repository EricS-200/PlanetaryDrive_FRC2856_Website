import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import workshop from "../../public/team_pics/workshop1.jpg";
import teamWork from "../../public/images/team/IMG_5150.webp";

export const metadata = {
  title: "Contact",
  description:
    "Contact Planetary Drive Robotics about joining FRC Team 2856, mentoring, sponsorship, or the team's work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <section className="contact-hero">
        <div className="site-shell contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="eyebrow">CONTACT TEAM 2856</p>
            <h1>Let’s talk about the team.</h1>
            <p>
              Joining, mentoring, sponsoring, visiting, or just curious about the
              robot? Send us a note and it will reach Planetary Drive directly.
            </p>
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email} <ArrowRight size={17} />
            </a>
          </div>
          <figure className="contact-hero-media">
            <Image
              src={workshop}
              alt="The workshop at Newton's Attic where Planetary Drive meets"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <figcaption>NEWTON&apos;S ATTIC · LEXINGTON, KY</figcaption>
          </figure>
        </div>
      </section>

      <section className="section contact-main-section">
        <div className="site-shell contact-main-grid">
          <Reveal className="contact-form-wrap">
            <ContactForm />
          </Reveal>
          <Reveal className="contact-details" delay={100}>
            <p className="eyebrow">OTHER WAYS IN</p>
            <h2>Choose the shortest path.</h2>
            <div className="contact-detail-row">
              <Mail size={21} aria-hidden="true" />
              <div>
                <span>Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
            <div className="contact-detail-row">
              <MessageCircle size={21} aria-hidden="true" />
              <div>
                <span>Students joining the team</span>
                <a href={site.discord} target="_blank" rel="noreferrer">Member Discord</a>
              </div>
            </div>
            <div className="contact-detail-row">
              <MapPin size={21} aria-hidden="true" />
              <div>
                <span>Meeting location</span>
                <a href={site.mapUrl} target="_blank" rel="noreferrer">{site.address}</a>
              </div>
            </div>
            <div className="contact-social-row">
              <a href={site.instagram} target="_blank" rel="noreferrer">
                <Instagram size={19} /> Instagram
              </a>
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github size={19} /> GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact-routing-section">
        <div className="site-shell contact-routing-grid">
          <Reveal className="contact-routing-media">
            <Image
              src={teamWork}
              alt="Planetary Drive students working together around their competition robot"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 46vw"
            />
          </Reveal>
          <Reveal className="contact-routing-copy" delay={100}>
            <p className="eyebrow">LOOKING FOR A SPECIFIC NEXT STEP?</p>
            <h2>We made those easy to find.</h2>
            <Link href="/join" className="routing-link">
              <span>01</span>
              <div>
                <strong>Join or mentor</strong>
                <p>Eligibility, team roles, meetings, and how to begin.</p>
              </div>
              <ArrowRight size={20} />
            </Link>
            <Link href="/sponsors" className="routing-link">
              <span>02</span>
              <div>
                <strong>Sponsor the team</strong>
                <p>What support enables and how to start a conversation.</p>
              </div>
              <ArrowRight size={20} />
            </Link>
            <Link href="/engineering" className="routing-link">
              <span>03</span>
              <div>
                <strong>Explore the robot</strong>
                <p>2026 CAD, engineering disciplines, and team code.</p>
              </div>
              <ArrowRight size={20} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

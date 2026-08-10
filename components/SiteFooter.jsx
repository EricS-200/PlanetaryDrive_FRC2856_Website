import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Mail, MapPin } from "lucide-react";
import { navigation, site } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-orbit" aria-hidden="true" />
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="Planetary Drive home">
            <Image
              src="/white_wordmark.svg"
              alt="Planetary Drive"
              width={843}
              height={241}
            />
          </Link>
          <p>
            A student-led FIRST Robotics Competition team designing, building,
            and programming robots in Lexington, Kentucky.
          </p>
          <span className="technical-label">TEAM 2856 · EST. 2009</span>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-column footer-contact">
          <h2>Find us</h2>
          <a href={`mailto:${site.email}`}>
            <Mail size={17} aria-hidden="true" />
            <span>{site.email}</span>
          </a>
          <a href={site.mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={17} aria-hidden="true" />
            <span>{site.address}</span>
          </a>
          <div className="social-links" aria-label="Social links">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={19} />
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={19} />
            </a>
            <a href={site.first} target="_blank" rel="noreferrer" aria-label="FIRST Robotics">
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </div>

      <div className="site-shell footer-bottom">
        <p>© {new Date().getFullYear()} Team Planetary Drive. All rights reserved.</p>
        <p>FIRST Robotics Competition Team 2856</p>
      </div>
    </footer>
  );
}

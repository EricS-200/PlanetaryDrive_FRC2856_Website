"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="header-shell">
        <Link
          href="/"
          className="brand-link"
          aria-label="Planetary Drive home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/white_wordmark.svg"
            alt="Planetary Drive"
            width={843}
            height={241}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <span className="team-id" aria-hidden="true">
            FRC / 2856
          </span>
          <Link className="button button-small button-ghost desktop-contact" href="/contact">
            Contact
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="mobile-nav-inner">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              tabIndex={open ? 0 : -1}
              style={{ "--nav-index": index }}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mobile-contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Contact the team
          </Link>
        </div>
      </nav>
    </header>
  );
}

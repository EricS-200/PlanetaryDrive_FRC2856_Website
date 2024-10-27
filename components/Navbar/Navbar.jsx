"use client";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const pages = [
  {
    name: "Home",
    page: "/",
  },
  {
    name: "About Us",
    page: "/about",
  },
  {
    name: "Contact",
    page: "/contact",
  },
  {
    name: "Join",
    page: "/join",
  },
  {
    name: "Sponsors",
    page: "/sponsors",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky inset-0 z-[100]">
      <DesktopNavbar pages={pages} />
      <MobileNavbar pages={pages} />
    </nav>
  );
}

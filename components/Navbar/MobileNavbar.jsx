"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import logo from "/public/white_wordmark.svg";
import hamburger from "/public/navbar/hamburger-menu.svg";
import close from "/public/navbar/close.svg";

// Add context to lock scroll while sidenav open

export default function MobileNavbar({ pages }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // doesn't really work currently
  function stagger(index) {
    const delay = (index + 1) * 200;
    const styles = `  `;
    if (isOpen) {
      return styles + "translate-x-0  ";
    } else {
      return styles + "-translate-x-[64px]  ";
    }
  }

  function isActive(url) {
    if (pathname === url) {
      return "text-white";
    }
    return "text-neutral-300 transition duration-100 hover:text-neutral-100";
  }

  function openNav() {
    if (!isOpen) {
      return "-translate-x-full transition-transform duration-500";
    }
    return "translate-x-0 transiton-transform duration-500";
  }
  return (
    <>
      {/*Static Navbar at the top of the page*/}
      <div className="relative w-full h-16 border-b border-neutral-800 bg-black md:hidden flex items-center justify-center z-50">
        <button
          className="absolute left-8"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src={hamburger}
            alt="Hamburger Menu - Side Navigation Bar Opening Button"
            className="w-[50px] h-[50px] outline-white"
          />
        </button>
        <button>
          <Link href="/">
            <Image
              src={logo}
              className="h-[50px] w-[150px]"
              alt="Logo - Home"
            />
          </Link>
        </button>
      </div>

      {/*Navbar that opens from the side*/}
      <div
        className={`${openNav()} inset-0 absolute h-[100vh] min-w-[200px] w-[70vw] max-w-[300px] bg-zinc-950 z-[150] border-r border-zinc-700`}
      >
        <div className="w-full h-16 mb-1 flex items-center relative">
          <button className="ml-8 text-xl font-bold ">Planetary Drive</button>
          <button
            className="absolute right-5"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Image
              src={close}
              alt="Close Side Navigation Bar"
              className="h-[30px] w-[30px]"
            />
          </button>
        </div>
        <ul className="flex flex-col justify-start ml-16 space-y-3">
          {pages.map(({ name, page }, index) => (
            <button
              key={name}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`${isActive(page)} ${stagger(
                index
              )} w-fit inline-block text-lg transiton-transform duration-500`}
            >
              <Link href={page}>{name}</Link>
            </button>
          ))}
        </ul>
      </div>

      {/*Background overlay*/}
      <button
        className={`${
          isOpen ? "block" : "hidden"
        } w-[100vw] h-[100vh] inset-0 bg-black/60 z-[100] pointer-events-auto fixed`}
        onClick={() => setIsOpen((prev) => !prev)}
      ></button>
    </>
  );
}

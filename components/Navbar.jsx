"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname(); // checks which page you are on
  const [mNav, setMNav] = useState(false); // whether the dropdown menu under "more" is open or not (big screens)
  const [mNavDropdown, setMNavDropdown] = useState(false); // whether the dropdown menu under more is open or not (small screens)

  // all pages on the navbar
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
      name: "Members",
      page: "/members",
    },
    {
      name: "Sponsors",
      page: "/sponsors",
    },
  ];

  const otherPages = ["/join", "/gallery", "/robots", "/frc"];

  // Checks which page you are on, and highlights it in the navbar.
  function isActive(url) {
    if (pathname === url) {
      return "text-white";
    }
    return "text-neutral-300 transition duration-100 hover:text-neutral-100";
  }

  // animates navbar from the side for small screens
  function openNav() {
    if (!mNav) {
      return "-translate-x-full transition-transform duration-500";
    }
    return "translate-x-0 transiton-transform duration-500";
  }

  // animates dropdown menu for small screens under "more"
  function openMNavDropdown() {
    if (!mNavDropdown) {
      return "-translate-y-full transition duration-500 pointer-events-none";
    }
    return "translate-y-0 transition  duration-500 pointer-events-auto";
  }

  return (
    <div className={`${mNav ? "" : "sticky top-0"} z-50`}>
      <div
        className={`${openNav()} z-10 absolute h-full bg-neutral-700 left-0 flex flex-col items-center w-full`}
      >
        <Image
          onClick={() => setMNav((prev) => !prev)}
          src="/menu-close.png"
          height={35}
          width={35}
          className="cursor-pointer absolute top-3 right-2"
        />
        <h2 className="m-4 text-2xl font-semibold">Planetary Drive</h2>
        {pages.map((link) => (
          <Link
            className={`${isActive(link.page)} m-2 text-xl`}
            key={link.name}
            href={link.page}
            onClick={() => {
              setMNav((prev) => !prev);
              setMNavDropdown(() => false);
            }}
          >
            {link.name}
          </Link>
        ))}
        <div className="relative w-full flex justify-center">
          <p
            onClick={() => setMNavDropdown((prev) => !prev)}
            className={`select-none m-2 text-xl transition duration-100 hover:text-neutral-100 cursor-pointer relative pr-4 ${
              otherPages.includes(pathname) ? "text-white" : "text-neutral-300"
            }`}
          >
            More
            <span>
              <Image
                src="/dropdown.png"
                className={`absolute top-1/4 transition-all duration-500 ${
                  mNavDropdown ? "-rotate-180" : "rotate-0"
                }`}
                height={20}
                width={20}
              />
            </span>
          </p>

          <div className={`absolute top-10 overflow-hidden`}>
            <ul className={`flex flex-col items-center ${openMNavDropdown()}`}>
              <li
                onClick={() => {
                  setMNav((prev) => !prev);
                  setMNavDropdown((prev) => !prev);
                }}
                className="py-2 text-xl text-neutral-400 transition duration-100 hover:text-neutral-100"
              >
                <Link href="/join">Join</Link>
              </li>
              <li
                onClick={() => {
                  setMNav((prev) => !prev);
                  setMNavDropdown((prev) => !prev);
                }}
                className="py-2 text-xl text-neutral-400 transition duration-100 hover:text-neutral-200"
              >
                <Link href="/gallery">Photos</Link>
              </li>
              <li
                onClick={() => {
                  setMNav((prev) => !prev);
                  setMNavDropdown((prev) => !prev);
                }}
                className="py-2 text-xl text-neutral-400 transition duration-100 hover:text-neutral-200"
              >
                <Link href="/robots">Our Robots</Link>
              </li>
              <li
                onClick={() => {
                  setMNav((prev) => !prev);
                  setMNavDropdown((prev) => !prev);
                }}
                className="pt-2 text-xl text-neutral-400 transition duration-100 hover:text-neutral-200"
              >
                <Link href="/frc">FRC Info</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ABOVE WAS CODE FOR SIDE NAV BAR FOR SMALL SCREENS
       * BELOW IS CODE FOR MAIN NAV BAR*/}

      <div className="w-full bg-slate-950 h-16 flex justify-center items-center relative mb-0 p-0">
        <Image
          onClick={() => setMNav((prev) => !prev)}
          src="/menu-icon.png"
          height={35}
          width={35}
          className="left-5 absolute md:hidden cursor-pointer"
        />
        <Link href="/" className="absolute md:left-[8%] lg:left-[10%]">
          <div className="flex md:items-center ">
            <Image src="/logo.png" height={50} width={50}></Image>
            <h1 className="m-4 font-semibold text-2xl xl:block hidden">
              Planetary Drive
            </h1>
          </div>
        </Link>

        {pages.map((link) => (
          <Link
            className={`${isActive(link.page)} pl-8 md:block hidden`}
            key={link.name}
            href={link.page}
          >
            {link.name}
          </Link>
        ))}

        <div className={`${isActive()} group relative pl-8 cursor-default`}>
          <p
            className={`select-none md:block md:pointer-events-auto hidden pointer-events-none ${
              otherPages.includes(pathname) && "text-white"
            }`}
          >
            More{" "}
            <span>
              <Image
                src="/dropdown.png"
                className="absolute top-[15%] transition duration-500 group-hover:-rotate-180"
                height={20}
                width={20}
              />
            </span>
          </p>
          <div className="pointer-events-none	group-hover:pointer-events-auto	overflow-hidden absolute left-5 top-full">
            <div className="opacity-0 bg-neutral-700 w-44 p-4 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 group-hover:opacity-100">
              <ul>
                <li className="py-2 text-neutral-300 transition duration-100 hover:text-neutral-100">
                  <Link href="/join">Join</Link>
                </li>
                <li className="py-2 text-neutral-300 transition duration-100 hover:text-neutral-100">
                  <Link href="/gallery">Photos</Link>
                </li>
                <li className="py-2 text-neutral-300 transition duration-100 hover:text-neutral-100">
                  <Link href="/robots">Robots</Link>
                </li>
                <li className="pt-2 text-neutral-300 transition duration-100 hover:text-neutral-100">
                  <Link href="/frc">FRC</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

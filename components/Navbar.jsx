"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const pages = [
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

export const otherPages = [
  {
    name: "Join",
    page: "/join",
  },
  {
    name: "Photos",
    page: "/gallery",
  },
  {
    name: "Robots",
    page: "/robots",
  },
  {
    name: "FRC",
    page: "/frc",
  },
];

export default function Navbar() {
  const pathname = usePathname(); // checks which page you are on
  const [mNav, setMNav] = useState(false); // whether the dropdown menu under "more" is open or not (big screens)
  const [mNavDropdown, setMNavDropdown] = useState(false); // whether the dropdown menu under more is open or not (small screens)

  // all pages on the navbar

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
    <nav className={`${mNav ? "" : "sticky top-0"} z-50`}>
      <div
        className={`${openNav()} z-10 h-full fixed bg-slate-950 left-0 flex flex-col items-center w-full`}
      >
        <svg
          onClick={() => setMNav((prev) => !prev)}
          className="cursor-pointer absolute top-3 right-2 fill-gray-300 stroke-gray-300"
          width="35px"
          height="35px"
          viewBox="-0.5 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21.32L21 3.32001"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 3.32001L21 21.32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
              otherPages.map((item) => item.page).includes(pathname)
                ? "text-white"
                : "text-neutral-300"
            }`}
          >
            More
            <span>
              <svg
                className={`fill-slate-300 stroke-slate-300 absolute top-1/4 transition-all duration-500 ${
                  mNavDropdown ? "-rotate-180" : "rotate-0"
                }`}
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                />
              </svg>
            </span>
          </p>

          <div className={`absolute top-10 overflow-hidden`}>
            <ul className={`flex flex-col items-center ${openMNavDropdown()}`}>
              {otherPages.map((link) => (
                <li
                  key={link.name}
                  onClick={() => {
                    setMNav((prev) => !prev);
                    setMNavDropdown((prev) => !prev);
                  }}
                  className="pt-2 text-xl text-neutral-400 transition duration-100 hover:text-neutral-200"
                >
                  <Link href={link.page} key={link.name}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ABOVE WAS CODE FOR SIDE NAV BAR FOR SMALL SCREENS
       * BELOW IS CODE FOR MAIN NAV BAR*/}

      <div className="w-full bg-slate-950 h-16 flex justify-center items-center relative mb-0 p-0 border-b-[1px] border-slate-700">
        <svg
          onClick={() => setMNav((prev) => !prev)}
          className="left-5 absolute md:hidden cursor-pointer fill-gray-300 stroke-gray-300"
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7ZM5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12ZM5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18H6C5.44772 18 5 17.5523 5 17Z"
          />
        </svg>
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
              otherPages.map((item) => item.page).includes(pathname)
                ? "text-white"
                : "text-neutral-300"
            }`}
          >
            More{" "}
            <span>
              <svg
                className={`absolute top-[15%] transition duration-500 group-hover:-rotate-180 fill-neutral-300 stroke-neutral-300 hover:fill-neutral-100 hover:stroke-neutral-300 ${
                  otherPages.map((item) => item.page).includes(pathname) &&
                  "text-white"
                }`}
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                />
              </svg>
            </span>
          </p>
          <div className="pointer-events-none	group-hover:pointer-events-auto	overflow-hidden absolute left-5 top-full">
            <div className="opacity-0 bg-slate-950 w-44 p-4 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 group-hover:opacity-100">
              <ul>
                {otherPages.map((link) => (
                  <li
                    key={link.name}
                    className="py-2 text-neutral-300 transition duration-100 hover:text-neutral-100"
                  >
                    <Link key={link.name} href={link.page}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

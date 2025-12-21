"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function DesktopNavbar({ pages }) {
  const pathname = usePathname();

  function isActive(url) {
    if (pathname === url) {
      return "text-white";
    }
    return "text-neutral-300 transition duration-100 hover:text-neutral-100";
  }

  return (
    <div className="w-full bg-black h-16 justify-center items-center relative mb-0 p-0 border-b border-neutral-800 hidden md:flex">
      <Link href="/" className="absolute md:left-[8%] lg:left-[10%]">
        <div className="flex md:items-center ">
          <Image
            alt="Team Logo - Return To Home"
            src="/white_wordmark.svg"
            height={60}
            width={140}
          ></Image>
          {/* <h1 className="m-4 font-semibold text-2xl xl:block hidden">
            Planetary Drive
          </h1> */}
        </div>
      </Link>

      {pages.map((link) => (
        <Link
          className={`${isActive(link.page)} px-4 md:block hidden`}
          key={link.name}
          href={link.page}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

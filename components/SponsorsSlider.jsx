"use client";

import Link from "next/link";
import Image from "next/image";

import batesSecurityLogo from "/public/sponsors/white-version/bates-security-logo.svg";
import schneiderElectricLogo from "/public/sponsors/white-version/schneider-electric-logo.svg";
import newtonsAtticLogo from "/public/sponsors/white-version/newton's-attic-logo.svg";
import ukEngineeringLogo from "/public/sponsors/white-version/uk-engineering-logo.svg";

import testImg from "/public/placeholder/female-profile-placeholder.jpg";

// helper
const logos = [
  batesSecurityLogo,
  schneiderElectricLogo,
  newtonsAtticLogo,
  ukEngineeringLogo,
];

export default function SponsorsSlider() {
  return (
    <div className="overflow-hidden py-8 bg-gray-900 whitespace-nowrap w-1/3">
      <div className=" space-x-16 inline-block animate-slide-left">
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block self-center"
        >
          <div className="w-28">
            <img src="/sponsors/white-version/bates-security-logo.svg" alt="" />
          </div>
        </Link>
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28 ">
            <img
              src="/sponsors/white-version/schneider-electric-logo.svg"
              alt=""
            />
          </div>
        </Link>
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28  ">
            <img src="/sponsors/white-version/newton's-attic-logo.svg" alt="" />
          </div>
        </Link>
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28 ">
            <img src="/sponsors/white-version/uk-engineering-logo.svg" alt="" />
          </div>
        </Link>
        <div className="inline-block">
          <p>
            <i className="font-serif text-4xl text-center ">
              Baines Builders Products
            </i>
          </p>
        </div>
      </div>

      <div className=" space-x-16 inline-block animate-slide-left">
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28">
            <img src="/sponsors/white-version/bates-security-logo.svg" alt="" />
          </div>
        </Link>
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28">
            <img
              src="/sponsors/white-version/schneider-electric-logo.svg"
              alt=""
            />
          </div>
        </Link>
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28">
            <img src="/sponsors/white-version/newton's-attic-logo.svg" alt="" />
          </div>
        </Link>
        <Link
          href="https://google.com"
          target="_blank"
          className="inline-block"
        >
          <div className="w-28">
            <img src="/sponsors/white-version/uk-engineering-logo.svg" alt="" />
          </div>
        </Link>
        <div className="inline-block">
          <p>
            <i className="font-serif text-4xl text-center ">
              Baines Builders Products
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

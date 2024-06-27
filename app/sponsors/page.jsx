"use client";

import Link from "next/link";
import ParallaxBanner from "@/components/ParallaxBanner";

import mainBanner from "/public/sponsors/sponsors-banner2.png";
import { useRef } from "react";
import SponsorLogos from "@/components/SponsorLogos";

export default function Sponsors() {
  const sponsorLogos = useRef(null);
  const scrollToLogos = () =>
    sponsorLogos.current.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="flex flex-col items-center w-full">
      <ParallaxBanner src={mainBanner} className="h-[65vh]" speed={0.5} />
      <section className="from-96% md:from-90% bg-gradient-to-b from-zinc-950 to-black flex flex-col items-center pt-6 pb-10 min-h-[50vh] w-full relative">
        <div className="absolute w-full h-[150px] top-0 bg-gradient-to-t from-zinc-950 -translate-y-[99%]"></div>

        <div className="space-y-5 w-[90vw] lg:w-2/3 2xl:w-1/2 flex flex-col ">
          <h1 className="text-white text-center sm:text-8xl text-6xl">
            Our Sponsors
          </h1>
          <h3 className="text-slate-300 text-center">
            Sponsorships are what keep this team afloat!
          </h3>
          <p className="text-lg text-center">
            Participating in the yearly <i>FIRST Robotics Competition</i> is
            extremely rewarding, and offers extraordinary opportunities for
            everyone on our team, but it is also expensive! Each year, we have
            to build a robot meeting the specifications of that year&apos;s
            event, which by itself can cost thousands of dollars. Going to the
            competition itself is also expensive as we have to obtain
            transportation and book hotel rooms for our entire team.
          </p>
          <p className="text-lg text-center">
            Our sponsors make all of this possible! Our sponsors play a crucial
            role in enabling our team&apos;s success, and we deeply appreciate
            their support. If you are interested in sponsoring us, or helping
            out in any way, please feel free to{" "}
            <Link
              href="/contact"
              className="hover:underline underline-offset-2"
            >
              <strong>contact us</strong>
            </Link>
            !
          </p>
          <button onClick={scrollToLogos}>
            <p className="text-xl text-center flex items-center justify-center">
              Make sure to check out our sponsors below!
              <span className="ml-2">
                <img
                  src="/down-arrow.svg"
                  width={20}
                  className="fill-white stroke-white text-white"
                />
              </span>
            </p>
          </button>
        </div>
      </section>
      <section
        ref={sponsorLogos}
        className="bg-black w-full flex justify-center"
      >
        <div className="2xl:w-1/2 xl:w-2/3 lg:w-3/4 md:w-3/4 w-[85%] flex flex-col items-center mt-12 md:mt-0">
          <SponsorLogos />
        </div>
      </section>
    </main>
  );
}

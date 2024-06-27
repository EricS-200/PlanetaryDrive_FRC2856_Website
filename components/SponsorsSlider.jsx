import Link from "next/link";
import Image from "next/image";

import batesSecurityLogo from "/public/sponsors/white-version/bates-security-logo.svg";
import schneiderElectricLogo from "/public/sponsors/white-version/schneider-electric-logo.svg";
import newtonsAtticLogo from "/public/sponsors/white-version/newton's-attic-logo.svg";
import ukEngineeringLogo from "/public/sponsors/white-version/uk-engineering-logo.svg";

// this list of sponsors is different from the one in SponsorLogos.jsx as it uses white colored logos instead of the colored ones.
const sponsors = [
  {
    name: "Schneider Electric",
    image: schneiderElectricLogo,
    website: "https://www.se.com/us/en/",
  },
  {
    name: "University of Kentucky - College of Engineering",
    image: ukEngineeringLogo,
    website: "https://www.engr.uky.edu/",
  },
  {
    name: "Newton's Attic",
    image: newtonsAtticLogo,
    website: "https://newtonsattic.com/",
  },

  {
    name: "Bates Security",
    image: batesSecurityLogo,
    website: "https://batessecurity.com/",
  },

  { name: "Baines Builders Products", image: undefined, website: undefined },
];

export default function SponsorsSlider() {
  function displayLogos(sponsor) {
    if (sponsor.image === undefined || sponsor.website === undefined) {
      if (sponsor.website === undefined) {
        return (
          <div className="inline-block">
            <p>
              <i className="font-serif text-4xl text-center ">{sponsor.name}</i>
            </p>
          </div>
        );
      }
      return (
        <Link
          href={sponsor.website}
          target="_blank"
          className="inline-block self-center"
        >
          <p>
            <i className="font-serif text-4xl text-center ">{sponsor.name}</i>
          </p>
        </Link>
      );
    }

    return (
      <Link
        href={sponsor.website}
        target="_blank"
        className="inline-block self-center"
        key={sponsor.name}
      >
        <div className="w-28">
          <Image src={sponsor.image} alt={sponsor.name} priority={true}/>
        </div>
      </Link>
    );
  }

  return (
    <section className="w-full flex justify-center">
      <div className="overflow-hidden py-8 whitespace-nowrap w-[95vw] xl:w-[1200px] relative">
        <div className="absolute h-full w-[15%] inset-0 bg-gradient-to-r from-black z-50 "></div>
        <div className="inline-block animate-slide-left">
          <div className="flex items-center space-x-20 mx-10">
            {sponsors.map((sponsor) => displayLogos(sponsor))}
          </div>
        </div>

        <div className="inline-block animate-slide-left">
          <div className="flex items-center mx-10 space-x-20">
            {sponsors.map((sponsor) => displayLogos(sponsor))}
          </div>
        </div>
        <div className="h-full w-[15%] absolute top-0 right-0 bg-gradient-to-l from-black z-50"></div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
// below are static import. they allow the use of nextjs Image without having to provide width/height.
import batesSecurityLogo from "/public/sponsors/bates-security-logo.svg";
import schneiderElectricLogo from "/public/sponsors/schneider-electric-logo.png";
import newtonsAtticLogo from "/public/sponsors/newton's-attic-logo.png";
import ukEngineeringLogo from "/public/sponsors/uk-engineering-logo.png";

export default function SponsorLogos() {
  // to add/remove sponsors, simply add an object to the array. if no website/image logo, set to "undefined".
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

  function showSponsor({ name, image, website }) {
    if (image === undefined)
      return (
        <h2 key={name} className="font-bold text-6xl text-center">
          <i>{name}</i>
        </h2>
      );
    if (website === undefined) return <Image src={image} alt={name}></Image>;
    return (
      <Link href={website} key={name} target="_blank">
        <Image src={image} alt={name}></Image>
      </Link>
    );
  }
  return (
    <>
      <div className="flex justify-center items-center md:space-x-32 space-y-24 flex-col md:flex-row">
        <div className="w-[80%] md:w-1/2 flex flex-col items-center justify-center space-y-24">
          {sponsors
            .slice(0, Math.floor((sponsors.length - 1) / 2))
            .map(showSponsor)}
        </div>
        <div className="w-[80%] md:w-1/2 flex flex-col items-center justify-center space-y-24">
          {sponsors
            .slice(
              Math.floor((sponsors.length - 1) / 2),
              sponsors.length % 2 === 0 ? sponsors.length : sponsors.length - 1
            )
            .map(showSponsor)}
        </div>
      </div>
      <div
        className={`${
          sponsors.length % 2 === 0 ? "hidden" : "block"
        } mt-24 mb-12`}
      >
        {showSponsor(sponsors[sponsors.length - 1])}
      </div>
    </>
  );
}

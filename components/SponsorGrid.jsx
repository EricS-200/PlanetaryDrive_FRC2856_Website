import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { sponsors } from "@/data/site";

export default function SponsorGrid({ compact = false }) {
  const visibleSponsors = compact ? sponsors.slice(0, 4) : sponsors;

  return (
    <div className={`sponsor-grid ${compact ? "sponsor-grid-compact" : ""}`}>
      {visibleSponsors.map((sponsor, index) => (
        <a
          href={sponsor.website}
          target="_blank"
          rel="noreferrer"
          className="sponsor-tile"
          key={sponsor.name}
        >
          <span className="sponsor-number">0{index + 1}</span>
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            fill
            sizes={compact ? "(max-width: 700px) 50vw, 20vw" : "(max-width: 700px) 50vw, 25vw"}
          />
          <span className="sponsor-name">
            {sponsor.name}
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </a>
      ))}
    </div>
  );
}

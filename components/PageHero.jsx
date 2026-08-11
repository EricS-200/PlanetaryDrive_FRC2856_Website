import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  imagePosition = "center",
  children,
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-intro">{intro}</p>
        {children}
      </div>
      <figure className="page-hero-media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 800px) 100vw, 52vw"
          style={{ objectPosition: imagePosition }}
        />
        <div className="page-hero-index" aria-hidden="true">
          <span>PD / 2856</span>
          <span>LEX · KY</span>
        </div>
      </figure>
    </section>
  );
}

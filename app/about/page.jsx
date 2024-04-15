import ParallaxBanner from "@/components/ParallaxBanner";
import engineeringImage from "/public/about-us/engineering-image.jpg";

export default function AboutUs() {
  return (
    <main className=" h-full w-full">
      <ParallaxBanner
        src={engineeringImage}
        className="h-[43vh]"
        imgClassName={"object-top"}
        speed={0.5}
      ></ParallaxBanner>
      <article className="bg-black relative">
        <div className="absolute w-full -translate-y-full h-1/3 top-0 bg-gradient-to-t from-black"></div>
        <section className="w-full flex flex-col items-center">
          <h1 className="text-center mt-4 sm:text-8xl text-6xl">About Us</h1>
          <h4 className="text-center">Team Planetary Drive - FRC #2856</h4>
          <p className="text-center text-lg leading-loose mt-1 w-1/3">
            Founded in 2009, we are a high school robotics team based in
            Lexington, Kentucky, that competes in the annual First Robotics
            Competition event. We are composed of extremely intelligent and hard
            working high school students who aspire to become amazing engineers
            and innovators in the future. Each year, our team of students driven
            by their love for STEM and guided by our experienced and dedicated
            mentor, work extremely hard each year to design, build, assemble,
            and program a fully functional and well-made robot to compete in the
            FIRST Rototics Competition.
          </p>
          {/* <p className="text-center text-lg leading-loose w-1/3 my-2">
            Each year, our small team pushes the boundries of what they can
            achieve by working extremely hard and learning from past mistakes
            while aquirering new skills. We all gain invaluable experience and
            skills through the work we do at robotics that will serve us in our
            future lives and careers.
          </p> */}
        </section>
        <section className="w-full flex flex-col items-center">
          <h3 className="text-center">Our Mission</h3>
          <p className="text-center text-lg leading-loose mt-1 w-1/3"></p>
        </section>
      </article>
    </main>
  );
}

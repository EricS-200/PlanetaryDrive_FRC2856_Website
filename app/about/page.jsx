import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ParallaxBanner from "@/components/ParallaxBanner";
import engineeringImage from "/public/about-us/engineering-image.jpg";
import teamworkImage from "/public/about-us/robot-work.jpg";
import teamworkImage2 from "/public/about-us/robot-work2.jpg";
import SponsorsSlider from "@/components/SponsorsSlider";
import Members from "/app/members/page.jsx";

export default function AboutUs() {
  return (
    <main className="h-full w-full flex flex-col items-center">
      <ParallaxBanner
        src={engineeringImage}
        className="h-[43vh] relative"
        imgClassName={"object-top"}
        speed={0.5}
      >
        <div className="absolute w-full h-[43vh] bg-black/40 flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mt-4 sm:text-8xl text-6xl text-white text-center">
              About Us
            </h1>
            <h3 className=" mt-4 text-white text-center px-4">
              Shaping the engineers of the future!
            </h3>
          </div>
        </div>
      </ParallaxBanner>
      <article className="w-full bg-black relative flex flex-col items-center ">
        <div className="absolute w-full h-[150px] top-0 bg-gradient-to-t from-black -translate-y-full "></div>

        <section className="flex flex-col items-center justify-center mt-7">
          <h2 className="text-center text-5xl">Who We Are</h2>
          <p className="text-center text-lg leading-loose w-[90vw] sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 my-2">
            Founded in 2009, we are a high school robotics team based in
            Lexington, Kentucky. We compete in the annual First Robotics
            Competition event. We are composed of extremely dedicated and hard
            working high school students who aspire to become amazing engineers
            and innovators in the future. Each year, our team of students driven
            by their love for STEM and guided by our experienced and dedicated
            mentor, work extremely hard to design, build, assemble, and program
            a fully functional robot to compete in the FIRST Rototics
            Competition.
          </p>
        </section>

        <section className="flex justify-center items-center space-y-8 pt-12 pb-6 flex-col lg:space-y-0 lg:space-x-5 xl:space-x-10 lg:flex-row">
          <div className="w-[85vw] sm:w-[500px] lg:w-[450px] xl:w-[500px]">
            <Image
              src={teamworkImage}
              alt="Team working on robot"
              placeholder="blur"
              className=" rounded-md"
            ></Image>
          </div>

          <div className="w-[85vw] sm:w-[450px] xl:w-[500px]">
            <h3 className="text-center">Our Mission</h3>
            <p className="text-center text-lg leading-loose mt-1 ">
              Our mission as a high school robotics team is to provide all of
              our members with the opportunity to learn and apply new skills
              while having fun through the <i>FIRST</i> Robotics competition. We
              want to inspire innovation and a love for robotics as well as
              STEM. We strive to empower our members to become excellent
              innovators and leaders who will make a positive impact on the
              world by promoting critical thinking, collaboration, creativity,
              and perseverance.
            </p>
          </div>
        </section>
        <section className="flex justify-center items-center space-y-8 pt-12 pb-6 flex-col lg:space-y-0 lg:flex-row">
          <div className="w-[85vw] sm:w-[500px] lg:w-[450px] xl:w-[500px] lg:order-last">
            <Image
              src={teamworkImage2}
              alt="Team working on robot"
              placeholder="blur"
              className=" rounded-md"
            ></Image>
          </div>

          <div className="w-[85vw] sm:w-[450px] xl:w-[500px] lg:mr-5 xl:mr-10">
            <h3 className="text-center">Our Values</h3>
            <ul className="list-disc space-y-4">
              <li className=" text-lg leading-loose mt-1 ">
                Teamwork: Collaboration is key to succeed in robotics and
                beyond. We want to create an environment with diverse
                perspectives and where everyone&apos;s voice can be heard.
              </li>
              <li className=" text-lg leading-loose mt-1 ">
                Dedication: Overcoming obstacles and not giving up can be a
                great way to grow and develop new skills or qualities.
              </li>
              <li className=" text-lg leading-loose mt-1 ">
                Innovation: Thinking outside the box is crucial for engineers.
                Creativity and innovation can lead to great accomplishments!
              </li>
              <li className="text-lg leading-loose mt-1 ">
                Fun: We strive to create an environment that is not only
                educational but also fun and positive, making work much more
                enjoyable!
              </li>
            </ul>
          </div>
        </section>
      </article>
      <h2 className="text-3xl font-semibold mt-5 text-center">
        Sponsors allow us to continue building robots!
      </h2>
      <SponsorsSlider />
      <Link href="/sponsors">
        <Button variant="outline" className="dark m-6 text-xl" size="lg">
          Learn More
        </Button>
      </Link>
      <div className="border-t-[1px] w-[80%] my-8 border-slate-700 bg-black"></div>
      <Members banner={false}></Members>
    </main>
  );
}

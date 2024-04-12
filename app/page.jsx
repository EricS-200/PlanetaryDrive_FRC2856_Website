import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frc1 from "/public/home/frc-1-compressed.jpg";
import ParallaxBanner from "@/components/ParallaxBanner";
import mainBanner from "/public/team_pics/main-banner.png";
import frcLogo from "/public/home/frc-logo.png";

export default function Home() {
  return (
    <main className="flex items-center flex-col h-full">
      <ParallaxBanner
        src={mainBanner}
        className="h-[50vh] xl:h-[65vh]"
        speed={0.5}
      />
      <section className="w-full flex justify-center flex-col items-center overflow-hidden bg-black">
        <h1 className="text-center sm:text-8xl text-6xl mt-6 mb-2">
          Planetary Drive Robotics
        </h1>
        <p className="text-center	text-2xl mb-4 m-2">
          <i>FIRST</i> Robotics Team #2856
        </p>
        <h2 className="text-3xl font-semibold mt-2 text-center">
          Thanks to all the sponsors that allow us to keep working!
        </h2>
        <Link href="/sponsors">
          <Button variant="outline" className="dark m-6 text-xl" size="lg">
            Our Sponsors
          </Button>
        </Link>
      </section>
      <section className="flex justify-center bg-black w-full">
        <div className="flex flex-col lg:flex-row justify-around items-center ">
          <Image
            alt=""
            src="/home/home2.png"
            width={100000}
            height={100}
            className="w-2/3 mb-8 lg:mt-0 lg:w-1/2 rounded-md"
          ></Image>
          <div className="flex flex-col items-center justify-center lg:order-first">
            <h2 className="text-center mb-2">Our Team</h2>
            <p className="text-center max-w-[90%] sm:max-w-lg md:max-w-md text-lg leading-loose">
              Established in 2009, Planetary Drive is a high school robotics
              team competing in the <i>FIRST</i> Robotics Competition. Each
              year, our extremely driven team of students along with our mentor
              design, build, and code a fully fledged metal robot to then play
              and compete against other teams from all over the country.
            </p>
            <Link className="dark self-center m-4" href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex justify-center flex-col items-center bg-black">
        <div className="border-t-[1px] w-[80%] my-8 border-slate-700 bg-black"></div>
        <h2 className="my-4">
          What is <i>FIRST</i>?
        </h2>
        <div className="flex justify-center items-center flex-col w-[90%] lg:w-[85%] 2xl:w-1/2">
          <div className="relative">
            <Image
              src={frcLogo}
              alt=""
              className="absolute bottom-6 -right-4 w-32"
            />
            <Image
              src={frc1}
              alt=""
              placeholder="blur"
              className="rounded-lg mb-4"
              height={3989}
              width={5983}
            />
          </div>

          <div className="flex flex-col items-center mb-4 xl:w-[90%]">
            <h3 className="my-4 lg:w-[95%]">
              <i>FIRST</i> inpires the engineers of tomorrow by giving us
              experience and opportunities to apply our skills.
            </h3>
            <div className="flex justify-around w-full flex-col lg:flex-row space-y-8 lg:space-y-0">
              <p className="text-lg leading-loose lg:max-w-[45%]">
                The <i>FIRST</i> Robotics Competition is a yearly event where
                teams accross the country build, design, and program a fully
                functional robot all within two months. All that hard work
                culminates in a three day regional event where the top teams can
                then move on to the world championship.
              </p>
              <p className="text-lg leading-loose mt-2 lg:max-w-[45%]">
                Robots are made from scratch, and a new one is made every year
                to meet that year&apos;s event specifications. For the 2024
                event CRESCENDO, we had to build a robot able to pick up a note
                from the ground and shoot it into a speaker on the game field to
                score against other teams.
              </p>
            </div>
          </div>
          <div className="flex justify-around w-full mb-6 sm:flex-row flex-col items-center sm:space-y-0 space-y-4">
            <Link
              href="https://www.firstinspires.org/robotics/frc"
              target="_blank"
              className=""
            >
              <Button className="dark mt-2" variant="outline" size="lg">
                <p>
                  More About <i>FIRST</i>
                </p>
              </Button>
            </Link>
            <Link href="/gallery" className="">
              <Button className="dark mt-2" variant="outline" size="lg">
                Team Pictures
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center items-center flex-col pt-12 bg-black">
        <h2 className="text-center">Why We Love Robotics</h2>
        <div className="flex my-8 w-[95%] xl:w-3/4 2xl:w-2/3 lg:flex-row flex-col items-center lg:items-start">
          <div className="flex w-full sm:w-[90%] lg:w-2/3 sm:space-x-10 sm:flex-row flex-col items-center sm:items-start">
            <div className="flex flex-col items-center sm:w-1/2 w-[80%]">
              <img src="/home/teamwork-icon.svg" alt="" className="w-32 mb-4" />
              <h3 className="text-center">Teamwork</h3>
              <p className="text-center leading-loose">
                Through robotics, we get to meet, work with, and learn from many
                smart and dedicated people from all different types of
                backgrounds that love engineering & programming and it is an
                amazing environment for anyone interested in STEM.
              </p>
            </div>

            <div className="flex flex-col items-center sm:w-1/2 mt-12 w-[80%] sm:mt-0">
              <img src="/home/gears-icon.svg" alt="" className="w-32 mb-4" />
              <h3 className="text-center">Learn & Apply Skills</h3>
              <p className="text-center leading-loose">
                Robotics allows us to apply skills learned in classrooms and
                beyond, and learn new skills through designing and building our
                yearly robot while being guided by our mentor. We also get
                experience in programming with Java and the WPI Library.
              </p>
            </div>
          </div>

          <div className="lg:ml-6 flex flex-col items-center w-[80%] sm:w-1/2 lg:w-1/3 mt-12 lg:mt-0">
            <img src="/home/coins-icon.svg" alt="" className="w-32 mb-4" />
            <h3 className="text-center">Opportunities</h3>
            <p className="text-center leading-loose">
              Through robotics, we gain leadership and communication skills and
              are given opportunities to stand out and even win awards.
              Furthermore, there are many scholarship opportunities associated
              with <i>FIRST</i> - learn more on their website.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center">Interested?</h3>
          <p className="leading-loose text-xl text-center w-[95%] md:w-2/3">
            If you are a student in Fayette County Public Schools (Lexington,
            KY) and interested in STEM, consider joining us! Feel free to
            contact us if you have any questions or concerns, or continue
            reading about our team!
          </p>
          <div className="sm:space-x-8 flex sm:flex-row flex-col items-center justify-center">
            <Link href="/join" className="text-lg">
              <Button className="dark mt-5" variant="outline" size="lg">
                Join the Team
              </Button>
            </Link>
            <Link href="/about" className="text-lg">
              <Button className="dark mt-5" variant="outline" size="lg">
                More About Us
              </Button>
            </Link>
            <Link href="/contact" className="text-lg">
              <Button className="dark mt-5" variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

{
  /* <i>FIRST</i> Robotics offers students the opportunity to get
hands-on engineering and programming experience. Students also
develop skills in leadership, organization, and fundraising. On
top of that, there are many scholarship opportunities with{" "}
<i>FIRST</i>, and through all of their opportunities, they are
forming the top engineers and programmers of the future. */
}

{
  /* <section className="flex flex-col lg:flex-row justify-center items-center mt-16">
        <Image
          src="/home/home2.png"
          width={100000}
          height={100}
          className="w-1/2 mt-8 lg:mt-0 lg:w-1/3 lg:ml-20 rounded-md"
        ></Image>
        <div className="lg:ml-20 flex flex-col justify-center">
          <h2 className="text-center text-4xl font-semibold mb-2">
            Our Sponsors
          </h2>
          <p className="text-center  w-96  leading-loose">
            The sponsors of Team Planteray Drive are the ones who allow our team
            to build a robot and compete each year in FRC! Sponsoring us comes
            with many benefits. We encourage you to check out our sponsors. If
            you are willing to sponsor us, please contact us!
          </p>
          <p className="max-w-96 flex flex-col items-center mt-4">
            Special thanks to our current biggest sponsor:{" "}
            <span className="">
              <Link href="https://www.se.com/us/en/" target="_blank">
                <Button
                  variant="link"
                  className="dark p-0 m-0 text-md font-semibold"
                  size="lg"
                >
                  Schneider Electric
                </Button>
              </Link>
            </span>
          </p>
          <Link className="dark self-center m-4" href="/sponsors">
            <Button variant="outline" size="lg">
              Our Sponsors
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
*/
}
("");

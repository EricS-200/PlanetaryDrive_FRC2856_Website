"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {

  AOS.init();
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() { AOS.refresh(); }, 500);
  });
  AOS.refresh();


  return (
    <main className="">
      <section className="w-full flex justify-center flex-col items-center overflow-hidden">
        {/* <img
          src="/team_pics/main-banner5.png"
          className="w-[1000px] lg:w-full"
        ></img> */}
        <div className="bg-[url('/team_pics/main-banner5.png')] w-full h-[50vh] xl:h-[60vh] bg-cover bg-center"></div>
        <h1 className="text-center sm:text-8xl text-6xl mt-6 mb-2">
          Planetary Drive Robotics
        </h1>

        <p className="text-center	text-2xl mb-4 m-2">
          FIRST Robotics Team #2856
        </p>
        <h2 className="text-3xl font-semibold mt-2 text-center">
          Thanks to all the sponsors that allow us to keep working!
        </h2>

        <Link href="/sponsors">
          <Button variant="outline" className="dark m-6 text-xl" size="lg">
            Our Sponsors
          </Button>
        </Link>
        <br/><br/>
      </section>
      <section className=" flex justify-center">
        <div className="flex flex-col lg:flex-row justify-around items-center ">
          <Image
            src="/home/home2.png"
            width={100000}
            height={100}
            className="w-2/3 mb-8 lg:mt-0 lg:w-1/2 rounded-md"
          ></Image>
          <div className=" flex flex-col justify-center lg:order-first">
            <h2 className="text-center mb-2">Our Team</h2>
            <p className="text-center max-w-md text-lg leading-loose">
              Established in 2009, Planetary Drive is a high school robotics
              team competing in the FIRST Robotics Competition. Each year, our
              extremely driven team of students design, build, and code a fully
              fledged metal robot to then play and compete against other teams
              from all over the United States.
            </p>
            <Link className="dark self-center m-4" href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="flex flex-col lg:flex-row justify-center items-center mt-16">
        <Image
          src="/robot2024NotCropped.jpg"
          width={100000}
          height={100}
          className="w-1/2 mt-8 lg:mt-0 lg:w-1/3 rounded-md"
          alt={"a team member next to the robot at the competetion"}>
        </Image>

        <div className="lg:ml-20 flex flex-col justify-center">
          <h2 className="text-center text-4xl font-semibold mb-2">
            Our Sponsors
          </h2>

          <p className="text-center  w-96  leading-loose">
            The sponsors of Team Planetary Drive are the ones who allow our team
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
                  size="lg">
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
      </section> */}
      <section className="w-full bg-slate-700 pb-4 pt-1">
        <h2 className="flex flex-col justify-center items-center text-center mt-4">
          What is FIRST?
        </h2>
        <img src="/home/frc-1.jpg" alt="" className="w-1/3 rounded-md m-4" />
        <p>
          The FIRST Robotics Competition is a yearly event where teams accross
          the country build, design, and program a fully functional robot all
          within two months. Teams then go to regional competitions to compete
          in that year's event and possibly move on to the world championship.
        </p>
      </section>

    </main>
  );
}

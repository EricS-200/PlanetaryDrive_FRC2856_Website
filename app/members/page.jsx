// "use client";

/*
This section lists all the active/main members of our team.
We might merge this page into the About Us page.
*/
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MemberCard from "@/components/MemberCard";
import ParallaxBanner from "@/components/ParallaxBanner";
// import { useRef } from "react";
import mainBanner from "/public/team_pics/main-banner2.png";
// members
import ade from "/public/team_pics/ade.jpg";
import anthony from "/public/team_pics/anthony.jpg";
import daniel from "/public/team_pics/daniel.jpg";
import jacoby from "/public/team_pics/jacoby.jpg";
import jake from "/public/team_pics/jake.jpg";
import mukhil from "/public/team_pics/mukhil.jpg";
import myles from "/public/team_pics/myles.jpg";
import natalie from "/public/team_pics/natalie.jpg";
import wayne from "/public/team_pics/wayne.png";
import zach from "/public/team_pics/zach.jpg";

import malePlaceholder from "/public/placeholder/male-profile-placeholder.jpg";
import femalePlaceholder from "/public/placeholder/female-profile-placeholder.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// placeholders for: andrew, siddhi, karthika, kaiwen, andrew

const mentors = [
  {
    name: "placeholder",
    picture: malePlaceholder,
    role: "Team Mentor",
  },
  {
    name: "placeholder",
    picture: femalePlaceholder,
    role: "Team Mentor",
  },
  {
    name: "placeholder",
    picture: malePlaceholder,
    role: "Team Mentor",
  },
];

const leads = [
  {
    name: "Daniel",
    picture: daniel,
    role: "Team Captain/Build Lead",
  },
  {
    name: "Anthony",
    picture: anthony,
    role: "Programming Lead",
  },
  {
    name: "Andrew",
    picture: malePlaceholder,
    role: "Build Lead",
  },
];

const programming = [
  {
    name: "Mukhil",
    picture: mukhil,
    role: "Programmer",
  },
  {
    name: "Eric",
    picture: malePlaceholder,
    role: "Programmer",
  },
  {
    name: "Jake",
    picture: jake,
    role: "Programmer",
  },
];

const build = [
  {
    name: "Myles",
    picture: myles,
    role: "Build & Engineering/Safety Captain",
  },
  {
    name: "Kaiwen",
    picture: malePlaceholder,
    role: "Build & Engineering",
  },
  {
    name: "Jacoby",
    picture: jacoby,
    role: "Build & Engineering",
  },
  {
    name: "Zach",
    picture: zach,
    role: "Build & Engineering",
  },
  {
    name: "Ade",
    picture: ade,
    role: "Build & Engineering",
  },
  {
    name: "Natalie",
    picture: natalie,
    role: "Build & Engineering",
  },
  {
    name: "Siddhi",
    picture: femalePlaceholder,
    role: "Build & Engineering",
  },
  {
    name: "Karthika",
    picture: femalePlaceholder,
    role: "Build & Engineering",
  },
];

export default function Members({ banner = true }) {
  // const teamDescriptions = useRef(null);

  // function scrollToDescriptions() {
  //   teamDescriptions.current.scrollIntoView({ behavior: "smooth" });
  // }

  // function scrollToTop() {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  return (
    <main className="flex flex-col items-center justify-center overflow-hidden w-full">
      {banner && (
        <ParallaxBanner
          src={mainBanner}
          className="w-full h-[50vh] lg:h-[65vh]"
          imgClassName="object-top"
          speed={0.5}
        ></ParallaxBanner>
      )}
      <section className="flex flex-col items-center bg-black relative">
        <div className="absolute w-full h-[150px] top-0 bg-gradient-to-t from-black -translate-y-full"></div>
        <h1
          className={`text-center mt-4 ${
            banner ? "sm:text-8xl text-6xl" : "text-6xl"
          }`}
        >
          Meet Our Team
        </h1>
        <h3 className="text-center mx-auto md:w-1/2 my-3">
          They are the ones who make this team what it is!
        </h3>
        <p className=" text-center mx-auto w-[95%] md:w-1/2 text-lg">
          We have an amazing and diverse team of students and mentors that all
          love robotics! The students are divided into two teams: the
          electromechanical (build) and programming teams. Check out all of our
          members below, and learn more about what each team does.
        </p>
        <p className="text-center mx-auto w-[95%] md:w-1/2 mt-3">
          <i>
            Students can come at all times to help out with the creation of the
            robot - the following members are people who participate regularly
            and go to competition.
          </i>
        </p>
        {/* <button onClick={scrollToDescriptions}>
          <p className="text-xl text-center flex items-center justify-center mt-4 underline underline-offset-2">
            Jump to team descriptions
            <span className="ml-2">
              <img
                src="/down-arrow.svg"
                width={20}
                className="fill-white stroke-white text-white"
              />
            </span>
          </p>
        </button> */}
      </section>
      <section className="flex flex-col items-center w-full bg-black">
        <h2 className="text-center mt-8 mb-2">Mentors</h2>
        <div className="justify-center items-center flex-wrap hidden lg:flex">
          {mentors.map((mentor) => (
            <MemberCard member={mentor} key={mentor.name} />
          ))}
        </div>
        <div className="flex justify-center w-auto lg:hidden">
          <Carousel className="w-[450px] dark">
            <CarouselContent className="">
              {mentors.map((mentor) => (
                <CarouselItem key={mentor.name} className="">
                  <MemberCard member={mentor} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative flex mx-[100px] mb-6 sm:static">
              <CarouselPrevious className="" />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        <p className="text-center text-lg w-[95%] md:w-2/3 lg:w-1/2">
          Our mentors, driven by their love for robotics, are the ones with the
          most experience, and they help guide and supervise the team with their
          expertise. They are also the ones who handle all the documentation,
          registration, and logistics of going to the competition! Their
          astounding commitment to the team and robotics as a whole is what
          allows this team to function.
        </p>
        <p className="text-center text-lg w-[95%] md:w-2/3 lg:w-1/2 mt-3">
          <strong>Special thanks to our former mentor Wayne Brumfield</strong>,
          who helped mentor the robotics team for over 12 years and retired in
          2024. His incredible contribution to the team has allowed to become
          what it is today.
        </p>
      </section>
      <section className="flex flex-col items-center w-full bg-black">
        <h2 className="text-center my-6">Leadership</h2>
        <div className="lg:flex hidden justify-center items-center flex-wrap">
          {leads.map((member) => (
            <MemberCard member={member} key={member.name} />
          ))}
        </div>
        <div className="flex justify-center w-auto lg:hidden">
          <Carousel className="w-[450px] dark">
            <CarouselContent className="">
              {leads.map((member) => (
                <CarouselItem key={member.name} className="">
                  <MemberCard member={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative flex mx-[100px] mb-6 sm:static">
              <CarouselPrevious className="" />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
        <p className="text-center text-lg w-[95%] md:w-2/3 lg:w-1/2">
          The extremely driven and caring leadership is composed of experienced
          members that organize everything including meetings, team structure,
          as well as individual assignments. They help guide new members, and
          plan the team strategy as well as the construction and design of the
          robot based on the season event and everyone&apos;s input.
        </p>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center my-6">Programming Team</h2>
        <div className="lg:flex hidden justify-center items-center flex-wrap">
          {programming.map((member) => (
            <MemberCard member={member} key={member.name} />
          ))}
        </div>
        <div className="flex justify-center w-auto lg:hidden">
          <Carousel className="w-[450px] dark">
            <CarouselContent className="">
              {programming.map((member) => (
                <CarouselItem key={member.name} className="">
                  <MemberCard member={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative flex mx-[100px] mb-6 sm:static">
              <CarouselPrevious className="" />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
        <p className="text-center text-lg w-[95%] md:w-2/3 lg:w-1/2">
          The programming team is composed of dedicated and driven computer
          science students. They are the ones responsible for creating and
          implementing the software used in the robot. They are also the ones
          who test, debug, and maintain the code base. Furthermore, during parts
          of the build process, when the programming team is ahead of the build
          team, they may assist in the assemblage of the robot.
        </p>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center my-6">Electromechanical Team</h2>
        <div className="lg:flex hidden justify-center items-center flex-wrap 2xl:w-[80%]">
          {build.map((member) => (
            <MemberCard member={member} key={member.name} />
          ))}
        </div>
        <div className="flex justify-center w-auto lg:hidden">
          <Carousel className="w-[450px] dark">
            <CarouselContent className="">
              {build.map((member) => (
                <CarouselItem key={member.name} className="">
                  <MemberCard member={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative flex mx-[120px] mb-6 sm:static">
              <CarouselPrevious className="" />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
        <p className="text-center text-lg w-[95%] md:w-2/3 lg:w-1/2">
          The electromechanical (build) team is characterized by all of
          it&apos;s brilliant engineering students who, each year, work hand in
          hand with the programming team and mentors to plan, design, and
          assemble a fully functional robot with great care and precision. The
          hands-on experience with electronics, pneumatics, and mechanics in an
          actual workshop prepares them to become great engineers in the future.
        </p>
      </section>
      <div className="border-t-[1px] w-[80%] my-8 border-slate-700 bg-black"></div>
      {/* <section>programming team explained</section>
      <section>build team explained</section>
      <section>honorable mentions/extra contributors/info</section> */}
      <section className="flex flex-col items-center justify-center">
        <p className="font-semibold text-2xl text-center lg:w-1/2 md:w-2/3 w-[95%]">
          If you are a student who likes STEM in the Fayette Country school
          district (Lex, KY), or if you are interested in becoming a mentor, we
          would be honored to have you on our team.
        </p>
        <Link href="/join" className="text-lg">
          <Button className="dark mt-5" variant="outline" size="lg">
            Join the Team
          </Button>
        </Link>
      </section>
    </main>
  );
}

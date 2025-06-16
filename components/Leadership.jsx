/*
This section is a cut down copy of the Members page (components\Unused Pages\(more)\members\page.jsx)
This removes the cards of individual members, instead only including leads & mentors    
*/

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MemberCard from "@/components/MemberCard";
import anthony from "/public/team_pics/anthony.jpg";
import daniel from "/public/team_pics/daniel.jpg";
import zach from "/public/team_pics/zach.jpg";
import myles from "/public/team_pics/myles.jpg";

import malePlaceholder from "/public/placeholder/male-profile-placeholder.jpg";
import femalePlaceholder from "/public/placeholder/female-profile-placeholder.jpg";

import leadIcon from "/public/about-us/rocket-icon.svg";
import buildIcon from "/public/build-icon.svg";
import mentorIcon from "/public/helmet-icon.svg";
import programmingIcon from "/public/programming-icon.svg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LucideLoader } from "lucide-react";

const mentors = [
  {
    name: "Mohammad Ameen",
    picture: malePlaceholder,
    role: "Team Mentor",
  },
  {
    name: "April Gonzalez",
    picture: femalePlaceholder,
    role: "Team Sponsor",
  },
];

const leads = [
  {
    name: "Myles",
    picture: myles,
    role: "Build Lead",
  },
  {
    name: "Zach",
    picture: zach,
    role: "Build Lead",
  },
  {
    name: "Eric",
    picture: malePlaceholder,
    role: "Programming Lead",
  },
];

export default function Members() {
  return (
    <main className="flex flex-col items-center justify-center overflow-hidden w-full">
      <section className="flex flex-col items-center bg-black relative">
        <div className="absolute w-full h-[150px] top-0 bg-gradient-to-t from-black -translate-y-[99%]"></div>
        <h1 className={`text-center mt-4 text-6xl`}>Our Leadership</h1>
        <h3 className="text-center mx-auto md:w-1/2 my-3">
          Along with all our members, they make our team unique!
        </h3>
        <p className=" text-center mx-auto w-[95%] md:w-1/2 text-lg">
          We have an amazing and diverse team of students and mentors that all
          love robotics! The students are divided into two teams: the
          electromechanical (build) and programming teams. Here is some
          information about those teams.
        </p>
      </section>
      <section className="flex flex-col items-center w-full bg-black">
        <h2 className="text-center mt-8 mb-2 flex items-center">
          <Image src={mentorIcon} className="w-20 mr-4" alt="Mentor Icon" />
          Mentors
        </h2>
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
      </section>
      <section className="flex flex-col items-center w-full bg-black">
        <h2 className="text-center mt-8 mb-2 flex items-center">
          <Image src={leadIcon} className="w-20 mr-4" alt="Leadership Icon" />
          Leadership
        </h2>
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
        <h2 className="text-center mt-8 mb-2 flex items-center">
          <Image
            src={programmingIcon}
            className="w-20 mr-4"
            alt="Programming Icon"
          />
          Programming Team
        </h2>
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
        <h2 className="text-center mt-8 mb-2 flex items-center">
          <Image src={buildIcon} className="w-20 mr-4" alt="Electromech Icon" />
          Electromechanical Team
        </h2>
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

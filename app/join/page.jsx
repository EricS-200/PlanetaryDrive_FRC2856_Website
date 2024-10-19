import ParallaxBanner from "@/components/ParallaxBanner";
// currently using the same banner as the members page - members page will likely be removed and merged into about page.
import mainBanner from "/public/team_pics/main-banner2.png";
import Image from "next/image";
import discordIcon from "/public/footer/discord-icon.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import programmingIcon from "/public/programming-icon.svg";
import workshop from "/public/join/workshop.jpg";
import buildIcon from "/public/build-icon.svg";
import helmetIcon from "/public/helmet-icon.svg";
import mailIcon from "/public/mail-icon.svg";

export const metadata = {
  title: "Join",
};

export default function Join() {
  return (
    <main className="flex flex-col items-center w-full mb-8">
      <ParallaxBanner
        speed={0.5}
        src={mainBanner}
        className="w-full h-[50vh] lg:h-[65vh]"
        imgClassName="object-top"
      >
        <div className="absolute w-full h-[50vh] lg:h-[65vh] bg-black/40 flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mt-4 sm:text-8xl text-6xl text-white text-center">
              Join the Team
            </h1>
            <h3 className=" mt-4 text-white text-center px-4">
              Information for anyone interested in joining
            </h3>
          </div>
        </div>
      </ParallaxBanner>
      <section className="relative w-full bg-black flex flex-col items-center">
        <div className="absolute w-full h-[150px] top-0 bg-gradient-to-t from-black -translate-y-[99%] "></div>
        <div className="w-[95vw] md:w-3/4 lg:w-3/5 pt-8 space-y-2 flex flex-col items-center">
          <h2 className="text-center mb-4">
            Any high school student in FCPS (Lexington, KY) can join the team.
          </h2>
          <p className="text-center text-2xl">
            <i>Most of our members are from Dunbar & Lafayette HS.</i>
          </p>
          <Link href="https://discord.gg/d36XRMfYUF" target="_blank">
            <Button className="dark p-8 my-8" variant="outline">
              <Image src={discordIcon} width={30} className="mr-4" />
              <p className="text-2xl">Member Discord</p>
            </Button>
          </Link>
          <h4 className="text-center">
            Communications are done through our member Discord server
          </h4>
          <p className="text-xl text-center">
            Make sure to check regularly for information.
          </p>
        </div>
      </section>

      <section className="w-full flex-col flex items-center bg-black mb-6">
        <div className="border-t-[1px] w-[80%] my-8 lg:my-12 border-slate-700 bg-black"></div>
        <h2 className="text-center mb-2">Our Teams</h2>
        <p className="text-center text-lg w-[95vw] sm:w-3/4 lg:w-3/5 mb-6">
          Members can choose one of two teams to be apart of: electromechanical
          (build) or programming.
        </p>
        <div className="text-center flex flex-col lg:flex-row  w-[95vw] sm:w-3/5 md:w-1/2 lg:w-2/3  justify-center lg:space-x-16 ">
          <div className="flex flex-col items-center mb-8">
            <Image src={programmingIcon} className=" w-28 mb-4" />
            <h3 className="mb-3">Programming Team</h3>
            <p className="">
              The programming team is tasked with coding the robot. No
              experience is required, but some software development experience
              would be useful, especially with Java. To code the robot, we use
              Java and the{" "}
              <Link
                href={"https://docs.wpilib.org/en/stable/index.html"}
                target="_blank"
              >
                <Button variant="link" className=" text-md p-0">
                  WPI library
                </Button>
              </Link>
              . Oftentimes, the programming team will ge done with their tasks
              early on and may then help the build team assemble the robot.
            </p>
          </div>
          <div className="flex flex-col items-center ">
            <Image src={buildIcon} className=" w-28 mb-4" />
            <h3 className="mb-3">Electromechanical Team</h3>
            <p className="">
              The electromechanical, or build, team is charged with desiging and
              building the robot. This team spends the majority of their time in
              the workshop doing hands-on work. No experience is required to
              join, but any engineering experience can be helpful. We may decide
              to use CAD in the future, so experience with it could be very
              valuable.
            </p>
          </div>
        </div>
        <Image src={helmetIcon} className="w-28 lg:mt-0 mt-8 mb-4" />
        <h3 className="mb-3">Mentors</h3>
        <p className="text-center w-[95vw] sm:w-3/5 md:w-1/2">
          Mentors are a crucial part of the robotics team as they help guide
          students through the entire process of building a robot. Through their
          experience and guidance, they are able to help students achieve their
          full potential and inspire them to do their best. They also ensure
          safety and help with registration & organization. If you are
          interested in becoming a mentor, feel free to contact us!
        </p>
        <div className="flex sm:flex-row flex-col sm:space-x-12 sm:space-y-0 space-y-6 mt-4">
          <Link href={"/contact"}>
            <Button variant="outline" className="dark text-md" size="lg">
              Contact Us
            </Button>
          </Link>
          <Link
            href={
              "https://www.firstinspires.org/ways-to-help/volunteer/mentors-and-coaches"
            }
            target="_blank"
          >
            <Button variant="outline" className="dark text-md" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section className="flex flex-col items-center text-lg">
        <h2 className="mb-2 mt-4 text-center">Meeting Information</h2>

        <p className="text-center w-[95vw] sm:w-3/5 md:w-1/2">
          Most of our meetings are held at{" "}
          <Link
            target="_blank"
            href="https://www.google.com/maps/place/Newton's+Attic/@38.0417358,-84.6280191,16.86z/data=!4m6!3m5!1s0x88426814862fca05:0x3014855aa1105d18!8m2!3d38.0417397!4d-84.625191!16s%2Fg%2F1263r6v8x?entry=ttu"
          >
            <Button variant="link" className="dark p-0">
              <p className=" font-semibold text-slate-200 text-lg">
                Newton&apos;s Attic
              </p>
            </Button>
          </Link>
          , during the second school semester, after the{" "}
          <Link
            target="_blank"
            href={"https://www.firstinspires.org/robotics/frc/kickoff"}
          >
            <Button variant="link" className="dark p-0 text-lg">
              FRC Kickoff
            </Button>
          </Link>
          . This may differ on occasions. Check our{" "}
          <Link target="_blank" href={"https://discord.gg/d36XRMfYUF"}>
            <Button variant="link" className="dark p-0 text-lg">
              Discord server
            </Button>
          </Link>{" "}
          for the most up-to-date information.
        </p>

        <Image
          src={workshop}
          placeholder="blur"
          className="rounded-lg w-[90vw] sm:w-3/5 md:w-1/2 object-cover object-bottom"
        />

        <h4 className="mt-4">Usual Schedule</h4>
        <p className="text-xl leading-loose text-center">
          Monday, Wendesday, Friday - 4-9PM
        </p>
        <p className="text-xl leading-loose">Saturday - 10AM-4PM</p>
        <p className="text-center text-lg w-[95vw] sm:w-3/5 md:w-1/2">
          Members don&apos;t have to attend every single meeting, or be there
          the entire time. However, only members who attend regularly usually go
          to the competition in March as we have limited resources.
        </p>
        <div className="border-t-[1px] w-[80%] my-8 lg:my-12 border-slate-700 bg-black"></div>
      </section>
      <section className="w-full flex flex-col items-center">
        {/* <h2 className="text-center">Resources</h2> */}
        <h4 className="text-center w-[95vw] sm:w-3/5 md:w-1/2 my-2">
          It may be useful to get a good idea of what robotics looks like before
          joining.
        </h4>
        <p className="text-center w-[95vw] sm:w-3/5 md:w-1/2 my-2 text-lg leading-loose">
          Get familiar with how robots work. Take a look at the{" "}
          <Link
            href={
              "https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html"
            }
            target="_blank"
          >
            <Button variant="link" className="p-0 text-lg">
              documentation
            </Button>
          </Link>
          , as well as some past robots that winning teams have built that you
          can find on YouTube. If you plan on joining the programming team, try
          to get familiar with{" "}
          <Link
            href={"https://www.youtube.com/watch?v=xk4_1vDrzzo"}
            target="_blank"
          >
            <Button variant="link" className="p-0 text-lg">
              Java
            </Button>
          </Link>{" "}
          and the{" "}
          <Link
            href={
              "https://docs.wpilib.org/en/stable/stubs/programming-basics-stub.html"
            }
            target="_blank"
          >
            <Button variant="link" className="p-0 text-lg">
              WPI Java Library
            </Button>
          </Link>
          . Consider checking out our own robot code from previous years on our{" "}
          <Link href={"https://github.com/TeamPlanetaryDrive"} target="_blank">
            <Button variant="link" className="p-0 text-lg">
              GitHub.
            </Button>
          </Link>
        </p>
      </section>
      <section className="w-full flex flex-col items-center">
        <p className="my-4 text-xl font-semibold w-[95vw] sm:w-3/5 md:w-1/2 text-center">
          Interested or have any questions?
        </p>
        <div className="flex justify-center items-center sm:space-y-0 space-y-4 flex-col sm:flex-row sm:space-x-12">
          <Link href="https://discord.gg/d36XRMfYUF" target="_blank">
            <Button className="dark p-6" variant="outline">
              <Image src={discordIcon} width={30} className="mr-4" />
              <p className="text-lg">Join Our Discord</p>
            </Button>
          </Link>
          <Link href="/contact" target="_blank">
            <Button className="dark p-6" variant="outline">
              <Image src={mailIcon} width={30} className="mr-4" />
              <p className="text-lg">Contact Us</p>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <section className="w-full flex justify-center bg-slate-900 flex-col items-center pt-6">
        <Image src="/team_pics/main-banner3.jpg" width={5000} height={10} className="w-4/5 lg:w-2/4 mb-10" alt={"picture of of robotics team 2856 at a stadium, with a american flag in the background"}/>

        <h1 className="text-lg sm:text-2xl md: xl:text-7xl font-semibold mt-8 mb-2">
          Planetary Drive Robotics
        </h1>
        <p className="mb-4">First Robotics Team #2856</p>
        <p className="text-center	text-2xl mb-4 m-2">
          First Robotics Team #2856
        </p>
        <h2 className="text-xl mt-2">
          Thanks to all the sponsors that allow us to keep working!
        </h2>
        <Link href="/sponsors">
          <Button variant="outline" className="dark m-4">
            Our Sponsors
          </Button>
        </Link>
      </section>
      <section className="flex flex-col lg:flex-row justify-center items-center mt-8 ">
        <div className="lg:mr-20 flex flex-col justify-center">
          <h2 className="text-center text-4xl font-semibold mb-2">Our Team</h2>
          <p className="text-center max-w-96  leading-loose">
            Established in 2009, Planetary Drive is a robotics team
            participating in the annual First Robotics Competition. We are a
            group of STEM driven high school students that design, code, and
            build a robot each year to compete. We give our members the
            opportunity to have fun and gain experience with by engineering and
            programming our yearly robot.
          </p>
          <Link className="dark self-center m-4" href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
        <Image
          src="/home/home2.png"
          width={100000}
          height={100}
          className="w-1/2 mt-8 lg:mt-0 lg:w-1/3 lg:ml-20 rounded-md"
        ></Image>
      </section>
      <section className="flex flex-col lg:flex-row justify-center items-center mt-16">
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
            to build a robot and compete each year in FRC! Our sponsors are on our social media
            <p className={"text-red-600 text-3xl"}>**(WE NEED TO MAKE ONE)**</p> and on the robot decal itself. If
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
}

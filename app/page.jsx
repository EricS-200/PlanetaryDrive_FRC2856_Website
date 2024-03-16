import Image from "next/image";

export default function Home() {
  return (
      <div className={"bg-slate-900 pb-96"}>
          <div className={"w-full flex justify-center flex-col items-center pt-6"}>
              <div
                  className="flex justify-center items-center bg-no-repeat bg-center bg-cover h-[30vw] w-[60vw] sm:w-[54vw] md:w-[55vw] xl:w-[60vw] 2xl:w-[65vw] rounded-3xl m-2 overflow-hidden">
                  <Image src={"/team_pics/main-banner.jpg"}
                         alt={"picture of team 2856 at the stadium during the crescendo competetion"} width={10000}
                         height={10000} className={"aspect-[6/4]"}/>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mt-8 mb-4">
                  Planetary Drive Robotics
              </h1>
              <h4 className="mb-8 lg:mb-12 text-lg sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">Team #2856</h4>

              <p className={"text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl text-justify items-center w-9/12"}>
                  Lexington's biggest robotics composed of students from Dunbar High School and Lafayette High School.
                  Our diverse group of students from all over the world
                  all come together to form an amazing robotics team. Unlike many other student teams, the Robotics Team
                  is not formed around any one particular contest or event.
                  Rather, our team prefers to continually evolve through finding new opportunities where they can use
                  the skills they have
                  developed from previous competitions.<strong>**__**yap more here later**__**</strong>
              </p>



          </div>
      </div>
  );
}

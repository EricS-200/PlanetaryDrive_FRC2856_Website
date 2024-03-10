import Image from "next/image";

export default function Home() {
  return (
    <div className={"bg-slate-950"}>
        <div className={"w-full flex justify-center bg-slate-900 flex-col items-center pt-6"}>
          <div className="flex justify-center items-center bg-no-repeat bg-center bg-cover h-[30vw] w-[60vw] sm:w-[54vw] md:w-[55vw] xl:w-[60vw] 2xl:w-[65vw] rounded-3xl m-2 overflow-clip">
            <Image src={"/team_pics/main-banner3.jpg"} alt={"picture of team 2856 at the stadium during the crescendo competetion"} width={10000} height={10000} className={"aspect-[6/4]"}/>
          </div>

          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mt-8 mb-2">
            Planetary Drive Robotics
          </h1>

          <p className="mb-4">First Robotics Team #2856</p>

        </div>
    </div>
  );
}

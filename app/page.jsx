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
      </section>
    </main>
  );
}

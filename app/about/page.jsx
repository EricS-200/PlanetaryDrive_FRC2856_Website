"use client"
import Image from "next/image";

export default function AboutUs() {
    // It's a joke dw
    let reallyLargeNumber = 999_999_999_999_999_999;

    return (
        <div className={"bg-slate-900 pb-48 sm:pb-96"}>
            <div className={"w-full flex justify-center flex-col items-start pl-5 sm:pl-28"}>
                <div className={"w-full flex flex-col pr-5 sm:pr-28"}>
                    <h2 className="mb-8 mt-8 lg:mb-12 lg:mt-8 text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
                        Our <span className={"text-purple-600"}>achievements
                            </span> \**IN PROGRESS**\
                    </h2>

                    <div className={"flex flex-row w-full"}>
                        <p>
                            <strong className={"text-blue-400"}>
                                Important Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            </strong><br/><br/>
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                            Yap Yap
                        </p>

                        <div className={"w-[30vw] overflow-hidden flex-none ml-8"}>
                            <Image src={"/robot2024.jpg"} alt={"Picture of 2024 robot crescendo season"}
                                   width={reallyLargeNumber /*hehe*/} height={reallyLargeNumber /*hehe*/}>
                            </Image>
                        </div>
                    </div>

                </div>
            </div>

            <div className={"w-10/12 justify-center items-start pl-5 sm:pl-28 pt-7 sm:pt-14"}>
                Add more stuff here if we want to
            </div>
        </div>
    );
}
"use client"
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUs() {
    // It's a joke dw
    let reallyLargeNumber = 999_999_999_999_999_999;
    AOS.init();
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() { AOS.refresh(); }, 500);
    });
    AOS.refresh();


    return (
        <div className={"bg-slate-950 pb-2 border-t-2"}>
            <div className={"w-full flex justify-center flex-col items-start pl-5 sm:pl-28"}>
                <div className={"w-full flex flex-col pr-5 sm:pr-28"}>
                    <h2 className="mb-8 mt-8 lg:mb-12 lg:mt-8 text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
                        Our <span className={"text-green-300"}>Philosophy </span>
                    </h2>

                    <div className={"flex flex-row w-full"}>
                        <p className={"aos-init aos-animate"} data-aos={"fade-right"} data-aos-duration={1000}>
                            <strong className={"text-blue-400"}>
                                Important Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
                                Yap Yap
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
        </div>
    );
}
"use client";

/*

THIS FOOTER IS NOT NEARLY FINISHED AND THE FOOTER THAT WE USE DOES NOT HAVE TO LOOK LIKE THIS

*/

import Link from "next/link";
import { Button } from "./ui/button";
import { pages, otherPages } from "./Navbar.jsx";

export default function Footer() {
  return (
    <div className="bg-black w-full h-full mt-8 p-6 border-t-[1px] border-slate-700 flex px-8 md:px-32 xl:px-64 relative pb-16 md:pb-12 flex-col items-center md:flex-row md:justify-around">
      <div className="flex flex-col items-center md:block">
        <h2 className="pl-2 text-xl font-semibold mb-3">
          Contact & Information
        </h2>{" "}
        <p className="flex items-center mb-2">
          <span>
            <svg
              className="fill-white stroke-white mx-2"
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z" />
            </svg>
          </span>
          4974 Old US Hwy 60, Lexington, KY 40510
        </p>
        <p className="flex items-center mb-5  ">
          <span className="">
            <svg
              className="fill-white stroke-white mx-2 my-0 pt-[2px] "
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
              />
            </svg>
          </span>
          planetarydrive2856@gmail.com
        </p>
        <Button variant="outline" className="dark md:mb-0 mb-2">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
      <div>
        <ul>
          <li>
            <Link
              href="https://www.firstinspires.org/robotics/frc"
              target="_blank"
              className="flex items-center"
            >
              <span>
                <img src="/footer/frc-icon.png" alt="" className="h-5 mr-2" />
              </span>
              <Button variant="link" className="dark p-0">
                About FIRST Robotics
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/TeamPlanetaryDrive"
              target="_blank"
              className="flex items-center"
            >
              <span>
                <img
                  src="/footer/github-icon.svg"
                  alt=""
                  className="h-5 mr-2"
                />
              </span>
              <Button variant="link" className="dark p-0">
                Our Robots
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/Eric-NoBraincells/PlanetaryDrive_FRC2856_Website"
              target="_blank"
              className="flex items-center"
            >
              <span>
                <img
                  src="/footer/github-icon.svg"
                  alt=""
                  className="h-5 mr-2 fill-white stroke-white"
                />
              </span>
              <Button variant="link" className="dark p-0">
                Our Website
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/frc_2856/"
              target="_blank"
              className="flex items-center"
            >
              <span>
                <img
                  src="/footer/instagram-icon.svg"
                  alt=""
                  className="h-5 mr-2"
                />
              </span>
              <Button variant="link" className="dark p-0">
                Official Instagram
              </Button>
            </Link>
          </li>
        </ul>
      </div>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-300 text-center">
        © 2024 Team Planetary Drive. All rights reserved.
      </p>
    </div>
  );
}

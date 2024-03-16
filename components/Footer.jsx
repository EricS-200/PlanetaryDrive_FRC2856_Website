"use client";

/*

THIS FOOTER IS NOT NEARLY FINISHED AND THE FOOTER THAT WE USE DOES NOT HAVE TO LOOK LIKE THIS

*/

import Link from "next/link";
import { Button } from "./ui/button";
import { pages, otherPages } from "./Navbar.jsx";

export default function Footer() {
  return (
    <div className="bg-slate-950 w-full h-96 border-t-[2px] border-slate-700 p-4 pl-6 md:pl-16 mt-10">
      <div>
        <h2>Contact & Information</h2>{" "}
        <p>
          <span>
            <svg
              className="fill-white stroke-white mx-2"
              width="15px"
              height="15px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z" />
            </svg>
          </span>
          4974 Old US Hwy 60, Lexington, KY 40510 -{" "}
          <Button variant="link" className="dark font-normal text-lg p-0">
            <Link href="https://newtonsattic.com/" target="_blank">
              Newton's Attic
            </Link>
          </Button>
        </p>
        <p>
          <span>
            <svg
              className="fill-white stroke-white mx-2 my-0 py-0"
              width="15px"
              height="15px"
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
      </div>
      <div>
        <h2>Pages</h2>
        <ul>
          {pages.map((link) => (
            <li>
              <Link href={link.page} key={link.name}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

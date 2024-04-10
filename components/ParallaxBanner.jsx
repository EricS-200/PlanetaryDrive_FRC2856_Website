"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/*
Known problem: loading frameshift. 

*/

export default function ParallaxBanner({
  className = "",
  speed = 0,
  src,
  fill = true,
  height,
  width,
  alt = "",
  ...props
}) {
  const [scrollY, setScrollY] = useState();
  function handleScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn("w-full -z-10 relative", className)}
      style={{ transform: `translateY(${scrollY * speed}px)` }}
      {...props}
    >
      <Image
        className="object-cover object-center"
        fill={fill}
        src={src}
        alt={alt}
        placeholder="blur"
      />
    </div>
  );
}

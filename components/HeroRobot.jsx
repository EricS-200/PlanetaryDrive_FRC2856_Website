"use client";

import Image from "next/image";
import { useRef } from "react";

export default function HeroRobot() {
  const stageRef = useRef(null);

  function handlePointerMove(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = stageRef.current;
    if (!stage || event.pointerType === "touch") return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--robot-rx", `${y * -4}deg`);
    stage.style.setProperty("--robot-ry", `${x * 6}deg`);
    stage.style.setProperty("--robot-x", `${x * 8}px`);
    stage.style.setProperty("--robot-y", `${y * 8}px`);
  }

  function resetStage() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--robot-rx", "0deg");
    stage.style.setProperty("--robot-ry", "0deg");
    stage.style.setProperty("--robot-x", "0px");
    stage.style.setProperty("--robot-y", "0px");
  }

  return (
    <figure
      className="hero-robot-stage"
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetStage}
    >
      <div className="robot-coordinate-grid" aria-hidden="true" />
      <div className="hero-robot-image">
        <Image
          src="/robot-assets/robot iso front lower angle.png"
          alt="Isometric CAD render of Planetary Drive's 2026 competition robot"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
        />
      </div>
      <div className="robot-callout callout-one" aria-hidden="true">
        <span>01</span> Roller assembly
      </div>
      <div className="robot-callout callout-two" aria-hidden="true">
        <span>02</span> Fabricated frame
      </div>
      <div className="robot-callout callout-three" aria-hidden="true">
        <span>03</span> Intake geometry
      </div>
      <figcaption>
        <span>PD_2026 / ISO.01</span>
        <span>CAD RENDER · POINTER REACTIVE</span>
      </figcaption>
    </figure>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

const views = [
  {
    label: "Front iso",
    short: "ISO 01",
    src: "/robot-assets/robot iso front.png",
    alt: "Front isometric CAD view of Planetary Drive's 2026 robot",
  },
  {
    label: "Low angle",
    short: "ISO 02",
    src: "/robot-assets/robot iso front lower angle.png",
    alt: "Low front isometric CAD view of Planetary Drive's 2026 robot",
  },
  {
    label: "Rear iso",
    short: "ISO 03",
    src: "/robot-assets/robot iso back 1.png",
    alt: "Rear isometric CAD view of Planetary Drive's 2026 robot",
  },
  {
    label: "Side",
    short: "ORTHO 01",
    src: "/robot-assets/robot side.png",
    alt: "Side orthographic CAD view of Planetary Drive's 2026 robot",
  },
  {
    label: "Front",
    short: "ORTHO 02",
    src: "/robot-assets/robot front.png",
    alt: "Front orthographic CAD view of Planetary Drive's 2026 robot",
  },
];

export default function RobotExplorer() {
  const [selected, setSelected] = useState(0);
  const view = views[selected];

  return (
    <div className="robot-explorer">
      <div className="robot-explorer-toolbar">
        <div>
          <span className="technical-label">2026 ROBOT / VIEW SELECTOR</span>
          <p>Choose an angle</p>
        </div>
        <span className="view-count">
          0{selected + 1} / 0{views.length}
        </span>
      </div>

      <div
        className="robot-view-panel"
        role="tabpanel"
        id={`robot-view-${selected}`}
        aria-label={view.label}
      >
        <Image
          key={view.src}
          src={view.src}
          alt={view.alt}
          fill
          sizes="(max-width: 900px) 100vw, 70vw"
        />
        <span className="view-axis axis-x" aria-hidden="true">X</span>
        <span className="view-axis axis-y" aria-hidden="true">Y</span>
      </div>

      <div className="robot-view-tabs" role="tablist" aria-label="Robot CAD angles">
        {views.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={`robot-view-${index}`}
            className={selected === index ? "active" : ""}
            onClick={() => setSelected(index)}
          >
            <span>{item.short}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

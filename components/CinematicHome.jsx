"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MoveRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { sponsors } from "@/data/site";
import HeroRobot from "@/components/HeroRobot";

const PRELOAD_TIMEOUT_MS = 30_000;
const SLOW_PRELOAD_TIMEOUT_MS = 30_000;
const DESKTOP_VIDEO = "/cinematic/video/robot-scroll-desktop-v2.mp4";
const MEDIUM_VIDEO = "/cinematic/video/robot-scroll-medium-v2.mp4";
const MOBILE_VIDEO = "/cinematic/video/robot-scroll-mobile-v2.mp4";
const LITE_VIDEO = "/cinematic/video/robot-scroll-lite-v2.mp4";
const SPRING_STIFFNESS = 320;
const SPRING_DAMPING = 35;

const pathways = [
  {
    number: "01",
    title: "The machine",
    detail: "CAD, fabrication, electrical systems, controls, and iteration.",
    href: "/engineering",
  },
  {
    number: "02",
    title: "The team",
    detail: "The students, mentors, values, and purpose behind Team 2856.",
    href: "/about",
  },
  {
    number: "03",
    title: "Your place",
    detail: "Programming, electromechanical, business, and outreach roles for students.",
    href: "/join",
  },
  {
    number: "04",
    title: "The support",
    detail: "Help cover parts, tools, registration, and competition travel.",
    href: "/sponsors",
  },
  {
    number: "05",
    title: "The conversation",
    detail: "Questions, visits, mentoring, partnerships, and next steps.",
    href: "/contact",
  },
];

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smooth = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

async function fetchVideo(url, signal, onProgress) {
  const response = await fetch(url, {
    cache: "force-cache",
    signal,
  });
  if (!response.ok) throw new Error(`Unable to load cinematic asset (${response.status})`);

  const totalBytes = Number(response.headers.get("content-length")) || 0;
  if (!response.body || !totalBytes) {
    const blob = await response.blob();
    onProgress(100);
    return blob;
  }

  const reader = response.body.getReader();
  const chunks = [];
  let loadedBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loadedBytes += value.byteLength;
    onProgress(Math.min(99, Math.round((loadedBytes / totalBytes) * 100)));
  }

  return new Blob(chunks, {
    type: response.headers.get("content-type") || "video/mp4",
  });
}

export default function CinematicHome() {
  const cinematicRef = useRef(null);
  const cinematicVideoRef = useRef(null);
  const mediaAbortRef = useRef(null);
  const mediaUrlRef = useRef(null);
  const mediaFrameRateRef = useRef(30);
  const skippedRef = useRef(false);
  const stageRef = useRef("dark");
  const [stage, setStage] = useState("dark");
  const [loadProgress, setLoadProgress] = useState(0);
  const [experience, setExperience] = useState("loading");

  useEffect(() => {
    if (experience !== "loading") return undefined;

    const root = document.documentElement;
    const body = document.body;
    root.classList.add("is-cinematic-loading");
    body.classList.add("is-cinematic-loading");

    return () => {
      root.classList.remove("is-cinematic-loading");
      body.classList.remove("is-cinematic-loading");
    };
  }, [experience]);

  const showStaticFallback = useCallback((reason = "manual") => {
    skippedRef.current = true;
    mediaAbortRef.current?.abort();
    mediaAbortRef.current = null;

    const video = cinematicVideoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    if (mediaUrlRef.current) {
      URL.revokeObjectURL(mediaUrlRef.current);
      mediaUrlRef.current = null;
    }

    setLoadProgress(100);
    setExperience("static");
    stageRef.current = reason === "manual" ? "skipped" : "static";
    setStage(stageRef.current);
  }, []);

  useEffect(() => {
    let active = true;
    const started = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlink = Number(connection?.downlink) || null;
    const latency = Number(connection?.rtt) || null;
    const verySlowConnection =
      ["slow-2g", "2g"].includes(connection?.effectiveType) ||
      (downlink !== null && downlink < 2);

    if (reducedMotion || connection?.saveData || verySlowConnection) {
      const fallbackFrame = window.requestAnimationFrame(() => {
        if (active) showStaticFallback(reducedMotion ? "reduced-motion" : "network");
      });
      return () => {
        active = false;
        window.cancelAnimationFrame(fallbackFrame);
      };
    }

    const controller = new AbortController();
    mediaAbortRef.current = controller;
    skippedRef.current = false;
    const constrainedNetwork =
      connection?.effectiveType === "3g" ||
      (downlink !== null && downlink < 8) ||
      (latency !== null && latency >= 450);
    const constrainedDevice =
      window.innerWidth <= 900 ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4);

    let videoAsset = DESKTOP_VIDEO;
    if (constrainedNetwork) {
      videoAsset = LITE_VIDEO;
    } else if (constrainedDevice || (downlink !== null && downlink < 12)) {
      videoAsset = MOBILE_VIDEO;
    } else if (downlink !== null && downlink < 18) {
      videoAsset = MEDIUM_VIDEO;
    }
    mediaFrameRateRef.current = videoAsset === LITE_VIDEO ? 24 : 30;
    const preloadTimeout = constrainedNetwork
      ? SLOW_PRELOAD_TIMEOUT_MS
      : PRELOAD_TIMEOUT_MS;

    const timeout = window.setTimeout(() => {
      if (active && !skippedRef.current) showStaticFallback("timeout");
    }, preloadTimeout);

    const loadVideo = async () => {
      try {
        const blob = await fetchVideo(videoAsset, controller.signal, (progress) => {
          if (active && !skippedRef.current) setLoadProgress(progress);
        });
        if (!active || skippedRef.current) return;

        const objectUrl = URL.createObjectURL(blob);
        mediaUrlRef.current = objectUrl;
        const video = cinematicVideoRef.current;
        if (!video) throw new Error("Cinematic video element is unavailable");

        await new Promise((resolve, reject) => {
          const loaded = () => {
            video.removeEventListener("loadedmetadata", loaded);
            video.removeEventListener("error", failed);
            resolve();
          };
          const failed = () => {
            video.removeEventListener("loadedmetadata", loaded);
            video.removeEventListener("error", failed);
            reject(new Error("The cinematic video could not be decoded"));
          };
          video.addEventListener("loadedmetadata", loaded, { once: true });
          video.addEventListener("error", failed, { once: true });
          video.src = objectUrl;
          video.load();
        });

        const minimumDelay = Math.max(0, 650 - (performance.now() - started));
        if (minimumDelay) {
          await new Promise((resolve) => window.setTimeout(resolve, minimumDelay));
        }
        if (!active || skippedRef.current) return;

        window.clearTimeout(timeout);
        mediaAbortRef.current = null;
        setLoadProgress(100);
        setExperience("video");
        window.requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      } catch (error) {
        if (error?.name !== "AbortError" && active && !skippedRef.current) {
          showStaticFallback("error");
        }
      }
    };

    loadVideo();

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
      mediaAbortRef.current = null;
      if (mediaUrlRef.current) {
        URL.revokeObjectURL(mediaUrlRef.current);
        mediaUrlRef.current = null;
      }
    };
  }, [showStaticFallback]);

  useEffect(() => {
    const section = cinematicRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = cinematicVideoRef.current;
    let animationFrame = 0;
    let targetProgress = 0;
    let renderedProgress = 0;
    let springVelocity = 0;
    let lastFrameTime = performance.now();
    let desiredVideoTime = 0;
    let seekPending = false;

    const readScrollProgress = () => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      return clamp(-bounds.top / distance);
    };

    const queueVideoSeek = () => {
      if (!video?.duration || video.readyState < 1 || seekPending || video.seeking) return;
      const frameDuration = 1 / mediaFrameRateRef.current;
      if (Math.abs(video.currentTime - desiredVideoTime) < frameDuration * 0.42) return;
      seekPending = true;
      try {
        video.currentTime = desiredVideoTime;
      } catch {
        seekPending = false;
      }
    };

    const renderProgress = (progress) => {
      const reveal = smooth((progress - 0.035) / 0.18);
      const assembly = smooth((progress - 0.16) / 0.14);
      const machine = smooth((progress - 0.3) / 0.11);
      const orbit = smooth((progress - 0.4) / 0.25);
      const systems = smooth((progress - 0.68) / 0.18);
      const human = smooth((progress - 0.9) / 0.09);
      const filmOpacity = 1 - smooth((progress - 0.91) / 0.07);

      section.style.setProperty("--progress", progress.toFixed(4));
      section.style.setProperty("--reveal", reveal.toFixed(4));
      section.style.setProperty("--assembly", assembly.toFixed(4));
      section.style.setProperty("--machine", machine.toFixed(4));
      section.style.setProperty("--orbit", orbit.toFixed(4));
      section.style.setProperty("--systems", systems.toFixed(4));
      section.style.setProperty("--human", human.toFixed(4));
      section.style.setProperty("--film-opacity", filmOpacity.toFixed(4));
      section.style.setProperty("--film-scale", "1");
      section.style.setProperty(
        "--light-x",
        `${64 + Math.sin(progress * Math.PI * 2.3) * 28 - reveal * 14}%`,
      );

      const filmProgress = clamp(progress / 0.9);
      if (video?.duration && video.readyState >= 1) {
        desiredVideoTime =
          filmProgress * Math.max(0, video.duration - 1 / mediaFrameRateRef.current);
        queueVideoSeek();
      }

      let nextStage = "dark";
      if (progress >= 0.04) nextStage = "reveal";
      if (progress >= 0.18) nextStage = "disassemble";
      if (progress >= 0.36) nextStage = "rotate";
      if (progress >= 0.7) nextStage = "reassemble";
      if (progress >= 0.9) nextStage = "people";

      if (stageRef.current !== nextStage) {
        stageRef.current = nextStage;
        setStage(nextStage);
      }
    };

    const springStep = (now) => {
      animationFrame = 0;
      const deltaTime = Math.min(0.034, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      const displacement = targetProgress - renderedProgress;
      springVelocity += displacement * SPRING_STIFFNESS * deltaTime;
      springVelocity *= Math.exp(-SPRING_DAMPING * deltaTime);
      renderedProgress = clamp(renderedProgress + springVelocity * deltaTime);

      const settled =
        Math.abs(targetProgress - renderedProgress) < 0.00015 &&
        Math.abs(springVelocity) < 0.0008;
      if (settled) {
        renderedProgress = targetProgress;
        springVelocity = 0;
      }

      renderProgress(renderedProgress);
      if (!settled) animationFrame = window.requestAnimationFrame(springStep);
    };

    const requestSpringUpdate = () => {
      targetProgress = readScrollProgress();
      if (!animationFrame) {
        lastFrameTime = performance.now();
        animationFrame = window.requestAnimationFrame(springStep);
      }
    };

    const handleSeeked = () => {
      seekPending = false;
      queueVideoSeek();
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) showStaticFallback("reduced-motion");
      else requestSpringUpdate();
    };

    if (experience !== "video" || reducedMotion.matches) {
      section.dataset.motion = "reduced";
      section.style.setProperty("--progress", "0");
      section.style.setProperty("--reveal", experience === "static" ? "1" : "0");
      section.style.setProperty("--human", "0");
      section.style.setProperty("--film-opacity", "0");
      section.style.setProperty("--film-scale", "1");
      return undefined;
    }

    section.dataset.motion = "full";
    targetProgress = readScrollProgress();
    renderedProgress = targetProgress;
    renderProgress(renderedProgress);
    video?.addEventListener("seeked", handleSeeked);
    window.addEventListener("scroll", requestSpringUpdate, { passive: true });
    window.addEventListener("resize", requestSpringUpdate);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      video?.removeEventListener("seeked", handleSeeked);
      window.removeEventListener("scroll", requestSpringUpdate);
      window.removeEventListener("resize", requestSpringUpdate);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, [experience, showStaticFallback]);

  return (
    <main id="main-content" className="cinematic-page">
      <div
        className={`cinematic-loader ${experience !== "loading" ? "is-ready" : ""}`}
        aria-hidden={experience !== "loading"}
      >
        <div className="loader-mark">
          <Image src="/logo.png" alt="" width={140} height={100} priority />
        </div>
        <button
          type="button"
          className="loader-skip"
          onClick={() => showStaticFallback("manual")}
        >
          Skip animation
        </button>
        <div className="loader-readout">
          <span>Loading 2856 / 2026 machine</span>
          <strong>{String(loadProgress).padStart(3, "0")}%</strong>
        </div>
        <p className="loader-note">
          Preparing a high-detail 3D robot experience. This may take a moment
          on slower connections.
        </p>
        <div className="loader-track">
          <span style={{ width: `${loadProgress}%` }} />
        </div>
      </div>

      <section
        ref={cinematicRef}
        className={`cinematic-sequence ${experience === "static" ? "is-static" : ""}`}
        data-experience={experience}
        aria-label="2026 robot reveal"
      >
        <div className="cinematic-sticky">
          <div className="cinematic-grid" aria-hidden="true" />
          <div className="cinematic-noise" aria-hidden="true" />
          <div className="cinematic-light" aria-hidden="true" />

          <div className="machine-stage">
            <div className="machine-poster">
              <Image
                src="/cinematic/robot-static.webp"
                alt="CAD render of Planetary Drive's 2026 competition robot"
                fill
                priority
                sizes="94vw"
              />
            </div>
            <video
              ref={cinematicVideoRef}
              className="machine-frame machine-video"
              muted
              playsInline
              preload="none"
              tabIndex={-1}
              aria-label="The 2026 competition robot emerging, disassembling, rotating, and reassembling"
            />
          </div>

          {experience === "static" && (
            <div className="cinematic-static-robot">
              <HeroRobot />
            </div>
          )}

          <div className="cinematic-controls">
            {experience === "video" && (
              <button
                type="button"
                className="cinematic-skip"
                onClick={() => showStaticFallback("manual")}
              >
                Static view
              </button>
            )}
            <a className="cinematic-jump" href="#home-team">
              Skip intro <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="cinematic-copy cinematic-copy-reveal">
            <p>FRC TEAM 2856 / LEXINGTON, KENTUCKY</p>
            <h1>
              Planetary
              <span>Drive Robotics.</span>
            </h1>
            <div className="scroll-cue">
              <ArrowDown size={16} />
              <span>Scroll to meet the 2026 machine</span>
            </div>
          </div>

          <div className="cinematic-copy cinematic-copy-assembly">
            <p>01 / THE MACHINE</p>
            <h2>
              The 2026 competition robot.
              <span>Designed as one system.</span>
            </h2>
            <p className="cinematic-deck">
              Geometry, materials, wiring, and code have to work as one when
              the match clock starts.
            </p>
          </div>

          <div className="cinematic-copy cinematic-copy-orbit">
            <p>02 / THE TEAM</p>
            <h2>
              Students own the work.
              <span>Mentors guide the process.</span>
            </h2>
            <p className="cinematic-deck">
              We are a student-led high-school engineering team in Lexington,
              Kentucky. Every season, we design, fabricate, wire, program, and
              test a new competition robot.
            </p>
          </div>

          <div className="cinematic-copy cinematic-copy-systems">
            <p>03 / NOTHING HIDDEN</p>
            <h2>
              One machine.
              <span>Every system visible.</span>
            </h2>
            <Link href="/engineering" className="cinematic-link">
              Study the engineering <MoveRight size={20} />
            </Link>
          </div>

          <div className="system-index" aria-label="Robot subsystem index">
            <span>Subsystem index</span>
            <ol>
              <li><b>01</b> Drive base</li>
              <li><b>02</b> Floor intake</li>
              <li><b>03</b> Structure</li>
              <li><b>04</b> Controls</li>
              <li><b>05</b> Three-wheel shooter</li>
            </ol>
          </div>

          <div className="cinematic-chapter" aria-live="polite">
            <span>2856 / 2026</span>
            <div className="chapter-track">
              <i />
            </div>
            <strong>{stage}</strong>
          </div>

          <div className="human-threshold" aria-hidden="true">
            <span>STUDENT ENGINEERING, BUILT FOR COMPETITION.</span>
          </div>
        </div>
      </section>

      <section id="home-team" className="human-story" tabIndex={-1}>
        <div className="site-shell human-intro">
          <p className="eyebrow">THE PEOPLE BEHIND 2856</p>
          <h2>
            The team behind the 2026 robot.
            <span>Four student groups, one build season.</span>
          </h2>
          <p>
            Programming, electromechanical, business, and outreach students work
            together throughout the season. Mentors teach and supervise while
            students make the decisions, build the systems, and represent the team.
          </p>
        </div>

        <div className="human-photo-field">
          <figure className="human-photo human-photo-main">
            <Image
              src="/images/team/IMG_1664.webp"
              alt="Planetary Drive students working together on a competition robot"
              fill
              sizes="(max-width: 800px) 100vw, 64vw"
            />
            <figcaption>COMPETITION PIT / MECHANICAL INTEGRATION</figcaption>
          </figure>
          <figure className="human-photo human-photo-detail">
            <Image
              src="/images/team/IMG_5151.webp"
              alt="Planetary Drive students troubleshooting their robot at competition"
              fill
              sizes="(max-width: 800px) 82vw, 30vw"
            />
            <figcaption>TEST / DIAGNOSE / REPEAT</figcaption>
          </figure>
          <figure className="human-photo human-photo-fieldshot">
            <Image
              src="/images/team/IMG_1740.webp"
              alt="Planetary Drive robot 2856 competing on a FIRST Robotics field"
              fill
              sizes="(max-width: 800px) 100vw, 46vw"
            />
            <figcaption>TEAM 2856 / ON FIELD</figcaption>
          </figure>
          <div className="human-photo-statement">
            <span>01 / PEOPLE</span>
            <p>Learn by contributing to something that has to work.</p>
          </div>
        </div>
      </section>

      <section className="season-loop">
        <div className="site-shell season-heading">
          <p className="eyebrow">THE SEASON MOVES FAST</p>
          <h2>
            <span>From kickoff</span>
            <span>to the competition</span>
            <span>field.</span>
          </h2>
        </div>
        <div className="season-marquee" aria-label="Team workflow">
          <span>STRATEGY</span><i />
          <span>CAD</span><i />
          <span>FABRICATION</span><i />
          <span>WIRING</span><i />
          <span>PROGRAMMING</span><i />
          <span>TESTING</span><i />
          <span>ITERATION</span>
        </div>
        <div className="site-shell season-grid">
          <div>
            <span>01</span>
            <h3>Understand the game</h3>
            <p>Read the rules, study how points are scored, and decide what the robot must do well.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Make the machine</h3>
            <p>Turn strategy into CAD, parts, wiring, software, and a robot that can take the field.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Find the next problem</h3>
            <p>Run it, break it, repair it, and learn what the next revision needs to become.</p>
          </div>
        </div>
      </section>

      <section className="home-pathways">
        <div className="site-shell">
          <div className="pathways-heading">
            <p className="eyebrow">CHOOSE A PATH</p>
            <h2>Explore Team 2856.</h2>
          </div>
          <div className="editorial-links">
            {pathways.map((item) => (
              <Link href={item.href} className="editorial-link" key={item.href}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-sponsor-band">
        <div className="site-shell sponsor-band-heading">
          <div>
            <p className="eyebrow">POWERED BY COMMUNITY</p>
            <h2>Sponsors fund the parts, tools, registration, and travel behind the season.</h2>
          </div>
          <Link href="/sponsors" className="cinematic-link dark-link">
            Meet our sponsors <MoveRight size={20} />
          </Link>
        </div>
        <div className="sponsor-tape">
          {sponsors.map((sponsor) => (
            <a href={sponsor.website} target="_blank" rel="noreferrer" key={sponsor.name}>
              <Image src={sponsor.logo} alt={sponsor.name} width={190} height={72} />
            </a>
          ))}
        </div>
      </section>

      <section className="home-final-action">
        <div className="final-action-orbit" aria-hidden="true" />
        <div className="site-shell final-action-grid">
          <div>
            <p className="eyebrow">YOUR NEXT MOVE</p>
            <h2>Join the team.</h2>
            <p>Students can start without prior robotics experience.</p>
            <Link href="/join" className="button button-light">
              Join Team 2856 <ArrowRight size={18} />
            </Link>
          </div>
          <div>
            <p className="eyebrow">BACK THE WORK</p>
            <h2>Support the team.</h2>
            <p>Sponsors help make parts, tools, registration, and travel possible.</p>
            <Link href="/sponsors" className="button button-light-outline">
              Sponsor Planetary Drive <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

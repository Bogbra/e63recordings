"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { onSmoothScrollPause, onSmoothScrollResume } from "./smoothScrollControl";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const removePauseListener = onSmoothScrollPause(() => lenis.stop());
    const removeResumeListener = onSmoothScrollResume(() => lenis.start());

    return () => {
      gsap.ticker.remove(tick);
      removePauseListener();
      removeResumeListener();
      lenis.destroy();
    };
  }, []);

  return null;
}

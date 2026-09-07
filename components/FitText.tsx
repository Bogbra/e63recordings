"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

type FitTextProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function FitText({ href, className, children }: FitTextProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      text.style.fontSize = "";
      const containerWidth = container.clientWidth;
      const textWidth = text.scrollWidth;
      if (!textWidth || !containerWidth) return;
      const currentSize = parseFloat(getComputedStyle(text).fontSize);
      text.style.fontSize = `${(containerWidth / textWidth) * currentSize}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <a ref={containerRef} className={className} href={href}>
      <span ref={textRef} className="fitText">
        {children}
      </span>
    </a>
  );
}

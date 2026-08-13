/* ============================================================
   ScrollReveal.js — Wrapper component
   Wraps any element and animates it when it scrolls into view.
   Props:
   - delay: 1–6 (stagger index for cards in a row)
   - className: extra classes for the wrapper div
   ============================================================ */

"use client";

import useInView from "@/hooks/useInView";

export default function ScrollReveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  const delayClass = delay ? `scroll-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${inView ? `scroll-visible ${delayClass}` : "scroll-hidden"} ${className}`}
    >
      {children}
    </div>
  );
}

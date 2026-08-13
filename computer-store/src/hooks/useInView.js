/* ============================================================
   useInView.js — Custom hook
   Returns a ref and a boolean `inView`.
   When the element enters the viewport, inView becomes true.
   Used to trigger scroll animations.
   ============================================================ */

import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); /* Animate only once */
        }
      },
      { threshold: 0.12, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

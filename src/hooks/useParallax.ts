import { useEffect, useRef } from "react";

/**
 * Subtle scroll-linked parallax. The transform is written directly to the
 * element so the page does not re-render on every scroll frame.
 */
export function useParallax<T extends HTMLElement>(strength = 7) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // A value between roughly -1 and 1 depending on where the element sits.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      element.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}%, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return ref;
}

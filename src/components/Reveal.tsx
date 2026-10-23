import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type RevealVariant = "up" | "left" | "right" | "scale";

const VARIANT_CLASSES: Record<RevealVariant, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", VARIANT_CLASSES[variant], className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

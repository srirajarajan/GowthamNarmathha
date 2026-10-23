import { useEffect, useRef, useState } from "react";
import { useAmbience } from "@/hooks/useAmbience";
import { EVENT, NAV_LINKS } from "@/lib/event";
import { cn } from "@/utils/cn";
import { Icon, Monogram } from "./Ornaments";

export function Nav({ onReplay }: { onReplay: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const frame = useRef(0);
  const { enabled: soundOn, toggle: toggleSound } = useAmbience();

  useEffect(() => {
    const update = () => {
      frame.current = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, Math.max(0, y / height)) : 0);
    };

    const onScroll = () => {
      if (!frame.current) frame.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (section): section is HTMLElement => section !== null,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const replay = () => {
    setMenuOpen(false);
    onReplay();
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-champagne/25 bg-ivory/92 shadow-[0_12px_40px_-28px_rgba(72,48,20,0.5)] backdrop-blur-md"
            : "bg-gradient-to-b from-ivory/90 via-ivory/55 to-transparent",
        )}
      >
        <div className="h-[2px] w-full bg-transparent" aria-hidden="true">
          <div
            className="h-full origin-left bg-gradient-to-r from-antique via-champagne to-champagne-light transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[84px] lg:px-10">
          <a href="#home" className="group flex items-center gap-3" aria-label="Gowtham and Narmaththa — home">
            <Monogram className="h-10 w-10 text-[9.5px] transition-transform duration-500 group-hover:-rotate-6 sm:h-11 sm:w-11 sm:text-[10px]" />
            <span className="flex flex-col">
              <span className="whitespace-nowrap font-display text-[13.5px] uppercase leading-none tracking-[0.14em] text-charcoal sm:text-[16px] sm:tracking-[0.16em]">
                Gowtham <span className="font-script text-[1.15em] normal-case text-champagne">&amp;</span> Narmaththa
              </span>
              <span className="mt-1 text-[8px] uppercase tracking-[0.28em] text-ink-soft sm:text-[8.5px]">
                19 Nov 2026 · Salem
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "relative py-2 text-[10px] uppercase tracking-[0.21em] transition-colors duration-300",
                  active === link.id ? "text-antique" : "text-ink/80 hover:text-antique",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rotate-45 border border-current transition-all duration-300",
                    active === link.id ? "opacity-100" : "opacity-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Turn ambient sound off" : "Turn ambient sound on"}
              title={soundOn ? "Ambient sound on" : "Ambient sound off"}
              className={cn(
                "hidden h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 sm:inline-flex",
                soundOn
                  ? "border-antique/60 bg-antique/10 text-antique"
                  : "border-champagne/35 text-ink/70 hover:border-antique/60 hover:text-antique",
              )}
            >
              {soundOn ? (
                <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
                  {[0, 1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className="sound-bar block w-[2px] rounded-full bg-current"
                      style={{ height: `${[9, 14, 7, 12][bar]}px`, animationDelay: `${bar * 0.14}s` }}
                    />
                  ))}
                </span>
              ) : (
                <Icon name="music" className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={replay}
              title="Replay the opening invitation"
              className="hidden items-center gap-2 border border-antique/40 px-4 py-2.5 text-[9.5px] uppercase tracking-[0.22em] text-antique transition-all duration-300 hover:bg-antique hover:text-ivory md:inline-flex"
            >
              <Icon name="envelope" className="h-3.5 w-3.5" />
              Replay Intro
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 text-antique transition-colors hover:bg-ivory-deep lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="menu-panel fixed inset-0 z-[85] flex flex-col overflow-y-auto bg-ivory lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-champagne/25 px-5 py-5">
            <div className="flex items-center gap-3">
              <Monogram className="h-10 w-10 text-[9.5px]" />
              <div>
                <p className="font-display text-base uppercase tracking-[0.14em] text-charcoal">
                  Gowtham <span className="font-script text-[1.15em] normal-case text-champagne">&amp;</span> Narmaththa
                </p>
                <p className="mt-0.5 text-[8px] uppercase tracking-[0.28em] text-ink-soft">
                  Wedding Reception · 2026
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              autoFocus
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 text-antique"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6 py-8" aria-label="Mobile navigation">
            <ul>
              {NAV_LINKS.map((link, index) => (
                <li key={link.id} className="menu-item border-b border-champagne/20" style={{ animationDelay: `${index * 55}ms` }}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="font-display text-[2rem] leading-none text-charcoal transition-colors group-hover:text-antique">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-antique/70">
                      0{index + 1}
                      <Icon name="arrow-up-right" className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="menu-item mt-8 grid gap-3" style={{ animationDelay: "310ms" }}>
              <button type="button" onClick={replay} className="btn-gold w-full">
                <Icon name="envelope" className="h-4 w-4" />
                Replay the Opening
              </button>
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={soundOn}
                className="btn-outline w-full"
              >
                <Icon name={soundOn ? "pause" : "music"} className="h-4 w-4" />
                {soundOn ? "Pause ambience" : "Play ambience"}
              </button>
            </div>
          </nav>

          <div className="border-t border-champagne/25 px-6 py-6 text-center">
            <p className="font-script text-2xl text-antique">Two hearts, one beautiful journey</p>
            <p className="mt-2 text-[9px] uppercase leading-relaxed tracking-[0.24em] text-ink-soft">
              Thursday, 19 November 2026 · 6:00 PM onwards
              <br />
              {EVENT.venue}, Salem
            </p>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { EVENT, IMAGES } from "@/lib/event";
import { cn } from "@/utils/cn";
import { Flourish, Icon, Petals } from "./Ornaments";

export function OpeningScreen({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<number | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    shellRef.current?.focus({ preventScroll: true });
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = shellRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === first || activeElement === shellRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeElement === last || activeElement === shellRef.current)) {
      event.preventDefault();
      first.focus();
    }
  };

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    timer.current = window.setTimeout(onEnter, 1900);
  };

  return (
    <div
      ref={shellRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of ${EVENT.couple}`}
      aria-busy={opening}
      onKeyDown={handleKeyDown}
      className={cn(
        "intro-shell fixed inset-0 z-[150] overflow-y-auto overscroll-contain bg-[#1f1914] outline-none",
        opening && "is-opening",
      )}
    >
      <button
        type="button"
        onClick={onEnter}
        tabIndex={opening ? -1 : undefined}
        className={cn(
          "fixed right-3 top-3 z-50 rounded-full border border-ivory/25 bg-[#1a1410]/60 px-3.5 py-2 text-[8px] uppercase tracking-[0.24em] text-ivory/70 backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne-light sm:right-5 sm:top-5",
          opening && "pointer-events-none opacity-0",
        )}
      >
        Skip intro
      </button>
      {/* Cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={IMAGES.hero.src}
          alt=""
          className="intro-photo h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-[radial-gradient(78%_72%_at_52%_42%,rgba(78,58,38,0.22)_0%,rgba(31,25,20,0.88)_58%,#1b1611_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#17120e] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#17120e] to-transparent" />
      </div>

      <Petals className="opacity-70" />

      <div className="relative flex min-h-[100svh] items-center justify-center px-3 py-6 sm:px-6 sm:py-10">
        <div className="envelope-stage relative w-full max-w-[1030px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 border border-champagne/20 sm:-inset-3"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 hidden border border-champagne/10 sm:-inset-4 md:block"
          />

          <div className="intro-card relative grid overflow-hidden border border-champagne/40 bg-ivory shadow-[0_55px_130px_-30px_rgba(0,0,0,0.85)] lg:grid-cols-[1.02fr_0.98fr]">
            {/* Envelope flap */}
            <div className="envelope-flap" aria-hidden="true" />
            <button
              type="button"
              onClick={openInvitation}
              disabled={opening}
              aria-label="Open the invitation"
              title="Open the invitation"
              className="envelope-seal absolute left-1/2 top-[54px] z-40 flex h-14 w-14 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#c69a51_0%,#a1742f_44%,#75501b_100%)] text-ivory shadow-[0_10px_20px_-8px_rgba(52,35,12,0.9),inset_0_1px_2px_rgba(255,247,233,0.4)] transition-shadow hover:shadow-[0_14px_28px_-8px_rgba(52,35,12,0.95)] lg:top-[104px] lg:h-[68px] lg:w-[68px]"
            >
              <span aria-hidden="true" className="absolute inset-[5px] rounded-full border border-ivory/30" />
              <span aria-hidden="true" className="font-display text-lg leading-none tracking-wide lg:text-xl">
                G<span className="mx-0.5 font-script text-[0.7em]">&amp;</span>N
              </span>
            </button>

            {/* Invitation copy */}
            <div className="relative z-10 flex flex-col items-center px-5 pb-9 pt-[132px] text-center sm:px-9 sm:pt-[140px] lg:px-10 lg:pb-12 lg:pt-[200px]">
              <div className="relative shrink-0">
                <span className="block h-[74px] w-[74px] overflow-hidden rounded-full border border-champagne/55 bg-ivory p-[3px] shadow-sm lg:h-[86px] lg:w-[86px]">
                  <img
                    src={IMAGES.traditional.src}
                    alt={`${EVENT.groom} and ${EVENT.bride}`}
                    className="image-warm h-full w-full rounded-full object-cover object-[50%_8%]"
                  />
                </span>
                <span className="absolute -bottom-1 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-champagne/50 bg-ivory font-display text-[8px] leading-none text-antique shadow-sm lg:h-8 lg:w-8 lg:text-[9px]">
                  G<span className="mx-0.5 font-script">&amp;</span>N
                </span>
              </div>

              <p className="label-caps mt-5 text-[9px] text-antique sm:text-[10px]">
                Together with our families
              </p>
              <p className="label-caps mt-2 text-[8px] text-ink-soft sm:text-[9px]">
                We invite you to celebrate
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.35rem,7.2vw,3.5rem)] leading-[0.98] text-charcoal">
                <span className="block">{EVENT.groom}</span>
                <span className="my-1.5 flex items-center justify-center gap-3 lg:my-2">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-champagne/70" />
                  <span className="font-script text-[0.62em] leading-none text-champagne">&amp;</span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-champagne/70" />
                </span>
                <span className="block">{EVENT.bride}</span>
              </h1>

              <p className="mt-3 font-script text-[clamp(1.3rem,3.6vw,1.75rem)] text-antique">
                Two Hearts, One Beautiful Journey
              </p>

              <Flourish className="mt-4 h-4 w-40 text-champagne/80" />

              <button
                type="button"
                onClick={openInvitation}
                disabled={opening}
                className="btn-gold group mt-6 w-full max-w-[300px] disabled:cursor-wait disabled:opacity-90"
              >
                <Icon name="envelope" className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
                {opening ? "Opening the invitation" : "Open Invitation"}
              </button>

              <div className="mt-5 flex flex-col items-center gap-1.5">
                <p className="text-[9.5px] uppercase tracking-[0.24em] text-ink-soft sm:text-[10px]">
                  19 November 2026 · 6:00 PM onwards
                </p>
                <p className="text-[9px] uppercase tracking-[0.22em] text-antique/90 sm:text-[10px]">
                  {EVENT.venue} · Salem
                </p>
              </div>

              <span className="sr-only" aria-live="polite">
                {opening ? "Opening the invitation." : ""}
              </span>
            </div>

            {/* Photograph */}
            <div className="relative min-h-[290px] overflow-hidden border-t border-champagne/25 sm:min-h-[350px] lg:min-h-full lg:border-l lg:border-t-0">
              <img
                src={IMAGES.hero.src}
                alt={IMAGES.hero.alt}
                className="intro-photo image-warm h-full w-full object-cover object-[50%_28%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241c15]/85 via-[#241c15]/10 to-[#241c15]/15" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-script text-2xl text-champagne-light sm:text-[1.7rem]">
                      Our forever begins
                    </p>
                    <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.3em] text-ivory/70">
                      Gowtham &amp; Narmaththa
                    </p>
                  </div>
                  <span className="hidden shrink-0 border-l border-ivory/25 pl-4 text-right text-[8px] uppercase tracking-[0.24em] leading-relaxed text-ivory/60 sm:block">
                    A keepsake
                    <br />
                    of love
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-ivory/25 bg-[#241c15]/35 px-3 py-1.5 text-[8px] uppercase tracking-[0.24em] text-ivory/80 backdrop-blur-sm">
                Salem · Tamil Nadu
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[8.5px] uppercase tracking-[0.3em] text-champagne-light/55 sm:text-[9px]">
            An invitation of love · 2026
          </p>
        </div>
      </div>
    </div>
  );
}

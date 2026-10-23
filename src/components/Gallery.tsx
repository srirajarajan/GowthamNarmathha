import { useCallback, useEffect, useState } from "react";
import { EVENT, GALLERY } from "@/lib/event";
import { cn } from "@/utils/cn";
import { Flourish, Icon, Monogram } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const showNext = useCallback(() => {
    setActive((current) => (current === null ? null : (current + 1) % GALLERY.length));
  }, []);
  const showPrevious = useCallback(() => {
    setActive((current) => (current === null ? null : (current - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (active === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, showNext, showPrevious]);

  const current = active === null ? null : GALLERY[active];

  return (
    <section id="gallery" className="relative overflow-hidden bg-charcoal py-20 text-ivory sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_20%_0%,rgba(196,154,82,0.16),transparent_65%),radial-gradient(60%_50%_at_95%_100%,rgba(233,199,190,0.10),transparent_65%)]" />
        <div className="film-grain absolute inset-0 opacity-[0.09]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
        <span className="absolute -right-10 top-24 select-none font-script text-[22vw] leading-none text-ivory/[0.025]">
          love
        </span>
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-7 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <Monogram tone="light" className="h-12 w-12 text-[10px]" />
          <p className="label-caps mt-5 text-[9px] text-champagne-light">Moments In Frame</p>
          <h2 className="display-title mt-4 text-[clamp(2.3rem,5.5vw,3.9rem)] text-ivory">
            A Glimpse of Forever
          </h2>
          <p className="mt-4 max-w-[480px] font-display text-lg italic leading-relaxed text-ivory/60 sm:text-xl">
            A few frames from the story we are so happy to share with you.
          </p>
          <Flourish className="mt-5 h-4 w-44 text-champagne/70" />
        </Reveal>

        <Reveal delay={100} className="mt-12 sm:mt-14">
          <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
            {GALLERY.map((item, index) => (
              <div key={item.caption} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Open photograph: ${item.caption}`}
                  className="group relative block w-full overflow-hidden text-left"
                >
                  <div className={cn("relative w-full overflow-hidden bg-charcoal-soft", item.aspect)}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "image-cinematic h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]",
                        item.position,
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17120e]/85 via-[#17120e]/5 to-[#17120e]/25 transition-opacity duration-500 group-hover:from-[#17120e]/90" />
                    <span className="absolute right-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-ivory/35 bg-charcoal/35 text-ivory opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:h-9 sm:w-9">
                      <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                    </span>
                    <span className="absolute left-3 top-3 text-[8px] uppercase tracking-[0.26em] text-ivory/65 sm:left-4 sm:top-4">
                      0{index + 1}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                      <p className="text-[7px] uppercase tracking-[0.28em] text-champagne-light/90 sm:text-[7.5px]">
                        {item.tag}
                      </p>
                      <p className="mt-1.5 font-display text-[1.05rem] leading-tight text-ivory sm:text-xl">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <p className="font-script text-[1.4rem] text-champagne-light">Every frame, a little more love</p>
          <span aria-hidden="true" className="hidden h-4 w-px bg-champagne/30 sm:block" />
          <p className="text-[8px] uppercase tracking-[0.26em] text-ivory/45">
            {EVENT.dateShort} · Salem, Tamil Nadu
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      {current !== null && active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="lightbox-panel fixed inset-0 z-[120] flex flex-col bg-[#18130f]/97 backdrop-blur-lg"
          onClick={close}
        >
          <div
            className="flex items-center justify-between border-b border-ivory/10 px-4 py-4 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Monogram tone="light" className="h-9 w-9 text-[8px]" />
              <div>
                <p className="font-display text-sm uppercase tracking-[0.2em] text-ivory">
                  Moments in frame
                </p>
                <p className="mt-0.5 text-[7.5px] uppercase tracking-[0.26em] text-ivory/45">
                  {String(active + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory/80 transition-colors hover:border-champagne/60 hover:text-champagne-light"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-3 py-5 sm:px-16 sm:py-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photograph"
              className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/40 text-ivory/80 backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne-light sm:left-5 sm:h-12 sm:w-12"
            >
              <Icon name="chevron-left" className="h-5 w-5" />
            </button>

            <figure key={active} className="lightbox-image flex max-h-full max-w-[1000px] flex-col items-center">
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[62svh] w-auto max-w-full border border-champagne/20 object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:max-h-[68svh]"
              />
              <figcaption className="mt-5 max-w-[540px] text-center">
                <p className="text-[7.5px] uppercase tracking-[0.3em] text-champagne-light/80">
                  {current.tag}
                </p>
                <p className="mt-2 font-display text-xl text-ivory sm:text-2xl">{current.caption}</p>
                <p className="mt-2 font-script text-lg text-ivory/45">Gowtham &amp; Narmathha</p>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/40 text-ivory/80 backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne-light sm:right-5 sm:h-12 sm:w-12"
            >
              <Icon name="chevron-right" className="h-5 w-5" />
            </button>
          </div>

          <p className="border-t border-ivory/10 px-4 py-4 text-center text-[7.5px] uppercase tracking-[0.26em] text-ivory/35">
            Use arrow keys to explore · Press Esc to close
          </p>
        </div>
      )}
    </section>
  );
}

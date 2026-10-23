import type { CSSProperties } from "react";
import { EVENT, IMAGES } from "@/lib/event";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/utils/cn";
import { BotanicalSprig, CornerBloom, Flourish, Icon, Monogram } from "./Ornaments";

export function Hero({ ready }: { ready: boolean }) {
  const photoRef = useParallax<HTMLDivElement>(5);

  const rise = (delay: number): CSSProperties =>
    ready
      ? { animation: `fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` }
      : { opacity: 0 };

  return (
    <section id="home" aria-label={`${EVENT.couple} wedding reception`} className="paper relative overflow-hidden">
      {/* Warm atmospheric light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[75vh] w-[60vw] rounded-full bg-blush/25 blur-[110px]" />
        <div className="absolute -left-32 bottom-10 h-[46vh] w-[42vw] rounded-full bg-champagne/15 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory/80 to-transparent" />
        <BotanicalSprig className="absolute -left-4 top-[30%] hidden h-72 w-36 rotate-[18deg] opacity-35 md:block" />
        <BotanicalSprig className="absolute right-3 top-[14%] hidden h-44 w-24 -rotate-[24deg] opacity-25 xl:block" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 pb-16 pt-[88px] sm:gap-9 sm:px-8 sm:pt-28 lg:min-h-[100svh] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10 lg:px-10 lg:pb-24 lg:pt-32 xl:gap-16">
        {/* Editorial image composition */}
        <div className="order-1 mx-auto w-full max-w-[490px] lg:order-2 lg:max-w-[535px]">
          <div className="relative" style={rise(280)}>
            <div
              aria-hidden="true"
              className="arch absolute -inset-2.5 border border-champagne/35 sm:-inset-3"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 arch border border-champagne/10 sm:-inset-5"
            />
            <CornerBloom className="absolute -left-12 -top-10 z-20 hidden h-40 w-40 text-champagne/70 lg:block xl:h-48 xl:w-48" />
            <CornerBloom className="absolute -bottom-12 -right-12 z-20 hidden h-36 w-36 -scale-100 text-blush lg:block" />
            <div className="arch relative h-[44svh] min-h-[300px] max-h-[480px] overflow-hidden border border-champagne/55 bg-ivory-deep shadow-luxe sm:h-[54svh] sm:max-h-[560px] lg:h-[66vh] lg:max-h-[660px]">
              <div ref={photoRef} className="absolute inset-x-0 -inset-y-[8%]">
                <img
                  src={IMAGES.hero.src}
                  alt={IMAGES.hero.alt}
                  fetchPriority="high"
                  className="kenburns image-warm h-full w-full object-cover object-[50%_26%]"
                />
              </div>
              <div className="absolute inset-0 image-overlay" aria-hidden="true" />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                <span className="rounded-full border border-ivory/30 bg-charcoal/25 px-3 py-1.5 text-[8px] uppercase tracking-[0.3em] text-ivory/90 backdrop-blur-sm">
                  Salem · Tamil Nadu
                </span>
                <Monogram tone="ink" className="h-11 w-11 bg-charcoal/10 text-[9px] backdrop-blur-sm sm:h-12 sm:w-12" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <Flourish className="mb-4 h-4 w-32 text-champagne-light/80" />
                <p className="font-script text-[1.65rem] leading-tight text-champagne-light sm:text-[1.9rem]">
                  A love, beautifully begun
                </p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-[8px] uppercase tracking-[0.32em] text-ivory/75">
                    Gowtham &amp; Narmaththa
                  </p>
                  <p className="text-[8px] uppercase tracking-[0.28em] text-ivory/60">19 · 11 · 2026</p>
                </div>
              </div>
            </div>

            {/* Floating memory */}
            <div className="absolute -bottom-10 -left-5 hidden w-[128px] rotate-[-7deg] border border-champagne/30 bg-ivory p-1.5 shadow-frame sm:block xl:-left-10 xl:w-[146px]">
              <div className="overflow-hidden">
                <img
                  src={IMAGES.car.src}
                  alt={IMAGES.car.alt}
                  loading="lazy"
                  className="image-cinematic aspect-[3/4] w-full object-cover"
                />
              </div>
              <p className="px-1 pb-1 pt-2 text-center font-script text-base leading-none text-antique">
                us, always
              </p>
            </div>

            <div className="float-soft absolute -right-3 top-16 hidden rounded-full border border-champagne/25 bg-ivory/90 px-3 py-2 text-[7.5px] uppercase tracking-[0.26em] text-antique shadow-sm backdrop-blur-sm sm:block">
              With love
            </div>
          </div>
        </div>

        {/* Invitation typography */}
        <div className="order-2 text-left lg:order-1">
          <div style={rise(80)} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-antique/70 sm:w-12" />
            <p className="label-caps text-[8.5px] text-antique sm:text-[10px]">
              The wedding celebration of
            </p>
          </div>

          <h1
            style={rise(180)}
            className="mt-5 font-display text-[clamp(2.7rem,7.6vw,5.15rem)] font-light uppercase leading-[0.92] tracking-[0.035em] text-charcoal sm:mt-6 lg:text-[clamp(3rem,6vw,5.15rem)]"
          >
            <span className="block">Gowtham</span>
            <span className="my-2 flex items-center gap-4 sm:my-3 sm:gap-5">
              <span aria-hidden="true" className="h-px w-12 bg-gradient-to-r from-transparent to-champagne sm:w-20" />
              <span className="font-script text-[0.66em] normal-case leading-none text-champagne">&amp;</span>
              <span aria-hidden="true" className="h-px w-12 bg-gradient-to-l from-transparent to-champagne sm:w-20" />
            </span>
            <span className="block">Narmaththa</span>
          </h1>

          <p
            style={rise(320)}
            className="mt-5 font-script text-[clamp(1.5rem,3.6vw,2.1rem)] leading-snug text-antique sm:mt-6"
          >
            Two Hearts. One Beautiful Journey.
          </p>

          <div style={rise(430)} className="mt-6 max-w-[470px] sm:mt-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-champagne/30 py-4 sm:py-5">
              <p className="font-display text-[1.45rem] uppercase leading-none tracking-[0.09em] text-charcoal sm:text-[1.65rem]">
                19 November 2026
              </p>
              <span aria-hidden="true" className="hidden h-9 w-px bg-champagne/35 sm:block" />
              <p className="text-[9.5px] uppercase leading-relaxed tracking-[0.22em] text-ink-soft sm:text-[10px]">
                Wedding Reception
                <br />
                <span className="text-antique">6:00 PM onwards</span>
              </p>
            </div>
            <p className="mt-4 flex items-center gap-2.5 text-[9.5px] uppercase tracking-[0.2em] text-ink-soft sm:text-[10px]">
              <Icon name="pin" className="h-3.5 w-3.5 text-champagne" />
              {EVENT.venue} · {EVENT.cityRegion}
            </p>
          </div>

          <div style={rise(560)} className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <a href="#invitation" className="btn-gold group w-full sm:w-auto">
              <Icon name="envelope" className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
              Open Invitation
            </a>
            <a
              href="#story"
              className="group inline-flex items-center gap-3 text-[9.5px] uppercase tracking-[0.25em] text-ink/80 transition-colors hover:text-antique"
            >
              <span className="relative">
                Our Story
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-antique/50 transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <Icon name="arrow-right" className="h-4 w-4 text-antique transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 hidden justify-center pb-7 lg:flex">
        <a
          href="#story"
          aria-label="Scroll to our story"
          className="group flex flex-col items-center gap-2.5 text-[8px] uppercase tracking-[0.32em] text-ink-soft transition-colors hover:text-antique"
        >
          Scroll to discover
          <span aria-hidden="true" className="scroll-line relative block h-9 w-px overflow-hidden bg-champagne/20" />
        </a>
      </div>

      <div className="relative z-10 border-t border-champagne/20 bg-ivory/50">
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 text-[8px] uppercase tracking-[0.28em] text-ink-soft sm:text-[8.5px]",
          )}
        >
          <span>A celebration of love</span>
          <span aria-hidden="true" className="h-1 w-1 rotate-45 border border-champagne" />
          <span>19 · 11 · 2026</span>
          <span aria-hidden="true" className="h-1 w-1 rotate-45 border border-champagne" />
          <span>{EVENT.venue}, Salem</span>
        </div>
      </div>
    </section>
  );
}

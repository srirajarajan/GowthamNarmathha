import type { CSSProperties } from "react";
import { useParallax } from "@/hooks/useParallax";
import { TIMELINE } from "@/lib/event";
import { cn } from "@/utils/cn";
import { BotanicalSprig, Flourish, Icon } from "./Ornaments";
import { Reveal } from "./Reveal";

function StoryChapter({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
}) {
  const photoRef = useParallax<HTMLDivElement>(index === 1 ? -5 : 6);
  const imageFirst = index % 2 === 0;

  return (
    <article className="relative grid grid-cols-1 gap-9 lg:grid-cols-12 lg:items-center lg:gap-10">
      <Reveal
        variant={imageFirst ? "right" : "left"}
        className={cn(
          "relative",
          imageFirst ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6",
        )}
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -inset-2 border border-champagne/25 sm:-inset-3",
              imageFirst ? "translate-x-2 translate-y-2" : "-translate-x-2 translate-y-2",
            )}
          />
          <div className="relative overflow-hidden border border-champagne/35 bg-ivory-deep shadow-frame">
            <div className={cn("relative w-full overflow-hidden", item.aspect)}>
              <div ref={photoRef} className="absolute inset-x-0 -inset-y-[7%]">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  loading="lazy"
                  decoding="async"
                  className={cn("image-warm h-full w-full object-cover", item.position)}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#231b14]/80 via-[#231b14]/10 to-[#231b14]/20" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-ivory/25 bg-[#231b14]/30 px-3 py-1.5 backdrop-blur-sm sm:left-5 sm:top-5">
                <span className="h-1 w-1 rotate-45 bg-champagne-light" />
                <span className="text-[8px] uppercase tracking-[0.28em] text-ivory/90">
                  0{index + 1} · {item.chapter}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="font-script text-[1.65rem] leading-tight text-champagne-light sm:text-[1.9rem]">
                  {item.imageCaption}
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className={cn(
              "absolute -bottom-6 hidden items-center gap-2 border border-champagne/25 bg-ivory px-4 py-2.5 shadow-sm sm:flex",
              imageFirst ? "-right-3" : "-left-3",
            )}
          >
            <Icon name="heart" className="h-3.5 w-3.5 text-champagne" />
            <span className="text-[8px] uppercase tracking-[0.26em] text-ink-soft">A memory kept</span>
          </div>
        </div>
      </Reveal>

      <Reveal
        variant="up"
        delay={120}
        className={cn(
          "relative lg:col-span-4",
          imageFirst ? "lg:col-start-9" : "lg:col-start-1 lg:row-start-1",
        )}
      >
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-10 font-display text-[5.5rem] leading-none text-champagne/15 sm:text-[7rem] lg:-right-6 lg:-top-16 lg:text-[8rem]"
          >
            0{index + 1}
          </span>
          <div className="relative">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-antique/60" />
              <p className="label-caps text-[8.5px] text-antique">{item.chapter}</p>
            </div>
            <h3 className="mt-4 max-w-[360px] font-display text-[2.15rem] leading-[1.02] text-charcoal sm:text-[2.5rem]">
              {item.title}
            </h3>
            <p className="body-copy mt-4 max-w-[380px] text-[13.5px] leading-[1.9] sm:text-[14.5px]">
              {item.copy}
            </p>
            <Flourish className="mt-6 h-4 w-40 text-champagne/80" />
            <p className="mt-3 max-w-[340px] font-script text-[1.35rem] leading-snug text-antique">
              {item.note}
            </p>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export function Story() {
  const sparkleStyle: CSSProperties = { animationDelay: "1.4s" };

  return (
    <section id="story" className="paper relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <BotanicalSprig className="absolute -right-2 top-16 h-72 w-32 rotate-[28deg] opacity-30 sm:h-80 sm:w-40" />
        <span className="absolute -left-28 top-[38%] h-72 w-72 rounded-full border border-champagne/15" />
        <span className="absolute -left-20 top-[42%] h-52 w-52 rounded-full border border-champagne/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="label-caps text-[9px] text-antique">Our Story</p>
          <h2 className="display-title mt-4 text-[clamp(2.55rem,5.8vw,4.35rem)] text-charcoal">
            A Beautiful Journey
          </h2>
          <p className="mt-4 font-display text-[1.15rem] italic leading-relaxed text-ink-soft sm:text-[1.3rem]">
            Every moment brought us closer to forever.
          </p>
          <Flourish className="mx-auto mt-5 h-4 w-44" />
        </Reveal>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24 lg:mt-24 lg:space-y-28">
          {TIMELINE.map((item, index) => (
            <StoryChapter key={item.title} item={item} index={index} />
          ))}
        </div>

        <Reveal className="relative mx-auto mt-20 max-w-[780px] text-center sm:mt-24">
          <div className="pointer-events-none absolute inset-x-4 -top-8 mx-auto max-w-[480px] border-t border-champagne/25" />
          <span className="font-display text-6xl leading-none text-champagne/30" aria-hidden="true">
            &ldquo;
          </span>
          <p className="relative -mt-6 font-display text-[1.55rem] italic leading-[1.5] text-charcoal sm:text-[2rem] lg:text-[2.2rem]">
            Some stories aren&rsquo;t written in words. They are felt in every quiet moment, every shared smile, every tomorrow.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-champagne/50" />
            <p className="label-caps text-[8px] text-antique">A journey to forever</p>
            <span aria-hidden="true" className="h-px w-10 bg-champagne/50" />
          </div>
          <span
            aria-hidden="true"
            style={sparkleStyle}
            className="float-soft-slow absolute -right-2 top-1/2 hidden h-1.5 w-1.5 rotate-45 bg-champagne/60 sm:block"
          />
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { EVENT, eventTimestamp } from "@/lib/event";
import { Flourish, MiniDivider, Monogram } from "./Ornaments";
import { Reveal } from "./Reveal";

function getRemaining(now: number) {
  const distance = Math.max(0, eventTimestamp - now);
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export function Countdown() {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = getRemaining(now);
  const hasPassed = eventTimestamp - now <= 0;

  const istTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: EVENT.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <section id="countdown" className="paper relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-1/2 top-1/2 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/15 sm:block" />
        <span className="absolute left-1/2 top-1/2 hidden h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/10 sm:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1080px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="label-caps text-[9px] text-antique">The Wait Is Almost Over</p>
          <h2 className="display-title mt-4 text-[clamp(2.3rem,5.5vw,3.9rem)] text-charcoal">
            Counting Down to Forever
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] text-[9px] uppercase leading-relaxed tracking-[0.24em] text-ink-soft">
            Thursday, 19 November 2026
            <br />
            <span className="text-antique">6:00 PM onwards · {EVENT.venue}, Salem</span>
          </p>
          <Flourish className="mx-auto mt-5 h-4 w-44" />
        </Reveal>

        <p className="sr-only">
          Countdown to the wedding reception of Gowtham and Narmaththa on Thursday, 19 November 2026 at 6:00 PM
          India Standard Time, at Sri Adithya Mahal, Salem.
        </p>

        {hasPassed ? (
          <Reveal className="relative mx-auto mt-12 max-w-[720px] rounded-sm border-y border-champagne/30 px-5 py-12 sm:px-10 sm:py-14">
            <Monogram className="mx-auto h-14 w-14 text-[11px]" />
            <p className="mt-6 font-script text-[2.1rem] leading-tight text-antique sm:text-[2.6rem]">
              The celebration has begun
            </p>
            <MiniDivider className="mt-5" />
            <p className="mx-auto mt-5 max-w-[500px] font-display text-xl italic leading-relaxed text-ink sm:text-[1.45rem]">
              Thank you for being part of our forever. Your love and blessings make this day
              complete.
            </p>
            <p className="mt-6 text-[9px] uppercase tracking-[0.28em] text-ink-soft">
              With love · Gowtham &amp; Narmaththa
            </p>
          </Reveal>
        ) : (
          <Reveal variant="scale" delay={120} className="relative mx-auto mt-10 max-w-[940px] sm:mt-12">
            <div className="relative border-y border-champagne/30 px-1 py-8 sm:px-8 sm:py-10">
              <span aria-hidden="true" className="absolute -left-1 -top-1 h-2 w-2 rotate-45 border border-champagne/60 bg-ivory" />
              <span aria-hidden="true" className="absolute -right-1 -top-1 h-2 w-2 rotate-45 border border-champagne/60 bg-ivory" />
              <span aria-hidden="true" className="absolute -bottom-1 -left-1 h-2 w-2 rotate-45 border border-champagne/60 bg-ivory" />
              <span aria-hidden="true" className="absolute -bottom-1 -right-1 h-2 w-2 rotate-45 border border-champagne/60 bg-ivory" />

              <div
                className="relative flex items-start justify-center gap-2.5 sm:gap-6 lg:gap-9"
                role="timer"
                aria-label="Time remaining until the wedding reception"
              >
                {units.map((unit, index) => (
                  <div key={unit.label} className="flex items-start gap-2.5 sm:gap-6 lg:gap-9">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mt-2 block h-12 w-px bg-gradient-to-b from-transparent via-champagne/40 to-transparent sm:mt-3 sm:h-16 lg:h-20"
                      />
                    )}
                    <div className="min-w-[58px] text-center sm:min-w-[86px] lg:min-w-[104px]">
                      <p
                        key={`${unit.label}-${unit.value}`}
                        aria-hidden="true"
                        className="gold-text font-display text-[clamp(2.5rem,7vw,4.7rem)] leading-none tabular-nums motion-safe:animate-[tickIn_0.4s_ease-out]"
                      >
                        {String(unit.value).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-[7.5px] uppercase tracking-[0.28em] text-ink-soft sm:mt-3 sm:text-[8.5px]">
                        {unit.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3">
              <p className="flex items-center gap-2.5 text-[8px] uppercase tracking-[0.24em] text-ink-soft sm:text-[8.5px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne/60 [animation-duration:2.5s]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-antique/80" />
                </span>
                Salem local time · {istTime} IST
              </p>
              <p className="max-w-[400px] text-[8px] uppercase leading-relaxed tracking-[0.2em] text-ink-soft/80">
                Countdown calculated in {EVENT.timeZone} ({EVENT.timeZoneLabel})
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

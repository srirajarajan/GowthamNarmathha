import { EVENT, IMAGES, googleCalendarUrl, mapsEmbedUrl, mapsUrl } from "@/lib/event";
import { BotanicalSprig, CornerBloom, Flourish, Icon, Monogram } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Venue() {
  return (
    <section id="venue" className="paper relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <BotanicalSprig className="absolute -left-3 bottom-16 h-64 w-32 -rotate-[22deg] opacity-30 sm:h-80 sm:w-40" />
        <div className="absolute -right-32 top-14 h-80 w-80 rounded-full bg-blush/25 blur-[90px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-[660px] text-center">
          <p className="label-caps text-[9px] text-antique">The Venue</p>
          <h2 className="display-title mt-4 text-[clamp(2.3rem,5.5vw,3.9rem)] text-charcoal">
            The Celebration Awaits
          </h2>
          <p className="mt-4 font-display text-lg italic leading-relaxed text-ink-soft sm:text-xl">
            We look forward to welcoming you in Salem.
          </p>
          <Flourish className="mx-auto mt-5 h-4 w-44" />
        </Reveal>

        <Reveal variant="scale" delay={100} className="relative mt-11 sm:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 border border-champagne/25 sm:-inset-3"
          />
          <div className="relative grid overflow-hidden border border-champagne/40 bg-ivory shadow-luxe lg:grid-cols-[0.92fr_1.08fr]">
            {/* Scene */}
            <div className="relative min-h-[330px] overflow-hidden sm:min-h-[400px] lg:min-h-[550px]">
              <img
                src={IMAGES.dusk.src}
                alt={IMAGES.dusk.alt}
                loading="lazy"
                decoding="async"
                className="image-cinematic absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201914]/90 via-[#201914]/20 to-[#201914]/25" />
              <CornerBloom className="absolute -right-6 -top-4 h-40 w-40 -scale-x-100 text-champagne-light/60" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                <span className="rounded-full border border-ivory/25 bg-charcoal/20 px-3 py-1.5 text-[7.5px] uppercase tracking-[0.26em] text-ivory/85 backdrop-blur-sm">
                  Salem · Tamil Nadu
                </span>
                <Monogram tone="ink" className="h-10 w-10 text-[8px]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-7">
                <p className="label-caps text-[8px] text-champagne-light/90">An evening of celebration</p>
                <p className="mt-2 font-script text-[1.7rem] leading-tight text-ivory sm:text-[2rem]">
                  Where forever begins
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ivory/20 pt-3 text-[8px] uppercase tracking-[0.22em] text-ivory/65">
                  <span>19 November 2026</span>
                  <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-champagne-light/70" />
                  <span>6:00 PM onwards</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="relative p-6 sm:p-9 lg:p-12">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-antique/60" />
                <p className="label-caps text-[8.5px] text-antique">Join us at</p>
              </div>
              <h3 className="mt-4 font-display text-[clamp(2rem,4vw,2.9rem)] leading-[1.02] text-charcoal">
                {EVENT.venue}
              </h3>
              <p className="mt-3 text-[10px] uppercase leading-[2] tracking-[0.18em] text-ink-soft">
                {EVENT.addressLine1}
                <br />
                {EVENT.addressLine2}
                <br />
                Tamil Nadu, India
              </p>

              <div aria-hidden="true" className="my-6 h-px w-full bg-champagne/25" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/35 text-antique">
                    <Icon name="calendar" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-ink-soft">Date</p>
                    <p className="mt-1 font-display text-[1.15rem] leading-tight text-charcoal">
                      {EVENT.day}
                      <br />
                      {EVENT.dateLabel}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/35 text-antique">
                    <Icon name="clock" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-ink-soft">Time</p>
                    <p className="mt-1 font-display text-[1.15rem] leading-tight text-charcoal">
                      {EVENT.timeLabel}
                      <br />
                      <span className="text-[0.8em] uppercase tracking-[0.08em] text-ink-soft">
                        India Standard Time
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={mapsUrl} target="_blank" rel="noreferrer noopener" className="btn-gold group">
                  <Icon name="pin" className="h-4 w-4" />
                  Open in Maps
                  <Icon
                    name="arrow-up-right"
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a href={googleCalendarUrl} target="_blank" rel="noreferrer noopener" className="btn-outline">
                  <Icon name="calendar-plus" className="h-4 w-4" />
                  Add to Calendar
                </a>
              </div>

              <p className="mt-6 flex items-start gap-2 text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink-soft/80">
                <Icon name="heart" className="mt-0.5 h-3 w-3 shrink-0 text-champagne" />
                {EVENT.presenceLine}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className="border border-champagne/30 bg-ivory p-2 shadow-frame">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <p className="flex items-center gap-2 text-[8px] uppercase tracking-[0.24em] text-ink">
                <Icon name="pin" className="h-3.5 w-3.5 text-antique" />
                {EVENT.venue}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 text-[7.5px] uppercase tracking-[0.2em] text-antique transition-colors hover:text-charcoal"
              >
                View map
                <Icon name="arrow-up-right" className="h-3 w-3" />
              </a>
            </div>
            <div className="relative h-[260px] overflow-hidden bg-ivory-deep sm:h-[300px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <Icon name="pin" className="h-5 w-5 text-antique" />
                <p className="font-display text-xl text-charcoal">{EVENT.venue}</p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-ink-soft">{EVENT.addressFull}</p>
              </div>
              <iframe
                title={`Map showing ${EVENT.venue} in ${EVENT.cityRegion}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="relative h-full w-full border-0"
                style={{ filter: "sepia(0.16) saturate(0.92) contrast(1.02)" }}
              />
            </div>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden border border-champagne/30 bg-ivory-soft/60 p-6 sm:p-8">
            <BotanicalSprig className="absolute -right-4 -top-6 h-40 w-24 rotate-[24deg] opacity-40" />
            <div className="relative">
              <Monogram className="h-11 w-11 text-[9px]" />
              <p className="mt-5 font-script text-[1.7rem] leading-tight text-antique">
                Your presence is our greatest blessing.
              </p>
              <p className="mt-3 text-[9.5px] uppercase leading-[2] tracking-[0.17em] text-ink-soft">
                {EVENT.day}, {EVENT.dateLabel}
                <br />
                6:00 PM onwards
                <br />
                {EVENT.addressFull}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `${EVENT.venue}, ${EVENT.addressFull}`,
              )}`}
              target="_blank"
              rel="noreferrer noopener"
              className="relative mt-6 inline-flex w-fit items-center gap-2 border-b border-antique/40 pb-1 text-[8px] uppercase tracking-[0.24em] text-antique transition-colors hover:text-charcoal"
            >
              Get directions
              <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

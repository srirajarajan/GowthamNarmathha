import { EVENT, IMAGES, downloadCalendar, googleCalendarUrl, mapsUrl } from "@/lib/event";
import { shareInvitation } from "@/lib/share";
import { cn } from "@/utils/cn";
import { CornerBloom, Flourish, Icon, Monogram, type IconName } from "./Ornaments";
import { Reveal } from "./Reveal";

type ActionProps = {
  icon: IconName;
  label: string;
  onClick?: () => void;
  href?: string;
};

function InvitationAction({ icon, label, onClick, href }: ActionProps) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/40 text-antique transition-colors duration-300 group-hover:border-antique group-hover:bg-antique group-hover:text-ivory">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="text-[9px] uppercase leading-relaxed tracking-[0.2em] text-ink transition-colors group-hover:text-antique sm:text-[9.5px]">
        {label}
      </span>
    </>
  );

  const classes =
    "group flex w-full flex-col items-center justify-center gap-2.5 border border-champagne/30 bg-ivory-soft/40 px-3 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-antique/50 hover:bg-ivory-soft sm:flex-row sm:justify-start sm:gap-3 sm:px-4";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

function DetailIcon({ name }: { name: IconName }) {
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne/35 text-antique sm:h-9 sm:w-9">
      <Icon name={name} className="h-4 w-4" />
    </span>
  );
}

export function Invitation({ notify }: { notify: (message: string) => void }) {
  const handleSaveDate = () => {
    downloadCalendar();
    notify("Saved to your calendar — we look forward to celebrating with you.");
  };

  const handleShare = async () => {
    const result = await shareInvitation();
    if (result === "copied") {
      notify("Invitation link copied. Share the joy with your loved ones.");
    } else if (result === "shared") {
      notify("Thank you for sharing our invitation.");
    } else if (result === "failed") {
      notify("Please copy this page's link from your browser to share the invitation.");
    }
  };

  return (
    <section id="invitation" className="paper-deep relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blush/30 blur-[90px]" />
        <div className="absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-champagne/15 blur-[80px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-7 lg:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="label-caps text-[9px] text-antique">You Are Invited</p>
          <h2 className="display-title mt-4 text-[clamp(2.4rem,5.5vw,4rem)] text-charcoal">
            Reception Invitation
          </h2>
          <p className="body-copy mx-auto mt-4 max-w-[500px] text-[13.5px] sm:text-sm">
            With hearts full of joy, we invite you to share in an evening of love, laughter and
            blessings.
          </p>
          <Flourish className="mx-auto mt-5 h-4 w-44" />
        </Reveal>

        <Reveal variant="scale" delay={100} className="relative mt-10 sm:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 border border-champagne/30 sm:-inset-3"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 hidden border border-champagne/15 sm:block"
          />

          <div className="relative overflow-hidden border border-champagne/45 bg-ivory shadow-luxe">
            <div aria-hidden="true" className="pointer-events-none absolute inset-2 z-10 border border-champagne/20 sm:inset-3" />
            <CornerBloom className="absolute -left-12 -top-10 h-48 w-48 opacity-55 sm:-left-8 sm:-top-6 sm:h-56 sm:w-56" />
            <CornerBloom className="absolute -right-12 -top-10 h-48 w-48 -scale-x-100 opacity-55 sm:-right-8 sm:-top-6 sm:h-56 sm:w-56" />
            <CornerBloom className="absolute -bottom-14 -left-12 h-44 w-44 -scale-y-100 opacity-30 sm:-bottom-10 sm:-left-8 sm:h-52 sm:w-52" />
            <CornerBloom className="absolute -bottom-14 -right-12 h-44 w-44 -scale-100 opacity-30 sm:-bottom-10 sm:-right-8 sm:h-52 sm:w-52" />

            <div className="relative px-4 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
              <div className="relative z-20 grid items-center gap-9 lg:grid-cols-[0.83fr_1.17fr] lg:gap-12">
                {/* Portrait */}
                <Reveal variant="left" className="order-1 mx-auto w-full max-w-[370px] lg:mx-0 lg:max-w-none">
                  <div className="relative mx-auto max-w-[360px]">
                    <div
                      aria-hidden="true"
                      className="arch absolute -inset-2 border border-champagne/30"
                    />
                    <div className="arch relative aspect-[3/4] overflow-hidden border border-champagne/45 bg-ivory-deep">
                      <img
                        src={IMAGES.traditional.src}
                        alt={IMAGES.traditional.alt}
                        loading="lazy"
                        decoding="async"
                        className="image-warm h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#241c15]/75 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-ivory sm:p-5">
                        <div>
                          <p className="font-script text-[1.4rem] leading-none text-champagne-light">
                            The couple
                          </p>
                          <p className="mt-1.5 text-[7.5px] uppercase tracking-[0.28em] text-ivory/70">
                            Gowtham &amp; Narmathha
                          </p>
                        </div>
                        <Monogram tone="ink" className="h-10 w-10 text-[8px]" />
                      </div>
                    </div>
                    <div className="absolute -bottom-5 -right-3 border border-champagne/30 bg-ivory px-4 py-2.5 text-center shadow-sm sm:-right-5">
                      <p className="font-script text-xl leading-none text-antique">Save the date</p>
                      <p className="mt-1 text-[7.5px] uppercase tracking-[0.25em] text-ink-soft">
                        19 · 11 · 2026
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Wording */}
                <Reveal variant="right" delay={140} className="order-2 text-center lg:text-left">
                  <Monogram className="mx-auto h-12 w-12 text-[10px] lg:mx-0" />
                  <p className="label-caps mt-4 text-[9px] text-antique sm:text-[9.5px]">Together with our families</p>
                  <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.2em] text-ink-soft sm:text-[9px]">
                    We joyfully invite you to be a part of our
                  </p>

                  <h3 className="gold-text mt-4 font-display text-[clamp(2.1rem,5vw,3.05rem)] uppercase leading-none tracking-[0.16em]">
                    Reception
                  </h3>
                  <Flourish className="mx-auto mt-3 h-4 w-48 lg:mx-0" />

                  <p className="mt-4 font-display text-[clamp(1.75rem,4vw,2.45rem)] leading-[1.15] text-charcoal">
                    Gowtham <span className="font-script text-[1.1em] lowercase text-champagne">&amp;</span> Narmathha
                  </p>
                  <p className="mt-1.5 font-script text-[1.25rem] leading-snug text-antique">
                    Two hearts, one beautiful journey
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-champagne/25 pt-6 text-left">
                    <div className="flex gap-3">
                      <DetailIcon name="calendar" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-ink-soft">{EVENT.day}</p>
                        <p className="mt-0.5 font-display text-[1.05rem] leading-tight text-charcoal sm:text-[1.2rem]">
                          {EVENT.dateLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <DetailIcon name="clock" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-ink-soft">Celebration</p>
                        <p className="mt-0.5 font-display text-[1.05rem] leading-tight text-charcoal sm:text-[1.2rem]">
                          {EVENT.timeLabel}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex gap-3 border-t border-champagne/20 pt-5">
                      <DetailIcon name="pin" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-ink-soft">The venue</p>
                        <p className="mt-0.5 font-display text-[1.2rem] leading-tight text-charcoal sm:text-[1.35rem]">
                          {EVENT.venue}
                        </p>
                        <p className="mt-1.5 text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
                          {EVENT.addressLine1}
                          <br />
                          {EVENT.addressLine2}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 font-script text-[1.3rem] leading-snug text-antique sm:text-[1.45rem]">
                    Your presence will make our celebration complete.
                  </p>
                </Reveal>
              </div>

              <div className="relative z-20 mt-10 border-t border-champagne/25 pt-7 sm:mt-12">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
                  <InvitationAction icon="calendar-plus" label="Save the date" onClick={handleSaveDate} />
                  <InvitationAction icon="pin" label="Venue location" href={mapsUrl} />
                  <InvitationAction icon="calendar" label="Add to calendar" href={googleCalendarUrl} />
                  <InvitationAction icon="share" label="Share with loved ones" onClick={handleShare} />
                </div>
                <div className="mt-7 flex flex-col items-center justify-between gap-3 sm:flex-row">
                  <p className="text-[8.5px] uppercase tracking-[0.24em] text-ink-soft sm:text-[9px]">
                    Thursday, 19 November 2026 · Salem, Tamil Nadu
                  </p>
                  <p className="flex items-center gap-2 font-script text-xl text-antique">
                    With love, Gowtham &amp; Narmathha
                    <Icon name="heart" className="h-3.5 w-3.5 text-champagne" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex justify-center sm:mt-10">
          <a
            href="#countdown"
            className={cn(
              "group inline-flex items-center gap-3 text-[8.5px] uppercase tracking-[0.28em] text-ink-soft",
              "transition-colors hover:text-antique",
            )}
          >
            <span aria-hidden="true" className="h-px w-8 bg-champagne/50 transition-all duration-500 group-hover:w-12" />
            The countdown to our celebration
            <Icon name="arrow-right" className="h-4 w-4 text-antique transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

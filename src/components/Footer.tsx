import { EVENT, NAV_LINKS, mapsUrl } from "@/lib/event";
import { Flourish, Icon, Monogram } from "./Ornaments";

export function Footer() {
  return (
    <footer className="paper relative overflow-hidden border-t border-champagne/25">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blush/20 blur-[80px]" />
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-champagne/10 blur-[70px]" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="flex justify-center">
          <Flourish className="h-4 w-52" />
        </div>

        <div className="mt-10 grid gap-10 text-center sm:grid-cols-2 md:grid-cols-[1.25fr_0.8fr_1fr] md:text-left">
          <div>
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              <Monogram className="h-14 w-14 text-[11px]" />
              <div>
                <p className="font-display text-[1.35rem] uppercase leading-tight tracking-[0.12em] text-charcoal">
                  Gowtham <span className="font-script text-[1.15em] normal-case text-champagne">&amp;</span> Narmathha
                </p>
                <p className="mt-2 font-script text-xl leading-none text-antique">
                  Two hearts, one beautiful journey
                </p>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-[320px] text-[8px] uppercase leading-[2.1] tracking-[0.2em] text-ink-soft md:mx-0">
              {EVENT.day}, {EVENT.dateLabel}
              <br />
              6:00 PM onwards · {EVENT.cityRegion}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="label-caps text-[8px] text-antique">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              <li>
                <a href="#home" className="text-[9px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-antique">
                  Home
                </a>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[9px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-antique"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-caps text-[8px] text-antique">The Celebration</p>
            <p className="mt-4 font-display text-xl leading-tight text-charcoal">{EVENT.venue}</p>
            <p className="mt-2 text-[8px] uppercase leading-[2] tracking-[0.18em] text-ink-soft">
              {EVENT.addressLine1}
              <br />
              {EVENT.addressLine2}
              <br />
              Tamil Nadu, India
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 border-b border-antique/35 pb-1 text-[8px] uppercase tracking-[0.22em] text-antique transition-colors hover:text-charcoal"
            >
              Open in Google Maps
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-champagne/25 pt-6 sm:flex-row">
          <p className="text-[7.5px] uppercase tracking-[0.22em] text-ink-soft">
            Gowtham &amp; Narmathha · 19 November 2026
          </p>
          <p className="text-[7.5px] uppercase tracking-[0.22em] text-ink-soft/70">
            A celebration of love · A digital keepsake
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-[7.5px] uppercase tracking-[0.22em] text-antique transition-colors hover:text-charcoal"
          >
            Back to top
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-champagne/40 transition-colors group-hover:border-antique">
              <Icon name="chevron-right" className="h-3 w-3 -rotate-90" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

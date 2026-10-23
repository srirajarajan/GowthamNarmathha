import { EVENT, IMAGES } from "@/lib/event";
import { shareInvitation } from "@/lib/share";
import { Flourish, Icon, Monogram } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Closing({
  onReplay,
  notify,
}: {
  onReplay: () => void;
  notify: (message: string) => void;
}) {
  const handleShare = async () => {
    const result = await shareInvitation();
    if (result === "copied") notify("Invitation link copied. Thank you for sharing the joy.");
    else if (result === "shared") notify("Thank you for sharing our invitation.");
    else if (result === "failed") notify("Please copy this page's link from your browser to share it.");
  };

  return (
    <section
      aria-label="With love from Gowtham and Narmaththa"
      className="relative flex min-h-[86svh] items-center justify-center overflow-hidden bg-charcoal"
    >
      <img
        src={IMAGES.dusk.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="image-cinematic absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,22,17,0.96),rgba(28,22,17,0.6)_45%,rgba(28,22,17,0.6))]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_45%,transparent,rgba(24,19,15,0.72))]" />
      <div className="film-grain absolute inset-0 opacity-[0.08]" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-5 py-20 text-center text-ivory sm:px-8 sm:py-24">
        <Reveal>
          <Monogram tone="light" className="mx-auto h-14 w-14 text-[11px]" />
          <p className="label-caps mt-6 text-[8.5px] text-champagne-light/90">With Love And Gratitude</p>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4.1rem)] leading-[1.08] text-ivory">
            Your presence will make
            <br />
            <span className="italic text-champagne-light">our celebration complete.</span>
          </h2>
          <Flourish className="mx-auto mt-6 h-4 w-48 text-champagne/70" />
          <p className="mt-6 font-script text-[2rem] leading-tight text-champagne-light sm:text-[2.5rem]">
            Gowtham &amp; Narmaththa
          </p>
          <p className="mx-auto mt-4 max-w-[460px] text-[9px] uppercase leading-[2.1] tracking-[0.22em] text-ivory/60 sm:text-[9.5px]">
            {EVENT.dateLong} · 6:00 PM onwards
            <br />
            {EVENT.venue} · {EVENT.cityRegion}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onReplay} className="btn-gold w-full sm:w-auto">
              <Icon name="envelope" className="h-4 w-4" />
              Replay the Invitation
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex w-full items-center justify-center gap-3 border border-ivory/30 px-6 py-4 text-[9px] uppercase tracking-[0.24em] text-ivory/85 transition-all duration-300 hover:border-champagne-light/70 hover:text-champagne-light sm:w-auto"
            >
              <Icon name="share" className="h-4 w-4" />
              Share the Invitation
            </button>
          </div>
        </Reveal>
      </div>

      <p className="absolute inset-x-0 bottom-5 text-center text-[7.5px] uppercase tracking-[0.3em] text-ivory/35">
        A digital keepsake · 19 · 11 · 2026
      </p>
    </section>
  );
}

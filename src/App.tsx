import { useCallback, useEffect, useRef, useState } from "react";
import { Closing } from "@/components/Closing";
import { Countdown } from "@/components/Countdown";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Invitation } from "@/components/Invitation";
import { Nav } from "@/components/Nav";
import { OpeningScreen } from "@/components/OpeningScreen";
import { Story } from "@/components/Story";
import { Toast } from "@/components/Toast";
import { Venue } from "@/components/Venue";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4600);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showIntro]);

  const enterSite = useCallback(() => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: "auto" });
    window.setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 120);
  }, []);

  const replayInvitation = useCallback(() => {
    setToast(null);
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="relative min-h-screen bg-ivory">
      <div
        aria-hidden="true"
        className="film-grain pointer-events-none fixed inset-0 z-[200]"
      />

      {showIntro && <OpeningScreen onEnter={enterSite} />}

      <a
        href="#main"
        tabIndex={showIntro ? -1 : undefined}
        aria-hidden={showIntro || undefined}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:border focus:border-antique focus:bg-ivory focus:px-4 focus:py-2 focus:text-[10px] focus:uppercase focus:tracking-[0.2em] focus:text-antique"
      >
        Skip to content
      </a>

      <div aria-hidden={showIntro} inert={showIntro}>
        <Nav onReplay={replayInvitation} />
        <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
          <Hero ready={!showIntro} />
          <Story />
          <Invitation notify={notify} />
          <Countdown />
          <Gallery />
          <Venue />
          <Closing onReplay={replayInvitation} notify={notify} />
        </main>
        <Footer />
      </div>

      <Toast message={toast} onDismiss={dismissToast} />
    </div>
  );
}

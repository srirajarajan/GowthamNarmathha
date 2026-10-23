import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Monogram                                                           */
/* ------------------------------------------------------------------ */

type MonogramTone = "gold" | "light" | "ink";

const MONOGRAM_TONES: Record<MonogramTone, { outer: string; inner: string }> = {
  gold: { outer: "border-antique/45 text-antique", inner: "border-antique/25" },
  light: { outer: "border-champagne-light/60 text-champagne-light", inner: "border-champagne-light/25" },
  ink: { outer: "border-ivory/40 text-ivory", inner: "border-ivory/20" },
};

export function Monogram({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: MonogramTone;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border font-display text-base leading-none",
        MONOGRAM_TONES[tone].outer,
        className,
      )}
    >
      <span className={cn("absolute inset-[6px] rounded-full border", MONOGRAM_TONES[tone].inner)} />
      <span className="relative flex items-baseline tracking-[0.05em]">
        <span>G</span>
        <span className="mx-[0.16em] font-script text-[0.82em]">&amp;</span>
        <span>N</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Flourishes                                                         */
/* ------------------------------------------------------------------ */

export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 24"
      className={cn("h-5 w-48 text-champagne", className)}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M6 12h74" stroke="currentColor" strokeOpacity=".55" strokeWidth=".9" />
      <path d="M140 12h74" stroke="currentColor" strokeOpacity=".55" strokeWidth=".9" />
      <path
        d="M110 4.5c3.1 4.2 4.7 6.9 4.7 8.8 0 2.1-2.1 3.4-4.7 3.4s-4.7-1.3-4.7-3.4c0-1.9 1.6-4.6 4.7-8.8Z"
        stroke="currentColor"
        strokeWidth=".9"
      />
      <path d="m110 8.4 1.9 3.6-1.9 3.6-1.9-3.6 1.9-3.6Z" fill="currentColor" fillOpacity=".75" />
      <path
        d="M90 12c3.6 0 6.2-1.3 8.1-4M130 12c-3.6 0-6.2-1.3-8.1-4"
        stroke="currentColor"
        strokeOpacity=".65"
        strokeWidth=".8"
      />
      <circle cx="84" cy="12" r="1.2" fill="currentColor" fillOpacity=".7" />
      <circle cx="136" cy="12" r="1.2" fill="currentColor" fillOpacity=".7" />
    </svg>
  );
}

export function MiniDivider({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-2 text-champagne", className)}>
      <span className="h-px w-8 bg-current opacity-50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-current" />
      <span className="h-px w-8 bg-current opacity-50" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Botanical line art                                                 */
/* ------------------------------------------------------------------ */

function LineFlower({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((rotation) => (
        <path
          key={rotation}
          d={`M0 0C${-r * 0.52} ${-r * 0.5} ${-r * 0.52} ${-r * 1.08} 0 ${-r * 1.42}C${r * 0.52} ${-r * 1.08} ${r * 0.52} ${-r * 0.5} 0 0Z`}
          transform={`rotate(${rotation})`}
          fill="currentColor"
          fillOpacity=".07"
          stroke="currentColor"
          strokeOpacity=".6"
          strokeWidth=".8"
        />
      ))}
      <circle r={r * 0.2} fill="currentColor" fillOpacity=".35" />
      {[0, 60, 120, 180, 240, 300].map((rotation) => (
        <line
          key={rotation}
          x1="0"
          y1={r * 0.2}
          x2="0"
          y2={r * 0.4}
          transform={`rotate(${rotation})`}
          stroke="currentColor"
          strokeOpacity=".5"
          strokeWidth=".7"
        />
      ))}
    </g>
  );
}

export function CornerBloom({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 220"
      fill="none"
      className={cn("pointer-events-none text-champagne", className)}
      preserveAspectRatio="xMinYMin meet"
    >
      <g strokeLinecap="round">
        <path
          d="M-12 46C34 40 60 58 76 90c14 28 40 42 68 38"
          stroke="currentColor"
          strokeOpacity=".4"
          strokeWidth=".9"
        />
        <path d="M4 -14C14 32 38 56 70 68" stroke="currentColor" strokeOpacity=".4" strokeWidth=".9" />
        <path d="M14 8c6 16 16 28 32 36" stroke="currentColor" strokeOpacity=".28" strokeWidth=".8" />
        <path d="M54 47c-13-4-22 3-25 15 13 4 23-3 25-15Z" fill="currentColor" fillOpacity=".09" stroke="currentColor" strokeOpacity=".5" strokeWidth=".8" />
        <path d="M93 85c-2-13 6-21 19-22 1 13-7 22-19 22Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".5" strokeWidth=".8" />
        <path d="M112 110c-1-12 7-20 19-20 0 12-8 20-19 20Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeOpacity=".45" strokeWidth=".8" />
        <path d="M42 38c9-9 20-9 28-1-7 10-19 11-28 1Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".45" strokeWidth=".8" />
        <path d="M94 118c16 10 26 23 31 39" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8" />
        <path d="M118 140c10-3 18 3 20 12-9 4-18 0-20-12Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeOpacity=".4" strokeWidth=".8" />
        <LineFlower cx={128} cy={107} r={15} />
        <LineFlower cx={63} cy={54} r={9} />
        <circle cx="164" cy="152" r="2.2" fill="currentColor" fillOpacity=".4" />
        <circle cx="146" cy="176" r="1.4" fill="currentColor" fillOpacity=".3" />
      </g>
    </svg>
  );
}

export function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 220"
      fill="none"
      className={cn("pointer-events-none text-champagne", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <g strokeLinecap="round">
        <path d="M62 214C58 160 53 106 47 56c-3-24-6-40-12-54" stroke="currentColor" strokeOpacity=".5" strokeWidth=".9" />
        <path d="M50 78C30 66 18 48 18 26" stroke="currentColor" strokeOpacity=".4" strokeWidth=".8" />
        <path d="M54 120c-20-8-34-26-37-48" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8" />
        <path d="M48 70c-12-1-22-8-27-18 11-2 23 5 27 18Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".45" strokeWidth=".8" />
        <path d="M57 100c11-6 17-16 17-28-11 2-18 13-17 28Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeOpacity=".4" strokeWidth=".8" />
        <path d="M52 132c-13-2-23-10-28-21 12-1 24 7 28 21Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".45" strokeWidth=".8" />
        <path d="M60 160c11-7 16-17 15-28-11 4-17 14-15 28Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeOpacity=".4" strokeWidth=".8" />
        <LineFlower cx={36} cy={26} r={13} />
        <LineFlower cx={72} cy={54} r={8} />
      </g>
    </svg>
  );
}

export function Petals({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {[
        { left: "8%", delay: "0s", duration: "19s", size: 10, tone: "bg-blush/60" },
        { left: "24%", delay: "6s", duration: "24s", size: 7, tone: "bg-champagne/40" },
        { left: "63%", delay: "2s", duration: "21s", size: 9, tone: "bg-blush/50" },
        { left: "81%", delay: "11s", duration: "26s", size: 6, tone: "bg-champagne/35" },
        { left: "93%", delay: "8s", duration: "22s", size: 8, tone: "bg-blush/40" },
      ].map((petal, index) => (
        <span
          key={index}
          className={cn("petal absolute top-0 block rounded-[100%_0_100%_0]", petal.tone)}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.7,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

export type IconName =
  | "envelope"
  | "calendar"
  | "calendar-plus"
  | "clock"
  | "pin"
  | "share"
  | "download"
  | "arrow-right"
  | "arrow-up-right"
  | "chevron-left"
  | "chevron-right"
  | "close"
  | "menu"
  | "music"
  | "pause"
  | "check"
  | "heart";

const ICON_PATHS: Record<IconName, ReactNode> = {
  envelope: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.7 7 8.3 6 8.3-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10.5h18" />
      <path d="M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18h.01M12 18h.01" />
    </>
  ),
  "calendar-plus": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10.5h18M12 14v5M9.5 16.5h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
      <path d="M4.5 20.5h15" />
    </>
  ),
  "arrow-right": <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  "arrow-up-right": <path d="M7 17 17 7m0 0H8m9 0v9" />,
  "chevron-left": <path d="m14.5 5.5-6 6.5 6 6.5" />,
  "chevron-right": <path d="m9.5 5.5 6 6.5-6 6.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  music: (
    <>
      <path d="M9 18V5.5L20 3v12.5" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="15.5" r="3" />
    </>
  ),
  pause: (
    <>
      <path d="M9 5v14M15 5v14" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5L19.5 7" />,
  heart: <path d="M12 20.3s-7.8-4.7-7.8-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.8 2.7c0 5.5-7.8 10.2-7.8 10.2Z" />,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.3,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

export const EVENT = {
  groom: "Gowtham",
  bride: "Narmathha",
  couple: "Gowtham & Narmathha",
  eventName: "Wedding Reception",
  day: "Thursday",
  dateLabel: "19 November 2026",
  dateShort: "19 · 11 · 2026",
  dateLong: "Thursday, 19 November 2026",
  timeLabel: "6:00 PM onwards",
  venue: "Sri Adithya Mahal",
  addressLine1: "Coimbatore–Salem Bypass",
  addressLine2: "Ariyanur, Salem",
  addressFull: "Coimbatore–Salem Bypass, Ariyanur, Salem, Tamil Nadu, India",
  cityRegion: "Salem, Tamil Nadu",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST · UTC+5:30",
  startISO: "2026-11-19T18:00:00+05:30",
  endISO: "2026-11-19T23:00:00+05:30",
  startUTC: "20261119T123000Z",
  endUTC: "20261119T173000Z",
  tagline: "Two Hearts. One Beautiful Journey.",
  invitationTagline: "Two Hearts, One Beautiful Journey",
  presenceLine: "Your presence will make our celebration complete.",
} as const;

export const IMAGES = {
  hero: {
    src: "/images/hero-portrait.jpg",
    alt: "Gowtham and Narmathha together in traditional reception attire — Narmathha in a purple silk saree and Gowtham in a royal blue suit.",
  },
  traditional: {
    src: "/images/traditional-portrait.jpg",
    alt: "Gowtham and Narmathha in traditional South Indian wedding attire, smiling together in a sunlit portrait.",
  },
  car: {
    src: "/images/car-moment.jpg",
    alt: "A cinematic moment of Gowtham and Narmathha facing one another inside a car, glowing in warm golden light.",
  },
  ivory: {
    src: "/images/ivory-portrait.jpg",
    alt: "Gowtham and Narmathha in coordinated ivory and cream outfits, smiling warmly together.",
  },
  henna: {
    src: "/images/henna-detail.jpg",
    alt: "A still life of henna-decorated hands, gold bangles, jasmine flowers and a purple silk saree.",
  },
  dusk: {
    src: "/images/reception-dusk.jpg",
    alt: "Gowtham and Narmathha sharing a joyful moment under a rose arch at dusk, surrounded by warm lights.",
  },
  invitation: {
    src: "/images/invitation-card-art.jpg",
    alt: "An ivory and gold botanical wedding invitation card setting.",
  },
} as const;

export const NAV_LINKS = [
  { id: "story", label: "Our Story" },
  { id: "invitation", label: "Invitation" },
  { id: "countdown", label: "Countdown" },
  { id: "gallery", label: "Gallery" },
  { id: "venue", label: "Venue" },
] as const;

export const GALLERY = [
  {
    src: IMAGES.traditional.src,
    alt: IMAGES.traditional.alt,
    caption: "The celebration of us",
    tag: "Traditional",
    aspect: "aspect-[3/4]",
    position: "object-center",
  },
  {
    src: IMAGES.car.src,
    alt: IMAGES.car.alt,
    caption: "In our own little world",
    tag: "A quiet moment",
    aspect: "aspect-[4/5]",
    position: "object-center",
  },
  {
    src: IMAGES.dusk.src,
    alt: IMAGES.dusk.alt,
    caption: "An evening to remember",
    tag: "Together",
    aspect: "aspect-[4/3]",
    position: "object-center",
  },
  {
    src: IMAGES.ivory.src,
    alt: IMAGES.ivory.alt,
    caption: "Simply, us",
    tag: "Everyday joy",
    aspect: "aspect-[3/4]",
    position: "object-top",
  },
  {
    src: IMAGES.henna.src,
    alt: IMAGES.henna.alt,
    caption: "Details of a new beginning",
    tag: "Little things",
    aspect: "aspect-[4/5]",
    position: "object-center",
  },
  {
    src: IMAGES.hero.src,
    alt: IMAGES.hero.alt,
    caption: "A promise of forever",
    tag: "Portrait",
    aspect: "aspect-[3/4]",
    position: "object-center",
  },
  {
    src: IMAGES.invitation.src,
    alt: IMAGES.invitation.alt,
    caption: "A keepsake of a new beginning",
    tag: "The invitation",
    aspect: "aspect-[4/5]",
    position: "object-center",
  },
] as const;

export const TIMELINE = [
  {
    chapter: "Chapter One",
    title: "The In-Between Moments",
    copy: "A quiet glance, a shared laugh, the stillness between two souls who already know. These are the moments that quietly build a lifetime.",
    note: "Where every glance feels like home.",
    imageCaption: "A quiet kind of love",
    image: IMAGES.car,
    aspect: "aspect-[4/5]",
    position: "object-center",
  },
  {
    chapter: "Chapter Two",
    title: "Rooted in Tradition",
    copy: "Two families, two worlds, one celebration. With every custom honoured and every blessing received, our story grows richer and deeper.",
    note: "Where heritage meets the promise of a lifetime.",
    imageCaption: "Rooted in tradition",
    image: IMAGES.traditional,
    aspect: "aspect-[3/4]",
    position: "object-top",
  },
  {
    chapter: "Chapter Three",
    title: "Simply, Us",
    copy: "Beyond the finery and the flowers, there is only this — two hearts, entirely at ease with one another, ready for everything that comes next.",
    note: "Where ordinary days become celebrations.",
    imageCaption: "Just as we are",
    image: IMAGES.ivory,
    aspect: "aspect-[4/5]",
    position: "object-top",
  },
] as const;

export const mapsQuery = `${EVENT.venue}, ${EVENT.addressFull}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

export const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  `${EVENT.couple} — ${EVENT.eventName}`,
)}&dates=${EVENT.startUTC}/${EVENT.endUTC}&details=${encodeURIComponent(
  `${EVENT.eventName} of ${EVENT.couple}. Your presence will make our celebration complete.`,
)}&location=${encodeURIComponent(mapsQuery)}`;

export const eventTimestamp = new Date(EVENT.startISO).getTime();

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildIcs() {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gowtham and Narmaththa//Wedding Reception//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:gowtham-narmaththa-reception-20261119@invitation`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${EVENT.startUTC}`,
    `DTEND:${EVENT.endUTC}`,
    `SUMMARY:${escapeIcs(`${EVENT.couple} — ${EVENT.eventName}`)}`,
    `LOCATION:${escapeIcs(mapsQuery)}`,
    `DESCRIPTION:${escapeIcs(
      `Together with our families, we joyfully invite you to be a part of our Reception. ${EVENT.presenceLine}`,
    )}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Wedding Reception tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadCalendar() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Gowtham-Narmaththa-Reception-19-Nov-2026.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

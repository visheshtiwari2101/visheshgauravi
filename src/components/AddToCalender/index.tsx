import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarPlus } from "lucide-react";
import { weddingConfig } from "@/config/config";

type Ev = { title: string; start: string; end: string; label: string };

// UTC stamps (IST -5:30). Day 2 (8 December 2026) is the default event.
const EVENTS: Ev[] = [
  {
    title: `${weddingConfig.groomName} & ${weddingConfig.brideName} — Wedding Day`,
    start: "20261208T033000Z",
    end: "20261208T133000Z",
    label: "8 December 2026 — Wedding Day",
  },
  {
    title: `${weddingConfig.groomName} & ${weddingConfig.brideName} — Wedding Celebrations (Day 1)`,
    start: "20261207T033000Z",
    end: "20261207T140000Z",
    label: "7 December 2026 — Celebrations",
  },
];

const location = `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`;
const details = `Join us to celebrate! ${weddingConfig.hashtag}`;

function googleUrl(e: Ev) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.start}/${e.end}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function icsHref(events: Ev[]) {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vishesh & Gauravi//Wedding//EN",
    ...events.flatMap((e, i) => [
      "BEGIN:VEVENT",
      `UID:vg-wedding-${i}@vishesh-gauravi`,
      `DTSTAMP:${e.start}`,
      `DTSTART:${e.start}`,
      `DTEND:${e.end}`,
      `SUMMARY:${e.title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location.replace(/,/g, "\\,")}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

// Best-effort Apple-platform detection; falls back gracefully if unavailable.
function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent || "");
}

export default function AddToCalendar() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const b = btnRef.current?.getBoundingClientRect();
      if (!b) return;
      const width = 288; // w-72
      const left = Math.min(
        Math.max(8, b.left + b.width / 2 - width / 2),
        window.innerWidth - width - 8,
      );
      setPos({ top: b.bottom + 8, left });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  // Close on any outside pointer interaction (mouse + touch), without
  // blocking option clicks inside the menu.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: Event) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (ref.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemClass =
    "block w-full rounded-xl px-4 py-2.5 text-left text-sm text-wedding-text transition-colors hover:bg-marigold/20";
  const headingClass =
    "px-4 pb-1 pt-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-wedding-text/55";

  const [day2, day1] = EVENTS as [Ev, Ev];
  const apple = isApplePlatform();
  const first = apple ? day1 : day2;
  const second = apple ? day2 : day1;

  const menu = (
    <div
      ref={menuRef}
      role="menu"
      style={{ position: "fixed", top: pos?.top ?? 0, left: pos?.left ?? 0 }}
      className="z-[100] max-h-[70vh] w-72 overflow-y-auto rounded-2xl border border-wedding-border bg-wedding-surface p-2 shadow-[var(--shadow-lift)]"
    >
      <p className={headingClass}>{first.label}</p>
      <a
        role="menuitem"
        href={googleUrl(first)}
        target="_blank"
        rel="noreferrer"
        className={itemClass}
        onClick={() => setOpen(false)}
      >
        Google Calendar
      </a>
      <a
        role="menuitem"
        href={icsHref([first])}
        download={`vishesh-gauravi-wedding-${first.start.slice(0, 8)}.ics`}
        className={itemClass}
        onClick={() => setOpen(false)}
      >
        Apple Calendar (.ics)
      </a>

      <p className={headingClass}>{second.label}</p>
      <a
        role="menuitem"
        href={googleUrl(second)}
        target="_blank"
        rel="noreferrer"
        className={itemClass}
        onClick={() => setOpen(false)}
      >
        Google Calendar
      </a>
      <a
        role="menuitem"
        href={icsHref([second])}
        download={`vishesh-gauravi-wedding-${second.start.slice(0, 8)}.ics`}
        className={itemClass}
        onClick={() => setOpen(false)}
      >
        Apple Calendar (.ics)
      </a>
    </div>
  );

  return (
    <div ref={ref} className="relative mt-5 flex justify-center">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-full bg-wedding-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03] sm:text-sm sm:tracking-[0.18em]"
      >
        <CalendarPlus className="h-4 w-4" aria-hidden="true" />
        Add to Calendar
      </button>

      {open && pos && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}

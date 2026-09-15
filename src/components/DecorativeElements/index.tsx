import type { SVGProps } from "react";

/** Small hand-drawn marigold-style bloom used across the site. */
export function Marigold({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="20"
            cy="11"
            rx="4.6"
            ry="7.6"
            transform={`rotate(${i * 45} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="3.4" />
      </g>
    </svg>
  );
}

/** Leafy sprig from the monogram wreath. */
export function Sprig({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 24" aria-hidden="true" className={className} {...props}>
      <path
        d="M2 12C16 12 34 12 58 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {[10, 20, 30, 40, 48].map((x, i) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy={i % 2 === 0 ? 6 : 18}
            rx="5.5"
            ry="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            transform={`rotate(${i % 2 === 0 ? -25 : 25} ${x} ${i % 2 === 0 ? 6 : 18})`}
          />
        </g>
      ))}
    </svg>
  );
}

/** Corner flourish inspired by the monogram wreath. */
export function FloralCorner({
  className,
  flip = false,
  ...props
}: SVGProps<SVGSVGElement> & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M6 114C6 62 40 16 114 6" />
        <path d="M28 96c-6-10-4-22 4-28" />
        <ellipse cx="30" cy="60" rx="4" ry="8" transform="rotate(-35 30 60)" />
        <ellipse cx="46" cy="44" rx="4" ry="8" transform="rotate(-15 46 44)" />
        <ellipse cx="68" cy="28" rx="4" ry="8" transform="rotate(15 68 28)" />
        <circle cx="90" cy="18" r="5" />
        <circle cx="90" cy="18" r="1.8" />
        <circle cx="16" cy="88" r="2" />
      </g>
    </svg>
  );
}

/** Rangoli-inspired section divider. */
export function RangoliDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`} aria-hidden="true">
      <Sprig className="h-5 w-16 text-leaf sm:w-24" style={{ transform: "scaleX(-1)" }} />
      <svg viewBox="0 0 60 60" className="h-8 w-8 text-wedding-primary">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={i} cx="30" cy="18" rx="6" ry="11" transform={`rotate(${i * 60} 30 30)`} />
          ))}
          <circle cx="30" cy="30" r="4" className="text-wedding-accent" />
        </g>
      </svg>
      <Sprig className="h-5 w-16 text-leaf sm:w-24" />
    </div>
  );
}

/** Mehendi-inspired thin line pattern. */
export function MehendiLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" aria-hidden="true" className={className}>
      <path
        d="M0 8c10 0 10-6 20-6s10 12 20 12 10-12 20-12 10 12 20 12 10-12 20-12 10 12 20 12 10-12 20-12 10 12 20 12 10-6 20-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small diya used sparingly around evening functions. */
export function Diya({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" aria-hidden="true" className={className}>
      <path
        d="M8 24c0 6 7 10 16 10s16-4 16-10z"
        fill="currentColor"
        opacity="0.18"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M24 18c3-4 1-8-1-10 4 1 7 5 7 9a6 6 0 0 1-12 0c0-2 1-3 2-4 0 2 2 4 4 5z"
        className="fill-haldi"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}


/** Small hanging marigold garland (bandhanwar) strung across a card top. */
export function MarigoldGarland({ className, ...props }: SVGProps<SVGSVGElement>) {
  const beads = Array.from({ length: 15 });
  return (
    <svg viewBox="0 0 240 26" aria-hidden="true" className={className} {...props}>
      <path
        d="M2 4C60 26 180 26 238 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      {beads.map((_, i) => {
        const t = i / (beads.length - 1);
        const x = 2 + t * 236;
        const y = 4 + Math.sin(Math.PI * t) * 17;
        return <circle key={i} cx={x} cy={y} r={i % 2 ? 2.6 : 3.4} fill="currentColor" opacity={i % 2 ? 0.55 : 0.85} />;
      })}
    </svg>
  );
}

/** Understated mandala ring used as a soft section accent. */
export function Mandala({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="60" cy="60" r="16" />
        <circle cx="60" cy="60" r="30" strokeDasharray="3 5" />
        <circle cx="60" cy="60" r="52" strokeDasharray="1 7" />
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="60" cy="26" rx="5" ry="12" transform={`rotate(${i * 30} 60 60)`} />
        ))}
      </g>
    </svg>
  );
}

/** Tiny temple bell motif. */
export function Bell({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 40" aria-hidden="true" className={className} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M16 4v4" />
        <path d="M7 26c0-9 3-16 9-16s9 7 9 16z" />
        <path d="M5 26h22" />
        <path d="M16 30a3 3 0 0 0 3-3h-6a3 3 0 0 0 3 3z" />
      </g>
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl text-wedding-primary sm:text-4xl md:text-5xl">{title}</h2>
      {note ? <p className="script-note mt-2">{note}</p> : null}
      <RangoliDivider className="mt-5" />
    </div>
  );
}

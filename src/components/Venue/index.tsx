import { motion } from "framer-motion";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { weddingConfig } from "@/config/config";
import { FloralCorner, SectionHeading, Diya } from "@/components/DecorativeElements";
import CharacterScene from "@/components/CharacterScene";

export default function Venue() {
  return (
    <section id="venue" className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Where the dhol happens" title="The Venue" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="ink-frame relative mt-10 overflow-hidden bg-wedding-surface px-5 py-9 sm:px-10"
        >
          <FloralCorner className="pointer-events-none absolute left-1 top-1 h-20 w-20 text-leaf/50" />
          <FloralCorner
            flip
            className="pointer-events-none absolute right-1 top-1 h-20 w-20 text-blossom/45"
          />

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-3xl text-wedding-primary sm:text-4xl">
                {weddingConfig.venueName}
              </h3>

              <p className="mt-4 flex items-start justify-center gap-2 text-sm leading-relaxed text-wedding-text/80 md:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-wedding-secondary" aria-hidden="true" />
                <span>{weddingConfig.venueAddress}</span>
              </p>

              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-wedding-text/80 md:justify-start">
                <Clock className="h-4 w-4 shrink-0 text-wedding-secondary" aria-hidden="true" />
                <span>
                  7th &amp; 8th December 2026 · {weddingConfig.weddingTime}
                </span>

              </p>

              <a
                href={weddingConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-wedding-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03]"
              >
                Open Directions
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>

              <p className="script-note mt-4">Park anywhere, dance everywhere</p>
            </div>

            <div className="relative flex items-end gap-2">
              <Diya className="h-9 w-9 text-wedding-primary" />
              <CharacterScene type="venue" className="h-48 w-auto sm:h-64" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Marigold, MehendiLine } from "@/components/DecorativeElements";
import CharacterScene from "@/components/CharacterScene";
import RSVPModal from "@/components/RSVPModal";
import { weddingConfig } from "@/config/config";

export default function RSVP() {
  const [open, setOpen] = useState(false);
  if (!weddingConfig.rsvp.enabled) return null;

  return (
    <section id="rsvp" className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="ink-frame relative overflow-hidden bg-gradient-to-b from-wedding-accent/15 to-wedding-surface px-5 py-10 text-center sm:px-10"
        >
          <Marigold
            aria-hidden="true"
            className="pointer-events-none absolute -left-5 bottom-4 h-20 w-20 text-haldi/45"
          />
          <CharacterScene type="rsvp" className="mx-auto h-44 w-auto sm:h-56" />

          <h2 className="mt-5 font-display text-3xl text-wedding-primary sm:text-4xl">
            Will you celebrate with us?
          </h2>
          <MehendiLine className="mx-auto mt-2 h-3 w-48 text-wedding-accent" />
          <p className="mt-3 text-sm text-wedding-text/75">
            A quick yes or no helps us plan the plates, the parking and the playlist.
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-7 rounded-full bg-wedding-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
          >
            Let us know
          </button>
        </motion.div>
      </div>

      <RSVPModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

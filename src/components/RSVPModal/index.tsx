import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart } from "lucide-react";
import { weddingConfig } from "@/config/config";
import { FloralCorner, MehendiLine } from "@/components/DecorativeElements";
import CharacterScene from "@/components/CharacterScene";

type Props = { open: boolean; onClose: () => void };

export default function RSVPModal({ open, onClose }: Props) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const payload = { ...data, submittedAt: new Date().toISOString() };
    const endpoint = weddingConfig.rsvp.submitUrl;

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          // Apps Script web apps accept simple requests without a preflight.
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      } catch {
        setSubmitting(false);
        setError("We couldn't send your RSVP just now. Please check your connection and try again.");
        return;
      }
    }

    setSubmitting(false);
    setSent(true);
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setSent(false);
      setError(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close RSVP"
            onClick={close}
            className="absolute inset-0 bg-wedding-text/45 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            tabIndex={-1}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-wedding-border bg-wedding-surface p-6 shadow-[var(--shadow-lift)] sm:rounded-[2rem] sm:p-8"
          >
            <FloralCorner className="pointer-events-none absolute left-1 top-1 h-16 w-16 text-leaf/45" />
            <FloralCorner
              flip
              className="pointer-events-none absolute right-1 top-1 h-16 w-16 text-blossom/40"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-wedding-border bg-wedding-background text-wedding-primary"
            >
              <X className="h-4 w-4" />
            </button>

            {sent ? (
              <div className="py-6 text-center">
                <CharacterScene type="reception" className="mx-auto h-40 w-auto" />
                <h2 id="rsvp-title" className="mt-4 font-display text-2xl text-wedding-primary">
                  Thank you! We can't wait to celebrate with you.
                </h2>
                <MehendiLine className="mx-auto mt-3 h-3 w-44 text-wedding-accent" />
                <p className="script-note mt-3">{weddingConfig.hashtag}</p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 rounded-full border border-wedding-border px-6 py-2.5 text-sm font-semibold text-wedding-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="eyebrow">RSVP</p>
                  <h2 id="rsvp-title" className="mt-2 font-display text-2xl text-wedding-primary">
                    Will you celebrate with us?
                  </h2>
                  <MehendiLine className="mx-auto mt-2 h-3 w-40 text-wedding-accent" />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                  <div>
                    <label htmlFor="rsvp-name" className="text-sm font-semibold">
                      Your name
                    </label>
                    <input
                      id="rsvp-name"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1.5 w-full rounded-xl border border-wedding-border bg-wedding-background px-4 py-2.5 text-sm outline-none focus:border-wedding-primary"
                    />
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold">Will you be there?</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {[
                        { v: "yes", l: "Yes, I'll be there" },
                        { v: "no", l: "Sorry, I can't make it" },
                      ].map((o) => (
                        <label
                          key={o.v}
                          className="flex cursor-pointer items-center gap-2 rounded-xl border border-wedding-border bg-wedding-background px-3 py-2.5 text-sm has-[:checked]:border-wedding-primary has-[:checked]:bg-wedding-primary/10"
                        >
                          <input
                            type="radio"
                            name="attendance"
                            value={o.v}
                            defaultChecked={o.v === "yes"}
                            className="accent-[var(--wedding-primary)]"
                          />
                          {o.l}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="rsvp-guests" className="text-sm font-semibold">
                      Number of guests
                    </label>
                    <input
                      id="rsvp-guests"
                      name="guests"
                      type="number"
                      min={1}
                      max={20}
                      defaultValue={1}
                      className="mt-1.5 w-full rounded-xl border border-wedding-border bg-wedding-background px-4 py-2.5 text-sm outline-none focus:border-wedding-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-message" className="text-sm font-semibold">
                      A message for us <span className="font-normal text-wedding-text/60">(optional)</span>
                    </label>
                    <textarea
                      id="rsvp-message"
                      name="message"
                      rows={3}
                      className="mt-1.5 w-full resize-none rounded-xl border border-wedding-border bg-wedding-background px-4 py-2.5 text-sm outline-none focus:border-wedding-primary"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-deep-red/40 bg-deep-red/10 px-4 py-2.5 text-sm text-deep-red"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-wedding-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
                  >
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    {submitting ? "Sending…" : "Send RSVP"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

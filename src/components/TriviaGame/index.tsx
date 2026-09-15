import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CharacterScene from "@/components/CharacterScene";
import {
  FloralCorner,
  Marigold,
  MehendiLine,
  SectionHeading,
} from "@/components/DecorativeElements";
import { fetchTally, submitVote, toPercentages, type Choice, type Tally } from "@/lib/trivia";

type Question = { id: string; text: string };

const QUESTIONS: Question[] = [
  { id: "Q01", text: "Who is statistically more likely to lose their phone while actively talking on speakerphone?" },
  { id: "Q02", text: "Who has the longer Baraat dance routine rehearsed in front of the mirror?" },
  { id: "Q03", text: "Who will crack under pressure first during the Joota Chupai ransom negotiations?" },
  { id: "Q04", text: "Who takes 45 minutes to get ready, and who takes 45 minutes just deciding which shoes to wear?" },
  { id: "Q05", text: "Who will be spotted sneaking a second round of hot jalebis at the lunch buffet?" },
  { id: "Q06", text: "Who is more likely to tear up first during the Phere rituals?" },
  { id: "Q07", text: "Who takes longer to compose a two-sentence reply on WhatsApp?" },
  { id: "Q08", text: "Who claimed they \u201cweren't hungry\u201d right before devouring half of the other person's meal?" },
  { id: "Q09", text: "Who is worse at keeping a straight face when serious elderly blessings are being handed out?" },
  { id: "Q10", text: "Who insisted this interactive trivia game be added to the website in the first place?" },
];

const STORAGE_KEY = "vg-trivia-answers";

type Status = "idle" | "sending" | "revealed" | "error";

type Result = { tally: Tally };

function readStored(): Record<string, Choice> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Choice>) : {};
  } catch {
    return {};
  }
}

const ORDER_KEY = "vg-trivia-order";

function getInitialOrder(): number[] {
  if (typeof window === "undefined") return QUESTIONS.map((_, i) => i);
  try {
    const raw = window.sessionStorage.getItem(ORDER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as number[];
      if (
        Array.isArray(parsed) &&
        parsed.length === QUESTIONS.length &&
        new Set(parsed).size === QUESTIONS.length &&
        parsed.every((i) => i >= 0 && i < QUESTIONS.length)
      ) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  const order = QUESTIONS.map((_, i) => i).sort(() => Math.random() - 0.5);
  try {
    window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
  return order;
}

function AnimatedPercent({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 700;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span>{display}%</span>;
}

export default function TriviaGame() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(QUESTIONS.map((_, i) => i));
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [results, setResults] = useState<Record<string, Result>>({});
  const [status, setStatus] = useState<Status>("idle");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setAnswers(readStored());
    setOrder(getInitialOrder());
    return () => {
      mounted.current = false;
    };
  }, []);

  const question = QUESTIONS[order[index] ?? 0]!;
  const answer = answers[question.id];
  const result = results[question.id];
  const isLast = index === QUESTIONS.length - 1;

  // Restore state when navigating back to an already-answered question.
  useEffect(() => {
    if (!answer) {
      setStatus("idle");
      return;
    }
    const cached = results[question.id];
    if (cached) {
      setStatus("revealed");
      return;
    }
    setStatus("sending");
    let active = true;
    void fetchTally(question.id).then((tally) => {
      if (!active) return;
      setResults((prev) =>
        prev[question.id] ? prev : { ...prev, [question.id]: { tally: tally ?? { vishesh: 0, gauravi: 0 } } },
      );
      setStatus("revealed");
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, answer]);

  const percentages = useMemo(
    () => (result?.tally ? toPercentages(result.tally) : { vishesh: 0, gauravi: 0 }),
    [result],
  );

  const vote = useCallback(
    async (choice: Choice) => {
      if (answers[question.id] || status === "sending") return;
      const next = { ...answers, [question.id]: choice };
      setAnswers(next);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — vote still counts for this render */
      }
      setStatus("sending");

      try {
        await submitVote(question.id, choice);
      } catch {
        if (!mounted.current) return;
        setStatus("error");
        return;
      }

      const tally = await fetchTally(question.id);
      if (!mounted.current) return;
      setResults((prev) => ({
        ...prev,
        [question.id]: { tally: tally ?? { vishesh: 0, gauravi: 0 } },
      }));
      setStatus("revealed");
    },
    [answers, question.id, status],
  );

  const characters: { key: Choice; scene: "countdownVishesh" | "countdownGauravi" }[] = [
    { key: "Vishesh", scene: "countdownVishesh" },
    { key: "Gauravi", scene: "countdownGauravi" },
  ];

  return (
    <section id="trivia" className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="A tiny bit of gossip"
          title="Vish-ful Thinking or Truly Gaurgeous?"
        />
        <p className="mt-3 text-center text-sm text-wedding-text/75 sm:text-base">
          Let&apos;s settle a few very important questions. 👀
        </p>

        <div className="ink-frame relative mt-8 bg-wedding-surface px-4 py-8 sm:px-9 sm:py-10">
          <FloralCorner className="pointer-events-none absolute left-1 top-1 h-16 w-16 text-leaf/45" />
          <FloralCorner
            flip
            className="pointer-events-none absolute right-1 top-1 h-16 w-16 text-blossom/40"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 32 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -32 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mx-auto max-w-xl text-center font-display text-xl leading-snug text-wedding-primary sm:text-2xl">
                {question.text}
              </h3>
              <MehendiLine className="mx-auto mt-3 h-3 w-36 text-wedding-accent" />

              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
                {characters.map(({ key, scene }) => {
                  const chosen = answer === key;
                  const rejected = Boolean(answer) && !chosen;
                  return (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => void vote(key)}
                      disabled={Boolean(answer)}
                      aria-pressed={chosen}
                      aria-label={`Choose ${key}`}
                      {...(answer
                        ? {}
                        : { whileHover: { scale: 1.04, y: -4 }, whileTap: { scale: 0.95 } })}
                      animate={
                        reduce || !answer
                          ? {}
                          : chosen
                            ? { y: [0, -10, 0], rotate: [0, -3, 3, 0] }
                            : { rotate: [0, 4, 0], y: [0, 4, 0] }
                      }
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className={`group relative flex min-h-[9.5rem] flex-col items-center justify-end rounded-3xl border px-2 pb-3 pt-4 transition-colors sm:min-h-[13rem] ${
                        chosen
                          ? "border-wedding-primary bg-wedding-primary/10 shadow-[var(--shadow-lift)]"
                          : rejected
                            ? "border-wedding-border bg-wedding-background/60 opacity-70"
                            : "border-wedding-border bg-wedding-background hover:border-wedding-primary"
                      }`}
                    >
                      <CharacterScene
                        type={scene}
                        className="pointer-events-none h-24 w-auto sm:h-36"
                      />
                      <span className="mt-2 font-display text-base text-wedding-primary sm:text-lg">
                        {key}
                      </span>
                      {!answer && (
                        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-wedding-text/55">
                          Tap to pick
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {answer && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="mt-6"
                  >
                    {status === "sending" && (
                      <div className="flex flex-col items-center justify-center gap-2 py-2">
                        <p className="text-center text-sm font-semibold text-wedding-secondary">
                          Consulting the wedding jury… 👀
                        </p>
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-wedding-primary"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.12,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {status === "error" && (
                      <p className="rounded-2xl border border-wedding-border bg-wedding-background px-4 py-3 text-center text-sm text-wedding-text/80">
                        Hmm… the wedding gossip machine is taking a moment. 😅
                      </p>
                    )}

                    {status === "revealed" && (
                      <div>
                        <p className="text-center text-sm font-semibold text-wedding-secondary">
                          What everyone else thinks… 👀
                        </p>
                        <div className="mt-4 space-y-3">
                          {(
                            [
                              ["Vishesh", percentages.vishesh],
                              ["Gauravi", percentages.gauravi],
                            ] as const
                          ).map(([name, pct]) => (
                            <div key={name}>
                              <div className="flex items-center justify-between text-sm font-semibold text-wedding-text">
                                <span>{name}</span>
                                <span>{pct}%</span>
                              </div>
                              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-wedding-border/60">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                  className={
                                    name === "Vishesh"
                                      ? "h-full rounded-full bg-wedding-primary"
                                      : "h-full rounded-full bg-wedding-secondary"
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-center gap-3">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                          className="rounded-full border border-wedding-border px-5 py-2.5 text-sm font-semibold text-wedding-primary"
                        >
                          ← Previous
                        </button>
                      )}
                      {isLast ? (
                        <p className="script-note flex items-center gap-2">
                          <Marigold className="h-5 w-5 text-marigold" />
                          That&apos;s a wrap ❤️
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIndex((i) => Math.min(i + 1, QUESTIONS.length - 1))}
                          className="inline-flex items-center gap-2 rounded-full bg-wedding-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03]"
                        >
                          Next
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

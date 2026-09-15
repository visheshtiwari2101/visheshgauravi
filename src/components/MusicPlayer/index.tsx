import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { weddingConfig } from "@/config/config";

const STORAGE_KEY = "vg-music-paused";

/**
 * Persistent floating music control backed by a hidden YouTube iframe.
 * The iframe loads WITHOUT autoplay (browsers block autoplay-with-sound
 * before a user gesture and can leave the player in an unplayable state).
 * Playback is started by the same user gesture that dismisses the start
 * screen, and we keep retrying until YouTube confirms it is playing.
 */
export default function MusicPlayer({ autoStart = false }: { autoStart?: boolean }) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const playingRef = useRef(false);
  const confirmedRef = useRef(false);

  const command = useCallback((func: string, args: unknown[] = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  }, []);

  const fadeTo = useCallback(
    (target: number) => {
      let v = target === 0 ? 60 : 0;
      command("setVolume", [v]);
      const id = setInterval(() => {
        v += target === 0 ? -10 : 10;
        command("setVolume", [Math.max(0, Math.min(60, v))]);
        if ((target === 0 && v <= 0) || (target > 0 && v >= 60)) clearInterval(id);
      }, 60);
    },
    [command],
  );

  const play = useCallback(() => {
    command("playVideo");
    fadeTo(60);
    playingRef.current = true;
    setPlaying(true);
    sessionStorage.removeItem(STORAGE_KEY);
  }, [command, fadeTo]);

  const pause = useCallback(() => {
    fadeTo(0);
    setTimeout(() => command("pauseVideo"), 400);
    playingRef.current = false;
    setPlaying(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, [command, fadeTo]);

  // Readiness fallback: the iframe can finish loading before React hydration
  // attaches onLoad (SSR), which would otherwise leave `ready` false forever
  // and block entry-gesture playback. Any YouTube postMessage also marks it.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("youtube")) return;
      setReady(true);
      if (typeof e.data !== "string") return;
      let data: { event?: string; info?: number };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (data.event === "onStateChange") {
        if (data.info === 1) {
          confirmedRef.current = true;
          setPlaying(true);
        }
        if (data.info === 2) setPlaying(false);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Start music from the start-screen gesture. Ask the player to report
  // state changes, then play; retry until playback is confirmed so a slow
  // player warm-up can't silently swallow the gesture.
  useEffect(() => {
    if (!ready || !autoStart) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    command("addEventListener", ["onStateChange"]);
    play();
    let attempts = 0;
    const retry = setInterval(() => {
      attempts += 1;
      if (attempts > 6 || sessionStorage.getItem(STORAGE_KEY) === "1") {
        clearInterval(retry);
        return;
      }
      // Re-issue play until YouTube confirms playback started.
      if (!confirmedRef.current && playingRef.current) command("playVideo");
    }, 800);
    return () => clearInterval(retry);
  }, [ready, autoStart, play, command]);

  // No autoplay here — playback is only ever started by a user gesture.
  const src = `https://www.youtube-nocookie.com/embed/${weddingConfig.backgroundMusicId}?enablejsapi=1&loop=1&controls=0&playsinline=1&playlist=${weddingConfig.backgroundMusicId}`;

  return (
    <>
      <iframe
        ref={frameRef}
        title="Background music"
        src={src}
        allow="autoplay; encrypted-media"
        aria-hidden="true"
        tabIndex={-1}
        onLoad={() => setReady(true)}
        className="pointer-events-none fixed -left-[9999px] h-px w-px opacity-0"
      />

      <motion.button
        type="button"
        onClick={() => {
          playing ? pause() : play();
        }}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-wedding-border bg-wedding-surface text-wedding-primary shadow-[var(--shadow-paper)] transition-colors hover:bg-wedding-primary hover:text-primary-foreground"
      >
        <motion.span
          animate={playing && !reduce ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing && !reduce
              ? { duration: 6, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
          className="inline-flex"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
        </motion.span>
      </motion.button>
    </>
  );
}

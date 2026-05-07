"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type State = "playing" | "paused" | "blocked";

export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<State>("paused");

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setState("playing");
    const onPause = () => setState("paused");

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    let cancelled = false;
    let cleanupAutoplayFallback: (() => void) | null = null;

    const tryPlay = () =>
      audio.play().then(
        () => {
          if (!cancelled) setState("playing");
        },
        () => {
          if (!cancelled) setState("blocked");
          throw new Error("autoplay blocked");
        }
      );

    // Try autoplay on initial load. If blocked, retry on first user gesture.
    tryPlay().catch(() => {
      const resume = () => {
        // Only detach the gesture listeners once playback has actually started.
        // On some devices/networks the first "gesture retry" can still fail (e.g. media not ready yet).
        tryPlay()
          .then(() => cleanupAutoplayFallback?.())
          .catch(() => {
            // Keep listeners so the next gesture can retry.
          });
      };

      const opts: AddEventListenerOptions = { once: true, passive: true };
      window.addEventListener("pointerdown", resume, opts);
      window.addEventListener("keydown", resume, { once: true });
      window.addEventListener("touchstart", resume, opts);

      cleanupAutoplayFallback = () => {
        window.removeEventListener("pointerdown", resume, opts);
        window.removeEventListener("keydown", resume);
        window.removeEventListener("touchstart", resume, opts);
      };
    });

    return () => {
      cancelled = true;
      cleanupAutoplayFallback?.();
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setState("playing"))
        .catch(() => setState("blocked"));
      return;
    }

    audio.pause();
    setState("paused");
  }, []);

  return {
    isPlaying: state === "playing",
    isBlocked: state === "blocked",
    toggle
  };
}


"use client";

import { useCallback, useEffect, useState } from "react";
import { getSoundtrack } from "./soundtrack";

type State = "playing" | "paused" | "blocked";

export function useAudioPlayer(src: string) {
  const [state, setState] = useState<State>("paused");

  useEffect(() => {
    const audio = getSoundtrack(src);

    const onPlay = () => setState("playing");
    const onPause = () => setState("paused");

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    if (!audio.paused) {
      setState("playing");
    }

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

    tryPlay().catch(() => {
      const resume = () => {
        tryPlay()
          .then(() => cleanupAutoplayFallback?.())
          .catch(() => {});
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
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = getSoundtrack(src);
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
  }, [src]);

  return {
    isPlaying: state === "playing",
    isBlocked: state === "blocked",
    toggle
  };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type State = "playing" | "paused" | "blocked";

export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<State>("paused");

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audioRef.current = audio;

    const onPlay = () => setState("playing");
    const onPause = () => setState("paused");

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Try autoplay on initial load. This may be blocked by browser policy.
    audio
      .play()
      .then(() => setState("playing"))
      .catch(() => setState("blocked"));

    return () => {
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


"use client";

export const SCREEN_FADE_MS = 1400;
export const HOME_SOUNDTRACK = "/Milo_song.wav";
export const HEADSPACE_SOUNDTRACK = "/Diffused_Deep.wav";

let audio: HTMLAudioElement | null = null;
let activeFadeFrame: number | null = null;
let fadeGeneration = 0;

function clampVolume(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function getSoundtrack(src: string): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = clampVolume(1);
    return audio;
  }

  const resolved = new URL(src, window.location.href).href;
  if (audio.src !== resolved) {
    cancelActiveFade();
    audio.pause();
    audio.currentTime = 0;
    audio.src = src;
    audio.load();
    audio.volume = clampVolume(audio.volume);
  }

  return audio;
}

function cancelActiveFade() {
  fadeGeneration += 1;
  if (activeFadeFrame !== null) {
    cancelAnimationFrame(activeFadeFrame);
    activeFadeFrame = null;
  }
}

/** Fades volume to zero, then pauses and resets for a later visit. */
export function fadeOutSoundtrack(durationMs: number = SCREEN_FADE_MS): Promise<void> {
  cancelActiveFade();

  const el = audio;
  if (!el || el.paused) {
    return Promise.resolve();
  }

  const startVolume = clampVolume(el.volume);
  const startedAt = performance.now();
  const generation = fadeGeneration;

  return new Promise((resolve) => {
    const step = (now: number) => {
      if (generation !== fadeGeneration) {
        return;
      }

      const progress = Math.min(1, Math.max(0, (now - startedAt) / durationMs));
      el.volume = clampVolume(startVolume * (1 - progress));

      if (progress < 1) {
        activeFadeFrame = requestAnimationFrame(step);
        return;
      }

      activeFadeFrame = null;
      el.pause();
      el.currentTime = 0;
      el.volume = startVolume;
      resolve();
    };

    activeFadeFrame = requestAnimationFrame(step);
  });
}

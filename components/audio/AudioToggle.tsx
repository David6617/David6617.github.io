"use client";

import styles from "./audio.module.css";
import { useAudioPlayer } from "./useAudioPlayer";

type Props = {
  src: string;
  iconTone?: "light" | "dark";
};

export function AudioToggle({ src, iconTone = "light" }: Props) {
  const { isPlaying, toggle } = useAudioPlayer(src);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
      title={isPlaying ? "Pause" : "Play"}
    >
      <span
        className={`${styles.icon}${iconTone === "dark" ? ` ${styles.iconDark}` : ""}`}
        aria-hidden="true"
      >
        {isPlaying ? "❚❚" : "►"}
      </span>
    </button>
  );
}


"use client";

import styles from "./audio.module.css";
import { useAudioPlayer } from "./useAudioPlayer";

type Props = {
  src: string;
};

export function AudioToggle({ src }: Props) {
  const { isPlaying, toggle } = useAudioPlayer(src);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
      title={isPlaying ? "Pause" : "Play"}
    >
      <span className={styles.icon} aria-hidden="true">
        {isPlaying ? "❚❚" : "►"}
      </span>
    </button>
  );
}


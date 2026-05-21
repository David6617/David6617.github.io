import { SCREEN_FADE_MS } from "@/components/audio/soundtrack";
import styles from "./PageFadeOverlay.module.css";

export type FadeVariant = "black" | "white";

type Props = {
  active: boolean;
  variant: FadeVariant;
  durationMs?: number;
};

export function PageFadeOverlay({
  active,
  variant,
  durationMs = SCREEN_FADE_MS
}: Props) {
  if (!active) return null;

  return (
    <div
      className={`${styles.overlay} ${variant === "white" ? styles.toWhite : styles.toBlack}`}
      style={{ animationDuration: `${durationMs}ms` }}
      aria-hidden="true"
    />
  );
}

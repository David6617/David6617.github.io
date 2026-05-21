"use client";

import { AudioToggle } from "@/components/audio/AudioToggle";
import { MusicHint } from "@/components/audio/MusicHint";
import { HEADSPACE_SOUNDTRACK } from "@/components/audio/soundtrack";
import { PageFadeOverlay } from "@/components/transitions/PageFadeOverlay";
import { useScreenTransition } from "@/components/transitions/useScreenTransition";
import styles from "./HeadspaceShell.module.css";

export function HeadspaceShell() {
  const { active: isFading, variant: fadeVariant, transitionTo } = useScreenTransition();

  return (
    <main className={styles.page} aria-label="David's headspace">
      <button
        type="button"
        className={styles.goHome}
        onClick={() => transitionTo("/", "white")}
        disabled={isFading}
      >
        &lt; Go Home..
      </button>

      <div className={styles.topRight}>
        <MusicHint tone="dark">
          <AudioToggle
            src={HEADSPACE_SOUNDTRACK}
            iconTone="dark"
            className={styles.audioToggle}
          />
        </MusicHint>
      </div>

      <div className={styles.center}>
        <p className={styles.message}>Hmmm.... looks like there&apos;s nothing going on in</p>
        <p className={styles.message}>David&apos;s head right now.. check back later!</p>
      </div>

      <PageFadeOverlay active={isFading} variant={fadeVariant} />
    </main>
  );
}

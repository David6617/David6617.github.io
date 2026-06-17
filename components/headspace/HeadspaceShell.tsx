"use client";

import { useCallback, useMemo, useState } from "react";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { MusicHint } from "@/components/audio/MusicHint";
import { HEADSPACE_SOUNDTRACK } from "@/components/audio/soundtrack";
import { PageFadeOverlay } from "@/components/transitions/PageFadeOverlay";
import { useScreenTransition } from "@/components/transitions/useScreenTransition";
import { HeadspaceCanvas } from "./canvas/HeadspaceCanvas";
import { POLAROIDS } from "./content/headspaceContent";
import { playOpenPolaroidSound } from "./lib/sounds";
import { ExpandedCardOverlay } from "./overlays/ExpandedCardOverlay";
import { GalleryImageLightbox } from "./overlays/GalleryImageLightbox";
import styles from "./HeadspaceShell.module.css";
import "./styles/headspace.shared.css";

export function HeadspaceShell() {
  const { active: isFading, variant: fadeVariant, transitionTo } = useScreenTransition();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const selectedPolaroid = useMemo(
    () => POLAROIDS.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  const lightboxAlt = useMemo(() => {
    if (!lightboxSrc || !selectedPolaroid || selectedPolaroid.type !== "gallery") {
      return "";
    }
    return selectedPolaroid.images.find((img) => img.src === lightboxSrc)?.alt ?? "";
  }, [lightboxSrc, selectedPolaroid]);

  const handleCloseExpanded = useCallback(() => {
    setSelectedId(null);
    setLightboxSrc(null);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxSrc(null);
  }, []);

  const handleViewMore = useCallback((id: string) => {
    playOpenPolaroidSound();
    setSelectedId(id);
  }, []);

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

      <HeadspaceCanvas
        polaroids={POLAROIDS}
        onViewMore={handleViewMore}
        disabled={isFading || selectedId !== null}
      />

      {selectedPolaroid ? (
        <ExpandedCardOverlay
          polaroid={selectedPolaroid}
          onClose={handleCloseExpanded}
          onImageClick={setLightboxSrc}
          suppressEscape={lightboxSrc !== null}
        />
      ) : null}

      {lightboxSrc ? (
        <GalleryImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={handleCloseLightbox}
        />
      ) : null}

      <PageFadeOverlay active={isFading} variant={fadeVariant} />
    </main>
  );
}

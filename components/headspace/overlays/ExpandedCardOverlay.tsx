"use client";

import { useEffect, useRef } from "react";
import type { Polaroid } from "../content/headspaceContent";
import { DescriptionCard } from "../cards/DescriptionCard";
import { GalleryCard } from "../cards/GalleryCard";
import styles from "./ExpandedCardOverlay.module.css";

type Props = {
  polaroid: Polaroid;
  onClose: () => void;
  onImageClick: (src: string) => void;
  suppressEscape?: boolean;
};

export function ExpandedCardOverlay({
  polaroid,
  onClose,
  onImageClick,
  suppressEscape = false
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (suppressEscape) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, suppressEscape]);

  useEffect(() => {
    cardRef.current?.focus();
  }, [polaroid.id]);

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={cardRef}
        className={styles.frame}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expanded-card-title"
        tabIndex={-1}
      >
        {polaroid.type === "description" ? (
          <DescriptionCard polaroid={polaroid} />
        ) : (
          <GalleryCard polaroid={polaroid} onImageClick={onImageClick} />
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import styles from "./GalleryImageLightbox.module.css";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export function GalleryImageLightbox({ src, alt = "", onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <figure className={styles.figure}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.image} src={src} alt={alt} draggable={false} />
      </figure>
    </div>
  );
}

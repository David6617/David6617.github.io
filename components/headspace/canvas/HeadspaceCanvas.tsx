"use client";

import { useEffect, useRef } from "react";
import type { Polaroid } from "../content/headspaceContent";
import { getCanvasWidth } from "../content/headspaceContent";
import { PolaroidCard } from "@/components/headspace/canvas/PolaroidCard";
import styles from "./HeadspaceCanvas.module.css";

type Props = {
  polaroids: Polaroid[];
  onViewMore: (id: string) => void;
  disabled?: boolean;
};

export function HeadspaceCanvas({ polaroids, onViewMore, disabled }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasWidth = getCanvasWidth(polaroids);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (disabled) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [disabled]);

  return (
    <div
      ref={scrollRef}
      className={styles.scroll}
      aria-label="Headspace polaroids"
    >
      <div
        className={styles.canvas}
        style={{ width: canvasWidth }}
      >
        {polaroids.map((polaroid) => (
          <PolaroidCard
            key={polaroid.id}
            polaroid={polaroid}
            onViewMore={onViewMore}
          />
        ))}
      </div>
    </div>
  );
}

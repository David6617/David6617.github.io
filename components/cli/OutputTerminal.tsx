"use client";

import { useEffect, useRef } from "react";
import styles from "./cli.module.css";

type Props = {
  lines: string[];
};

export function OutputTerminal({ lines }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (stickToBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      ref={scrollerRef}
      className={styles.output}
      onScroll={() => {
        const el = scrollerRef.current;
        if (!el) return;
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 12;
        stickToBottomRef.current = atBottom;
      }}
      role="log"
      aria-label="CLI output"
    >
      {lines.map((line, idx) => (
        <div key={idx} className={styles.outputLine}>
          {line || "\u00A0"}
        </div>
      ))}
    </div>
  );
}


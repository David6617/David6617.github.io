"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import styles from "./cli.module.css";

type Props = {
  lines: string[];
};

function renderInlineBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, idx) => {
    // Odd indexes are captures from the split regex (bold segments)
    if (idx % 2 === 1) return <strong key={idx}>{part}</strong>;
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

export function OutputTerminal({ lines }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);
  const renderedLines = useMemo(() => lines.map(renderInlineBold), [lines]);

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
      {renderedLines.map((content, idx) => (
        <div key={idx} className={styles.outputLine}>
          {content.length ? content : "\u00A0"}
        </div>
      ))}
    </div>
  );
}


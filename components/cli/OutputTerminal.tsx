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

function renderInlineLinksAndBold(text: string) {
  const nodes: React.ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^)]+)\)/g;

  let lastIdx = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    const start = match.index;
    const full = match[0]!;
    const label = match[1]!;
    const href = match[2]!;

    if (start > lastIdx) {
      nodes.push(<Fragment key={`t-${lastIdx}`}>{renderInlineBold(text.slice(lastIdx, start))}</Fragment>);
    }

    nodes.push(
      <a
        key={`a-${start}`}
        className={styles.outputLink}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {renderInlineBold(label)}
      </a>
    );

    lastIdx = start + full.length;
  }

  if (lastIdx < text.length) {
    nodes.push(<Fragment key={`t-${lastIdx}`}>{renderInlineBold(text.slice(lastIdx))}</Fragment>);
  }

  return nodes;
}

export function OutputTerminal({ lines }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);
  const renderedLines = useMemo(() => lines.map(renderInlineLinksAndBold), [lines]);

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


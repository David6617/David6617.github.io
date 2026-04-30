"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./cli.module.css";

type Props = {
  onSubmit: (command: string) => void;
};

export function CommandInput({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIdx] = useState<number | null>(null);

  const prompt = useMemo(() => ">", []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={styles.inputWrap}
      onMouseDown={() => inputRef.current?.focus()}
    >
      <span className={styles.prompt} aria-hidden="true">
        {prompt}
      </span>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const cmd = value;
            setValue("");
            setHistoryIdx(null);
            if (cmd.trim()) {
              setHistory((h) => [...h, cmd]);
              onSubmit(cmd);
            }
            e.preventDefault();
            return;
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHistoryIdx((idx) => {
              if (history.length === 0) return null;
              const next = idx === null ? history.length - 1 : Math.max(0, idx - 1);
              setValue(history[next] ?? "");
              return next;
            });
            return;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHistoryIdx((idx) => {
              if (history.length === 0 || idx === null) return null;
              const next = idx + 1;
              if (next >= history.length) {
                setValue("");
                return null;
              }
              setValue(history[next] ?? "");
              return next;
            });
          }
        }}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        aria-label="Command line input"
      />
    </div>
  );
}


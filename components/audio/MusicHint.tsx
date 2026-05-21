"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type SVGProps
} from "react";
import styles from "./MusicHint.module.css";

type Props = {
  children: ReactNode;
  tone?: "light" | "dark";
};

function IconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10A4.5 4.5 0 0 1 17 21.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.25 6.75h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconYouTube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.3 31.3 0 0 0 2 12a31.3 31.3 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 22 12a31.3 31.3 0 0 0-.4-4.8ZM10.2 15.2V8.8L15.8 12l-5.6 3.2Z" />
    </svg>
  );
}

function IconEmail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  );
}

export function MusicHint({ children, tone = "light" }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onMouseDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <button
        type="button"
        className={`${styles.hint}${tone === "dark" ? ` ${styles.hintDark}` : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        Like the music? (Click Here!)
      </button>
      {children}
      {open ? (
        <div
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-label="About the music"
        >
          <div className={styles.title}>About the music:</div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.body}>
            This song was composed by my good friend Milo Gavin! I&apos;ve linked all his
            socials underneath, please go check him out if you ever need cool music ;D
          </div>
          <a
            className={styles.link}
            href="https://milogavin.ca"
            target="_blank"
            rel="noopener noreferrer"
          >
            milogavin.ca
          </a>
          <div className={styles.icons} aria-label="Links">
            <a
              className={styles.icon}
              href="https://www.instagram.com/pokenem24/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram className={styles.svg} />
            </a>
            <a
              className={styles.icon}
              href="https://www.youtube.com/@pokenem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <IconYouTube className={styles.svg} />
            </a>
            <a
              className={styles.icon}
              href="mailto:milo.gavin@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <IconEmail className={styles.svg} />
            </a>
            <a
              className={styles.icon}
              href="https://www.linkedin.com/in/milo-gavin-25658a342/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedIn className={styles.svg} />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

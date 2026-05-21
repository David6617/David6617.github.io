"use client";

import Image from "next/image";
import { useMemo, type SVGProps } from "react";
import styles from "./PortfolioShell.module.css";
import { AudioToggle } from "./audio/AudioToggle";
import { MusicHint } from "./audio/MusicHint";
import { HOME_SOUNDTRACK } from "./audio/soundtrack";
import { CommandInput } from "./cli/CommandInput";
import { OutputTerminal } from "./cli/OutputTerminal";
import { PageFadeOverlay } from "./transitions/PageFadeOverlay";
import {
  DEFAULT_HEADSHOT,
  formatHeadshotAlt,
  getHeadshotSrc,
  isHeadshotVariant
} from "./cli/headshots";
import { useCli } from "./cli/useCli";

/** Replace with your profiles; GitHub matches this repo's username. */
const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/david-hang-8a2355297/",
  x: "https://x.com/notdewei?s=21",
  github: "https://github.com/David6617",
  email: "mailto:hangdavi080@gmail.com"
} as const;

function IconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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

export function PortfolioShell() {
  const { output, runCommand, headshot, menuLines, isFading, fadeVariant } = useCli();

  const headshotVariant = isHeadshotVariant(headshot) ? headshot : DEFAULT_HEADSHOT;
  const headshotSrc = useMemo(() => getHeadshotSrc(headshotVariant), [headshotVariant]);

  return (
    <main className={styles.page}>
      <div className={styles.topRight}>
        <MusicHint>
          <AudioToggle src={HOME_SOUNDTRACK} />
        </MusicHint>
      </div>

      <section className={styles.grid}>
        <div className={styles.headerLeft}>
          <div className={styles.headshotWrap}>
            <Image
              src={headshotSrc}
              alt={formatHeadshotAlt(headshotVariant)}
              fill
              className={styles.headshot}
              priority
              unoptimized
            />
          </div>

          <div className={styles.identity}>
            <div className={styles.name}>David Hang</div>
            <div className={styles.meta}>Comp. Math @ University of Waterloo</div>
            <div className={styles.meta}>Prev. Full Stack @ Leap Tools Inc.</div>
            <a
              className={styles.resume}
              href="https://drive.google.com/file/d/1nRVIxZBhlgijnrcZqi98rqFShbzQ5-SR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <div className={styles.socialRow} aria-label="Social links">
              <a
                className={styles.socialIcon}
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className={styles.socialSvg} />
              </a>
              <a
                className={styles.socialIcon}
                href={SOCIAL.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <IconX className={styles.socialSvg} />
              </a>
              <a
                className={styles.socialIcon}
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <IconGithub className={styles.socialSvg} />
              </a>
              <a className={styles.socialIcon} href={SOCIAL.email} aria-label="Email">
                <IconEmail className={styles.socialSvg} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.menuPreview} aria-hidden="true">
            <div className={styles.menuIntro}>{menuLines[0]}</div>
            <div className={styles.menuColumns}>
              {menuLines.slice(1).map((line, idx) => (
                <div key={idx} className={styles.menuLine}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cliInput}>
            <CommandInput onSubmit={runCommand} />
          </div>
        </div>

        <div className={styles.bottom}>
          <OutputTerminal lines={output} />
        </div>
      </section>

      <PageFadeOverlay active={isFading} variant={fadeVariant} />
    </main>
  );
}


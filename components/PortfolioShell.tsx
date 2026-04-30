"use client";

import Image from "next/image";
import { useMemo } from "react";
import styles from "./PortfolioShell.module.css";
import { AudioToggle } from "./audio/AudioToggle";
import { CommandInput } from "./cli/CommandInput";
import { OutputTerminal } from "./cli/OutputTerminal";
import { useCli } from "./cli/useCli";

export function PortfolioShell() {
  const { output, runCommand } = useCli();

  const menuLines = useMemo(
    () => [
      "> Please select an option",
      "",
      "> About me",
      "> Experience",
      "> Portfolio",
      "> More stuff",
      "",
      "> Type here"
    ],
    []
  );

  return (
    <main className={styles.page}>
      <div className={styles.topRight}>
        <AudioToggle src="/Sountrack1.mp3" />
      </div>

      <section className={styles.grid}>
        <div className={styles.headerLeft}>
          <div className={styles.headshotWrap}>
            <Image
              src="/headshot.png"
              alt="Headshot"
              fill
              className={styles.headshot}
              priority
            />
          </div>

          <div className={styles.identity}>
            <div className={styles.name}>David Hang</div>
            <div className={styles.meta}>School: University of Waterloo</div>
            <div className={styles.meta}>Previous: Leap Tools Inc.</div>
            <a className={styles.resume} href="#" onClick={(e) => e.preventDefault()}>
              Resume
            </a>
            <div className={styles.socialRow} aria-label="Social links (placeholder)">
              {["f", "yt", "ig", "in", "x", "gh", "tk"].map((t) => (
                <div key={t} className={styles.socialIcon}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.menuPreview} aria-hidden="true">
            {menuLines.map((line, idx) => (
              <div key={idx} className={styles.menuLine}>
                {line || "\u00A0"}
              </div>
            ))}
          </div>

          <div className={styles.cliInput}>
            <CommandInput onSubmit={runCommand} />
          </div>
        </div>

        <div className={styles.bottom}>
          <OutputTerminal lines={output} />
        </div>
      </section>
    </main>
  );
}


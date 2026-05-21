"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { fadeOutSoundtrack, SCREEN_FADE_MS } from "@/components/audio/soundtrack";
import type { FadeVariant } from "./PageFadeOverlay";

export function useScreenTransition() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<FadeVariant>("black");

  const transitionTo = useCallback(
    (href: string, nextVariant: FadeVariant) => {
      if (active) return;

      setVariant(nextVariant);
      setActive(true);
      void fadeOutSoundtrack(SCREEN_FADE_MS);
      window.setTimeout(() => {
        router.push(href);
      }, SCREEN_FADE_MS);
    },
    [active, router]
  );

  return { active, variant, transitionTo };
}

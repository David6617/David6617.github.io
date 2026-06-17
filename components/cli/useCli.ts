"use client";

import { useCallback, useMemo, useReducer } from "react";
import { useScreenTransition } from "../transitions/useScreenTransition";
import { executeCommand } from "./commands";
import { cliReducer, initialCliState } from "./cliReducer";
import { getMenuLines } from "./menus";

export function useCli() {
  const { active: isFading, variant: fadeVariant, transitionTo } = useScreenTransition();
  const [state, dispatch] = useReducer(cliReducer, undefined, () => ({
    ...initialCliState,
    output: [
      "> Hello I'm David! Welcome to my website :D",
      "> Type 'help' to list all available commands.",
      ""
    ]
  }));

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      dispatch({ type: "clear" });
      const safe = trimmed.replaceAll("*", "");
      dispatch({ type: "append", lines: [`> **${safe}**`] });
      const result = executeCommand(trimmed, state.menuMode, state.headshot);

      if (result.type === "navigate") {
        dispatch({ type: "remember", command: trimmed });
        transitionTo(result.href, "black");
        return;
      }

      if (result.type === "clear") {
        dispatch({ type: "clear" });
        if (result.headshot) {
          dispatch({ type: "setHeadshot", variant: result.headshot });
        }
        if (result.menuMode) {
          dispatch({ type: "setMenuMode", mode: result.menuMode });
        }
        return;
      }

      if (result.lines.length) {
        dispatch({ type: "append", lines: [...result.lines, ""] });
      } else {
        dispatch({ type: "append", lines: [""] });
      }
      dispatch({ type: "remember", command: trimmed });
      if (result.headshot) {
        dispatch({ type: "setHeadshot", variant: result.headshot });
      }
      if (result.menuMode) {
        dispatch({ type: "setMenuMode", mode: result.menuMode });
      }
    },
    [state.menuMode, state.headshot, transitionTo]
  );

  const output = useMemo(() => state.output, [state.output]);
  const headshot = useMemo(() => state.headshot, [state.headshot]);
  const menuLines = useMemo(() => [...getMenuLines(state.menuMode)], [state.menuMode]);

  return { output, runCommand, headshot, menuLines, isFading, fadeVariant, transitionTo };
}

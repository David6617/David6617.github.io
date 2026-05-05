"use client";

import { useCallback, useMemo, useReducer } from "react";
import { executeCommand } from "./commands";
import { cliReducer, initialCliState } from "./cliReducer";

export function useCli() {
  const [state, dispatch] = useReducer(cliReducer, undefined, () => ({
    ...initialCliState,
    output: [
      "> Hello I'm David! Welcome to my website :D",
      "> Type 'help' to see available commands.",
      ""
    ]
  }));

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    dispatch({ type: "clear" });
    dispatch({ type: "append", lines: [`> ${trimmed}`] });
    const result = executeCommand(trimmed);
    if (result.type === "clear") {
      dispatch({ type: "clear" });
      if (result.headshot) {
        dispatch({ type: "setHeadshot", variant: result.headshot });
      }
      return;
    }
    dispatch({ type: "append", lines: [...result.lines, ""] });
    dispatch({ type: "remember", command: trimmed });
    if (result.headshot) {
      dispatch({ type: "setHeadshot", variant: result.headshot });
    }
  }, []);

  const output = useMemo(() => state.output, [state.output]);
  const headshot = useMemo(() => state.headshot, [state.headshot]);

  return { output, runCommand, headshot };
}


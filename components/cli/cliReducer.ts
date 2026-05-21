"use client";

import { DEFAULT_HEADSHOT, type HeadshotVariant } from "./headshots";
import type { MenuMode } from "./menus";

export type { HeadshotVariant } from "./headshots";

export type CliState = {
  output: string[];
  history: string[];
  headshot: HeadshotVariant;
  menuMode: MenuMode;
};

export type CliAction =
  | { type: "append"; lines: string[] }
  | { type: "clear" }
  | { type: "remember"; command: string }
  | { type: "setHeadshot"; variant: HeadshotVariant }
  | { type: "setMenuMode"; mode: MenuMode };

export const initialCliState: CliState = {
  output: [],
  history: [],
  headshot: DEFAULT_HEADSHOT,
  menuMode: "main"
};

export function cliReducer(state: CliState, action: CliAction): CliState {
  switch (action.type) {
    case "append":
      return { ...state, output: [...state.output, ...action.lines] };
    case "clear":
      return { ...state, output: [] };
    case "remember":
      return { ...state, history: [...state.history, action.command] };
    case "setHeadshot":
      return { ...state, headshot: action.variant };
    case "setMenuMode":
      return { ...state, menuMode: action.mode };
    default:
      return state;
  }
}


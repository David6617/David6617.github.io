"use client";

export type HeadshotVariant = "tux_normal" | "tux_happy";

export type CliState = {
  output: string[];
  history: string[];
  headshot: HeadshotVariant;
};

export type CliAction =
  | { type: "append"; lines: string[] }
  | { type: "clear" }
  | { type: "remember"; command: string }
  | { type: "setHeadshot"; variant: HeadshotVariant };

export const initialCliState: CliState = {
  output: [],
  history: [],
  headshot: "tux_normal"
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
    default:
      return state;
  }
}


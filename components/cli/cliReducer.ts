"use client";

export type CliState = {
  output: string[];
  history: string[];
};

export type CliAction =
  | { type: "append"; lines: string[] }
  | { type: "clear" }
  | { type: "remember"; command: string };

export const initialCliState: CliState = {
  output: [],
  history: []
};

export function cliReducer(state: CliState, action: CliAction): CliState {
  switch (action.type) {
    case "append":
      return { ...state, output: [...state.output, ...action.lines] };
    case "clear":
      return { ...state, output: [] };
    case "remember":
      return { ...state, history: [...state.history, action.command] };
    default:
      return state;
  }
}


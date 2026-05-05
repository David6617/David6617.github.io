import type { HeadshotVariant } from "./cliReducer";

export type CommandResult =
  | { type: "lines"; lines: string[]; headshot?: HeadshotVariant }
  | { type: "clear"; headshot?: HeadshotVariant };

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({
    type: "lines",
    lines: [
      "Available commands:",
      "  help              Shows all commands! You should know though since you just used it...",
      "  about me        Everything about me :D",
      "  experience       My work experience!",
      "  portfolio         All the stuff I've worked on :P",
      "  lets chat         Have a chat with me!",
      "  clear             Clears the output"
    ]
  }),
  experience: () => ({
    type: "lines",
    lines: [
      "Experience (placeholder):",
      "- Company A — Role — Dates",
      "- Company B — Role — Dates"
    ]
  }),
  portfolio: () => ({
    type: "lines",
    lines: [
      "Portfolio (placeholder):",
      "- Project 1 — short description",
      "- Project 2 — short description"
    ]
  }),
  clear: () => ({ type: "clear", headshot: "tux_normal" })
};

export function executeCommand(raw: string): CommandResult {
  const normalized = raw.trim().replace(/\s+/g, " ").toLowerCase();

  if (normalized === "about me") {
    return {
      type: "lines",
      headshot: "tux_happy",
      lines: [
        "About me (placeholder):",
        "- Replace this text in components/cli/commands.ts",
        "- Add a short bio, interests, and what you're looking for"
      ]
    };
  } else if (normalized === "lets chat") {
    return {
      type: "lines",
      headshot: "tux_happy",
      lines: [
        "Lets chat (placeholder):",
        "- Replace this text in components/cli/commands.ts",
        "- Add a short bio, interests, and what you're looking for"
      ]
    };
  }

  const [cmd] = normalized.split(/\s+/);
  const handler = COMMANDS[cmd];
  if (!handler) {
    return {
      type: "lines",
      lines: [`${cmd} isn't a valid command :(`, "Type 'help' to see commands."]
    };
  }
  return handler();
}


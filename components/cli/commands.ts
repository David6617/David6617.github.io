import type { HeadshotVariant } from "./cliReducer";

export type CommandResult =
  | { type: "lines"; lines: string[]; headshot?: HeadshotVariant }
  | { type: "clear"; headshot?: HeadshotVariant };

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({
    type: "lines",
    lines: [
      "Available commands:",
      "  help        Show this help",
      "  about       About me (short)",
      "  about me    About me + happy Tux",
      "  experience  Work experience",
      "  portfolio   Projects / portfolio",
      "  more        Extra links / misc",
      "  social      Social links",
      "  clear       Clear the output"
    ]
  }),
  about: () => ({
    type: "lines",
    lines: [
      "About me (placeholder):",
      "- Replace this text in components/cli/commands.ts",
      "- Add a short bio, interests, and what you're looking for"
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
  more: () => ({
    type: "lines",
    lines: [
      "More stuff (placeholder):",
      "- Blog: ...",
      "- Talks: ...",
      "- Fun links: ..."
    ]
  }),
  social: () => ({
    type: "lines",
    lines: [
      "Social links (placeholder):",
      "- GitHub: https://github.com/yourname",
      "- LinkedIn: https://linkedin.com/in/yourname"
    ]
  }),
  clear: () => ({ type: "clear", headshot: "normal" })
};

export function executeCommand(raw: string): CommandResult {
  const normalized = raw.trim().replace(/\s+/g, " ").toLowerCase();

  if (normalized === "about me") {
    const about = COMMANDS.about();
    if (about.type === "lines") {
      return { ...about, headshot: "happy" };
    }
    return about;
  }

  const [cmd] = normalized.split(/\s+/);
  const handler = COMMANDS[cmd];
  if (!handler) {
    return {
      type: "lines",
      lines: [`Command not found: ${cmd}`, "Type 'help' to see commands."]
    };
  }
  return handler();
}


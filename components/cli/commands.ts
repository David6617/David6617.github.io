export type CommandResult =
  | { type: "lines"; lines: string[] }
  | { type: "clear" };

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({
    type: "lines",
    lines: [
      "Available commands:",
      "  help        Show this help",
      "  about       About me",
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
  clear: () => ({ type: "clear" })
};

export function executeCommand(raw: string): CommandResult {
  const [cmd] = raw.trim().toLowerCase().split(/\s+/);
  const handler = COMMANDS[cmd];
  if (!handler) {
    return {
      type: "lines",
      lines: [`Command not found: ${cmd}`, "Type 'help' to see commands."]
    };
  }
  return handler();
}


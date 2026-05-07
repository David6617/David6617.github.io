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
      "Here is all the work experience I've had so far!",
      "Full Stack Developer @ Leap Tools Inc. . . . . . . . . . . . . . . Jan 2026-April 2026. . . . . . Toronto",
      "Software Developer @ Alink Computer Solutions Inc. . . . . . . . . . . . . . . May 2025-August 2025. . . . . . London",
      "Project Coordinator @ University of Waterloo . . . . . . . . . . . . . . May 2025-August 2025. . . . . . Waterloo",
      "Research Assistant @ University of Wuhan . . . . . . . . . . . . . . August 2023. . . . . . Wuhan",
    ]
  }),
  portfolio: () => ({
    type: "lines",
    lines: [
      "Here are some projects I've done, feel free to take a look :DD",
      "* Rat-AI-touille. . . . . . . Check it out [HERE](https://devpost.com/software/rat-ai-touille)",
      "* BabyBoomBox. . . . . . . Check it out [HERE](https://devpost.com/software/babyboombox)",
      "* Bobux Bargains. . . . . . . Check it out [HERE](https://devpost.com/software/bobux-bargains)",
      "* Picasso AI. . . . . . . Check it out [HERE](https://devpost.com/software/picasso-ai)",
      "* FlockFindr. . . . . . . Check it out [HERE](https://devpost.com/software/flockfindr)",
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
        "Hi! I'm David, a student studying Computational Mathematics at the University of Waterloo!",
        "I'm an aspiring software engineer who loves to tinker around with different technologies :P",
        "Apart from tech, I'm a part-time artist, gatcha game collector, chronic low-roller (iykyk), and a huge foodie!",
        "This website was inspired by one of my favour games of all time, OMORI! (With a little tech twist of course)",
        "If ever wanna to chat, feel free to reach out to me on my socials!"
      ]
    };
  } else if (normalized === "lets chat" || normalized === "lets chat!") {
    return {
      type: "lines",
      headshot: "tux_happy",
      lines: [
        "Shoot, I don't have anything to talk about yet :( Come back later when I've got something to talk about!",
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


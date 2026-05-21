import type { HeadshotVariant } from "./cliReducer";
import {
  getOutfitCategory,
  pickRandomOtherCategory,
  toHeadshotVariant,
  withMood,
  type HeadshotMood
} from "./headshots";
import type { MenuMode } from "./menus";

export type CommandResult =
  | {
      type: "lines";
      lines: string[];
      headshot?: HeadshotVariant;
      menuMode?: MenuMode;
    }
  | { type: "clear"; headshot?: HeadshotVariant; menuMode?: MenuMode }
  | { type: "navigate"; href: string };

function normalizeCommand(raw: string): string {
  return raw
    .trim()
    .replace(/^>\s*/, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/[''`]/g, "");
}

function mood(
  current: HeadshotVariant,
  nextMood: HeadshotMood
): HeadshotVariant {
  return withMood(current, nextMood);
}

type LinesResult = Extract<CommandResult, { type: "lines" }>;

function runMainCommand(
  cmd: string,
  current: HeadshotVariant
): CommandResult | null {
  switch (cmd) {
    case "help":
      return {
        type: "lines",
        headshot: mood(current, "normal"),
        lines: [
          "Available commands:",
          "  help              Shows all commands! You should know though since you just used it...",
          "  about me        Everything about me :D",
          "  experience       My work experience!",
          "  portfolio         All the stuff I've worked on :P",
          "  lets chat         Have a chat with me!",
          "  clear             Clears the output"
        ]
      };
    case "experience":
      return {
        type: "lines",
        headshot: mood(current, "happy"),
        lines: [
          "Here is all the work experience I've had so far!",
          "Full Stack Developer @ Leap Tools Inc. . . . . . . . . . . . . . . Jan 2026-April 2026. . . . . . Toronto",
          "Software Developer @ Alink Computer Solutions Inc. . . . . . . . . . . . . . . May 2025-August 2025. . . . . . London",
          "Project Coordinator @ University of Waterloo . . . . . . . . . . . . . . May 2025-August 2025. . . . . . Waterloo",
          "Research Assistant @ University of Wuhan . . . . . . . . . . . . . . August 2023. . . . . . Wuhan"
        ]
      };
    case "portfolio":
      return {
        type: "lines",
        headshot: mood(current, "happy"),
        lines: [
          "Here are some projects I've done, feel free to take a look :DD",
          "* Rat-AI-touille. . . . . . . Check it out [HERE](https://devpost.com/software/rat-ai-touille)",
          "* BabyBoomBox. . . . . . . Check it out [HERE](https://devpost.com/software/babyboombox)",
          "* Bobux Bargains. . . . . . . Check it out [HERE](https://devpost.com/software/bobux-bargains)",
          "* Picasso AI. . . . . . . Check it out [HERE](https://devpost.com/software/picasso-ai)",
          "* FlockFindr. . . . . . . Check it out [HERE](https://devpost.com/software/flockfindr)"
        ]
      };
    case "clear":
      return { type: "clear", headshot: mood(current, "normal") };
    default:
      return null;
  }
}

function runChatCommand(
  key: string,
  current: HeadshotVariant
): LinesResult | null {
  switch (key) {
    case "hows life":
      return {
        type: "lines",
        headshot: mood(current, "sad"),
        lines: [
          "Currently on a school term....",
          "Happy to be around friends! But the schoolwork is kinda overwhelming :(",
          "If you have any job offers for Fall 2026, PLEASE SEND THEM MY WAY PLEASE PLEASE PLEASE!!"
        ]
      };
    case "can you change": {
      const nextCategory = pickRandomOtherCategory(getOutfitCategory(current));
      return {
        type: "lines",
        headshot: toHeadshotVariant(nextCategory, "happy"),
        lines: ["How's this fit?"]
      };
    }
    case "fave song":
      return {
        type: "lines",
        headshot: mood(current, "happy"),
        lines: [
          "MY CURRENT FAVES:",
          "> [Whole Different Animal](https://open.spotify.com/track/59QIYdXAL9XeNtM0j8vN0k?si=593219e2ac7148ea) - Aespa",
          "> [Teo](https://open.spotify.com/track/0avbIGWVb4n7CcbomSEogt?si=6efddab0f6014e3d) - Omoi",
          "> [Kirari](https://open.spotify.com/track/51oc6MEsXTpnPn6GOw5VuP?si=9e0df1b3976c4784) - Fujii Kaze",
          "> [Shake it!](https://open.spotify.com/track/3Vpeg9gppDumSMsGmbKsYZ?si=3b156914154e492f) - emon(Tes.)",
          "> [REDRED](https://open.spotify.com/track/2fCwv2ppU5nTRTckomIGsd?si=17f31c3fc30a4f4d) - CORTIS",
          "> If you have any recommendations, feel free to send them my way! [Here's](https://open.spotify.com/user/u9pesqmlcgl8uybqcjj4axvnt?si=26556f20bcfa46cf) my spotify!"
        ]
      };
    default:
      return null;
  }
}

function chatCommandKey(normalized: string): string {
  return normalized.replace(/\?$/, "");
}

function isLetsChatCommand(normalized: string): boolean {
  return normalized === "lets chat" || normalized === "lets chat!";
}

export function executeCommand(
  raw: string,
  menuMode: MenuMode,
  currentHeadshot: HeadshotVariant
): CommandResult {
  const normalized = normalizeCommand(raw);

  if (menuMode === "mind") {
    if (normalized === "yes") {
      return { type: "navigate", href: "/headspace" };
    }
    if (normalized === "no") {
      return {
        type: "lines",
        menuMode: "chat",
        headshot: mood(currentHeadshot, "sad"),
        lines: ["Okay!"]
      };
    }

    const safe = raw.trim().replaceAll("*", "");
    return {
      type: "lines",
      menuMode: "mind",
      headshot: mood(currentHeadshot, "angry"),
      lines: [
        `"${safe}" isn't an option!!`,
        "Type **Yes** or **No**."
      ]
    };
  }

  if (menuMode === "chat") {
    if (normalized === "nevermind" || normalized === "nevermind?") {
      return {
        type: "lines",
        menuMode: "main",
        headshot: mood(currentHeadshot, "sad"),
        lines: ["Aw man :("]
      };
    }

    if (chatCommandKey(normalized) === "whats on your mind") {
      return {
        type: "lines",
        headshot: mood(currentHeadshot, "happy"),
        menuMode: "mind",
        lines: ["Hmmm wanna see for yourself?"]
      };
    }

    const chatResult = runChatCommand(chatCommandKey(normalized), currentHeadshot);
    if (chatResult) {
      return { ...chatResult, menuMode: "chat" };
    }

    const safe = raw.trim().replaceAll("*", "");
    return {
      type: "lines",
      menuMode: "chat",
      headshot: mood(currentHeadshot, "angry"),
      lines: [
        `"${safe}" isn't an option!!!!`,
        "Pick one from the menu, or type **Nevermind** to go back :D"
      ]
    };
  }

  if (normalized === "about me") {
    return {
      type: "lines",
      headshot: mood(currentHeadshot, "happy"),
      lines: [
        "Hi! I'm David, a student studying Computational Mathematics at the University of Waterloo!",
        "I'm an aspiring software engineer who loves to tinker around with different technologies :P",
        "Apart from tech, I'm a part-time artist, gatcha game collector, chronic low-roller (iykyk), and a huge foodie!",
        "This website was inspired by one of my favour games of all time, OMORI! (With a little tech twist of course)",
        "If ever wanna to chat, feel free to reach out to me on my socials!"
      ]
    };
  }

  if (isLetsChatCommand(normalized)) {
    return {
      type: "lines",
      headshot: mood(currentHeadshot, "happy"),
      menuMode: "chat",
      lines: ["Sure! What's up :D"]
    };
  }

  const [cmd] = normalized.split(/\s+/);
  const mainResult = runMainCommand(cmd, currentHeadshot);
  if (mainResult) {
    return mainResult;
  }

  return {
    type: "lines",
    headshot: mood(currentHeadshot, "angry"),
    lines: [`${cmd} isn't an option!!!!`, "Type 'help' to see commands."]
  };
}

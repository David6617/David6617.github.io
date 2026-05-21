export type MenuMode = "main" | "chat" | "mind";

export const MAIN_MENU_LINES = [
  "Type out a command to get started!",
  "> About Me",
  "> Experience",
  "> Portfolio",
  "> Let's chat!",
  "> Help"
] as const;

export const CHAT_MENU_LINES = [
  "What do you want to chat about?",
  "> How's life?",
  "> Can you change?",
  "> What's on your mind?",
  "> Fave song?",
  "> Nevermind"
] as const;

export const MIND_MENU_LINES = [
  "Will you go?", 
  "> Yes", 
  "> No",
  " ",
  " ",
  " ",
  " ",
  " "
] as const;

export function getMenuLines(mode: MenuMode): readonly string[] {
  if (mode === "mind") return MIND_MENU_LINES;
  if (mode === "chat") return CHAT_MENU_LINES;
  return MAIN_MENU_LINES;
}

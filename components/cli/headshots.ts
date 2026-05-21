export const OUTFIT_CATEGORIES = ["tux", "shirt", "pj"] as const;
export type OutfitCategory = (typeof OUTFIT_CATEGORIES)[number];

export const HEADSHOT_MOODS = ["normal", "happy", "angry", "sad"] as const;
export type HeadshotMood = (typeof HEADSHOT_MOODS)[number];

export type HeadshotVariant = `${OutfitCategory}_${HeadshotMood}`;

export const DEFAULT_HEADSHOT: HeadshotVariant = "tux_normal";

const OUTFIT_PATHS: Record<OutfitCategory, Record<HeadshotMood, string>> = {
  tux: {
    normal: "/Tux/Tux_Normal.gif",
    happy: "/Tux/Tux_Happy.gif",
    angry: "/Tux/Tux_Angry.gif",
    sad: "/Tux/Tux_Sad.gif"
  },
  shirt: {
    normal: "/Shirt/Shirt_Normal.gif",
    happy: "/Shirt/Shirt_Happy.gif",
    angry: "/Shirt/Shirt_Angry.gif",
    sad: "/Shirt/Shirt_Sad.gif"
  },
  pj: {
    normal: "/PJ/PJ_Normal.gif",
    happy: "/PJ/PJ_Happy.gif",
    angry: "/PJ/PJ_Angry.gif",
    sad: "/PJ/PJ_Sad.gif"
  }
};

export function getHeadshotSrc(variant: HeadshotVariant): string {
  const category = getOutfitCategory(variant);
  const mood = getHeadshotMood(variant);
  return OUTFIT_PATHS[category][mood];
}

export function getOutfitCategory(variant: HeadshotVariant): OutfitCategory {
  const [category] = variant.split("_") as [OutfitCategory, HeadshotMood];
  return category;
}

export function getHeadshotMood(variant: HeadshotVariant): HeadshotMood {
  const parts = variant.split("_");
  return parts.slice(1).join("_") as HeadshotMood;
}

export function toHeadshotVariant(
  category: OutfitCategory,
  mood: HeadshotMood
): HeadshotVariant {
  return `${category}_${mood}`;
}

export function withMood(
  current: HeadshotVariant,
  mood: HeadshotMood
): HeadshotVariant {
  return toHeadshotVariant(getOutfitCategory(current), mood);
}

export function pickRandomOtherCategory(current: OutfitCategory): OutfitCategory {
  const others = OUTFIT_CATEGORIES.filter((c) => c !== current);
  return others[Math.floor(Math.random() * others.length)]!;
}

export function isHeadshotVariant(value: string): value is HeadshotVariant {
  const [category, ...moodParts] = value.split("_");
  const mood = moodParts.join("_");
  return (
    OUTFIT_CATEGORIES.includes(category as OutfitCategory) &&
    HEADSHOT_MOODS.includes(mood as HeadshotMood)
  );
}

export function formatHeadshotAlt(variant: HeadshotVariant): string {
  const category = getOutfitCategory(variant);
  const mood = getHeadshotMood(variant);
  const categoryLabel =
    category === "pj" ? "PJ" : category[0]!.toUpperCase() + category.slice(1);
  const moodLabel = mood[0]!.toUpperCase() + mood.slice(1);
  return `${categoryLabel} ${moodLabel}`;
}

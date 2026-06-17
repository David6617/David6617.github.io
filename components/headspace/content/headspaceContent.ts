export type PolaroidPosition = {
  x: number;
  y: number;
  rotate?: number;
};

export type GalleryImage = {
  src: string;
  alt?: string;
  width: number;
  height: number;
};

type PolaroidBase = {
  id: string;
  title: string;
  coverImage: string;
  position: PolaroidPosition;
};

export type DescriptionPolaroid = PolaroidBase & {
  type: "description";
  body: string;
};

export type GalleryPolaroid = PolaroidBase & {
  type: "gallery";
  images: GalleryImage[];
};

export type Polaroid = DescriptionPolaroid | GalleryPolaroid;

/** Width of a collapsed polaroid card in px (must match CSS). */
export const POLAROID_WIDTH = 280;

/** Trailing padding after the rightmost polaroid. */
export const CANVAS_TRAILING_PADDING = 120;

export const POLAROIDS: Polaroid[] = [
  {
    id: "miku-expo",
    type: "description",
    title: "Miku Expo 2026!",
    coverImage: "/headspace/MikuExpo/MikuExpo.png",
    position: { x: 80, y: 100, rotate: -2 },
    body: `FIRST MIKU EXPO!!! I got introduced to vocaloid recently and went to Miku Expo 2026 in Hamilton with my friends Charles and Fiona :DD
    It was a lot of fun and I teared up seeing how this digital blue haired girl was able to bring so many people together.. it was so beautiful...

    ANYWAYS!!! SEE YOU ALL AT MIKU EXPO 2027!!!!!!!!!!!!!!!!!!!!
    `
  },
  {
    id: "beach-trip",
    type: "gallery",
    title: "Toronto Co-op",
    coverImage: "/headspace/Toronto/mirror.jpg",
    position: { x: 440, y: 40, rotate: 1.5 },
    images: [
      { src: "/headspace/Toronto/mirror.jpg", alt: "mirror", width: 400, height: 600 },
      { src: "/headspace/Toronto/plant.jpg", alt: "plant", width: 400, height: 300 },
      { src: "/headspace/Toronto/pumpkin.jpg", alt: "pumpkin", width: 400, height: 300 },
      { src: "/headspace/Toronto/view.jpg", alt: "view", width: 800, height: 400 }
    ]
  },
  {
    id: "anime-north",
    type: "gallery",
    title: "Anime North 2026",
    coverImage: "/headspace/AnimeNorth/cover.jpg",
    position: { x: 800, y: 160, rotate: -1 },
    images: [
      { src: "/headspace/AnimeNorth/group.jpg", alt: "group", width: 2160, height: 2880 },
      { src: "/headspace/AnimeNorth/smile.jpg", alt: "smile", width: 2160, height: 2880 },
      { src: "/headspace/AnimeNorth/mog.jpg", alt: "mog", width: 1536, height: 2048 },
      { src: "/headspace/AnimeNorth/haul1.jpg", alt: "haul 1", width: 2160, height: 2880 },
      { src: "/headspace/AnimeNorth/haul2.jpg", alt: "haul 2", width: 2160, height: 2880 }
    ]
  }
];

export function getCanvasWidth(polaroids: Polaroid[]): number {
  if (polaroids.length === 0) return 800;
  const maxX = Math.max(...polaroids.map((p) => p.position.x));
  return maxX + POLAROID_WIDTH + CANVAS_TRAILING_PADDING;
}

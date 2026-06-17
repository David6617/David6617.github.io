import type { GalleryImage } from "../content/headspaceContent";

export type GalleryCell = {
  gridColumn: string;
  gridRow: string;
};

export type GalleryGridLayout = {
  gridTemplateColumns: string;
  gridTemplateRows: string;
  cells: GalleryCell[];
};

function aspectRatio(img: GalleryImage): number {
  return img.width / img.height;
}

function isLandscape(img: GalleryImage): boolean {
  return aspectRatio(img) >= 1.1;
}

function isPortrait(img: GalleryImage): boolean {
  return aspectRatio(img) <= 0.9;
}

function layoutOne(): GalleryGridLayout {
  return {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    cells: [{ gridColumn: "1 / 2", gridRow: "1 / 2" }]
  };
}

function layoutTwo(images: GalleryImage[]): GalleryGridLayout {
  const bothLandscape = isLandscape(images[0]) && isLandscape(images[1]);
  const bothPortrait = isPortrait(images[0]) && isPortrait(images[1]);

  if (bothLandscape) {
    return {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
      cells: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" }
      ]
    };
  }

  if (bothPortrait) {
    return {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr 1fr",
      cells: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" }
      ]
    };
  }

  const firstLarger = aspectRatio(images[0]) >= aspectRatio(images[1]);
  if (firstLarger) {
    return {
      gridTemplateColumns: "3fr 2fr",
      gridTemplateRows: "1fr",
      cells: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" }
      ]
    };
  }

  return {
    gridTemplateColumns: "2fr 3fr",
    gridTemplateRows: "1fr",
    cells: [
      { gridColumn: "1 / 2", gridRow: "1 / 2" },
      { gridColumn: "2 / 3", gridRow: "1 / 2" }
    ]
  };
}

function layoutThree(): GalleryGridLayout {
  return {
    gridTemplateColumns: "3fr 2fr",
    gridTemplateRows: "1fr 1fr",
    cells: [
      { gridColumn: "1 / 2", gridRow: "1 / 3" },
      { gridColumn: "2 / 3", gridRow: "1 / 2" },
      { gridColumn: "2 / 3", gridRow: "2 / 3" }
    ]
  };
}

function layoutFour(): GalleryGridLayout {
  return {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    cells: [
      { gridColumn: "1 / 2", gridRow: "1 / 2" },
      { gridColumn: "2 / 3", gridRow: "1 / 2" },
      { gridColumn: "1 / 2", gridRow: "2 / 3" },
      { gridColumn: "2 / 3", gridRow: "2 / 3" }
    ]
  };
}

function layoutMany(images: GalleryImage[]): GalleryGridLayout {
  const count = images.length;
  const topCount = Math.min(3, count);
  const remaining = count - topCount;

  if (topCount === 3 && remaining >= 1) {
    const cells: GalleryCell[] = [
      { gridColumn: "1 / 2", gridRow: "1 / 3" },
      { gridColumn: "2 / 3", gridRow: "1 / 2" },
      { gridColumn: "2 / 3", gridRow: "2 / 3" }
    ];

    const rowCount = Math.ceil(remaining / 2);
    const rows = ["1fr", "1fr", ...Array.from({ length: rowCount }, () => "1fr")];

    for (let i = 0; i < remaining; i++) {
      const row = 3 + Math.floor(i / 2);
      const colStart = i % 2 === 0 ? 1 : 2;
      const colEnd = i % 2 === 0 && i === remaining - 1 && remaining % 2 === 1 ? 3 : colStart + 1;
      cells.push({
        gridColumn: `${colStart} / ${colEnd}`,
        gridRow: `${row} / ${row + 1}`
      });
    }

    return {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: rows.join(" "),
      cells
    };
  }

  const cols = count <= 2 ? count : 2;
  const rows = Math.ceil(count / cols);
  const cells: GalleryCell[] = images.map((_, i) => {
    const row = Math.floor(i / cols) + 1;
    const col = (i % cols) + 1;
    const isLastOdd = i === count - 1 && count % cols !== 0;
    return {
      gridColumn: isLastOdd ? `1 / ${cols + 1}` : `${col} / ${col + 1}`,
      gridRow: `${row} / ${row + 1}`
    };
  });

  return {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    cells
  };
}

export function getGalleryLayout(images: GalleryImage[]): GalleryGridLayout {
  const count = images.length;
  if (count <= 0) {
    return layoutOne();
  }
  if (count === 1) return layoutOne();
  if (count === 2) return layoutTwo(images);
  if (count === 3) return layoutThree();
  if (count === 4) return layoutFour();
  return layoutMany(images);
}

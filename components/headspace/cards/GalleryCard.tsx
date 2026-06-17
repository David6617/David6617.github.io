import type { GalleryPolaroid } from "../content/headspaceContent";
import { getGalleryLayout } from "../lib/galleryLayout";
import styles from "./GalleryCard.module.css";

type Props = {
  polaroid: GalleryPolaroid;
  onImageClick: (src: string) => void;
};

export function GalleryCard({ polaroid, onImageClick }: Props) {
  const layout = getGalleryLayout(polaroid.images);

  return (
    <div className={styles.card}>
      <h2 className={styles.title} id="expanded-card-title">
        {polaroid.title}
      </h2>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: layout.gridTemplateColumns,
          gridTemplateRows: layout.gridTemplateRows
        }}
      >
        {polaroid.images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={styles.cell}
            style={{
              gridColumn: layout.cells[i]?.gridColumn,
              gridRow: layout.cells[i]?.gridRow
            }}
            onClick={() => onImageClick(image.src)}
            aria-label={image.alt ?? `View image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={image.src}
              alt={image.alt ?? ""}
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

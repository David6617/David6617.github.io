import type { Polaroid } from "../content/headspaceContent";
import styles from "./PolaroidCard.module.css";

type Props = {
  polaroid: Polaroid;
  onViewMore: (id: string) => void;
};

export function PolaroidCard({ polaroid, onViewMore }: Props) {
  const { position } = polaroid;
  const rotate = position.rotate ?? 0;

  return (
    <article
      className={styles.card}
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${rotate}deg)`
      }}
    >
      <h2 className={styles.title}>{polaroid.title}</h2>
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={polaroid.coverImage}
          alt=""
          draggable={false}
        />
      </div>
      <button
        type="button"
        className={styles.viewMore}
        onClick={() => onViewMore(polaroid.id)}
      >
        View More
      </button>
    </article>
  );
}

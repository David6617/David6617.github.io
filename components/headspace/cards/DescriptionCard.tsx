import type { DescriptionPolaroid } from "../content/headspaceContent";
import styles from "./DescriptionCard.module.css";

type Props = {
  polaroid: DescriptionPolaroid;
};

export function DescriptionCard({ polaroid }: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title} id="expanded-card-title">
        {polaroid.title}
      </h2>
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={polaroid.coverImage}
          alt=""
          draggable={false}
        />
      </div>
      <div className={styles.body}>
        {polaroid.body.split("\n\n").map((paragraph, i) => (
          <p key={i} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

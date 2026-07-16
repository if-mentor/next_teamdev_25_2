import styles from "./styles.module.css";

export default function CardSkeleton() {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.imageWrapper}></div>

      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={styles.title}></span>
          <span className={styles.category}></span>
        </div>

        <p className={styles.author}></p>

        <p className={styles.content}></p>

        <p className={styles.createdAt}></p>
      </div>
    </article>
  );
}

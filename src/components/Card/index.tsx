import Image from "next/image";
import styles from "./styles.module.css";
import { CardProps } from "./type";

const Card = ({ title, author, category, thumbnailUrl, content, createdAt }: CardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={thumbnailUrl} alt="photo" fill sizes="280px" className={styles.thumbnail} />
      </div>

      <div className={styles.detail}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.category}>{category}</span>
        </div>

        <p className={styles.author}>{author}</p>

        <p className={styles.content}>{content}</p>

        <p className={styles.createdAt}>{createdAt}</p>
      </div>
    </article>
  );
};

export default Card;
